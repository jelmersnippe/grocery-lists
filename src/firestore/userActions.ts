import firestore from '@react-native-firebase/firestore';
import {FirestoreUser} from './types';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {store} from '../config/store';
import {addCachedUser} from '../reducers/userCache/actions';
import {User, UserInfo} from '../reducers/userCache/types';

// TODO: Make a TTL mechanism / implement some way to refresh user data
const getByUid = async (uid: string): Promise<UserInfo | undefined> => {
    const userCache = store.getState().userCache;
    const cachedUser = userCache.hasOwnProperty(uid) ? userCache[uid] : undefined;

    if (cachedUser) {
        return cachedUser;
    }

    return await firestore().collection('users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                const user = documentSnapshot.data() as FirestoreUser;
                const userInfo: User = {
                    uid: uid,
                    name: user.name
                };
                store.dispatch(addCachedUser({user: userInfo, timestamp: new Date()}));
                return user;
            } else {
                return undefined;
            }
        });
};

const search = async (searchString: string): Promise<Array<User>> => {
    const foundUsers: Array<User> = [];

    const users = await firestore().collection('users')
        .where('name', '>=', searchString)
        .where('name', '<', searchString + 'z')
        .get();

    users.forEach((documentSnapshot) => {
        const uid = documentSnapshot.id;
        const data = documentSnapshot.data() as FirestoreUser;
        const userInfo = {
            name: data.name
        };
        foundUsers.push({uid, ...userInfo});
    });

    return foundUsers;
};

const create = async (uid: string, user: User): Promise<void> => {
    const userExists = await getByUid(uid);
    if (userExists) {
        console.log('User already exists');
        return;
    }

    const newUser: FirestoreUser = user;

    return await firestore().collection('users')
        .doc(uid)
        .set(newUser)
        .then(() => console.log('User created'))
        .catch((error: ReactNativeFirebase.NativeFirebaseError) => console.log('Error creating user', error));
};

const update = async (uid: string, user: Partial<User>): Promise<void> => {
    const updatedUser: Partial<FirestoreUser> = user;
    return await firestore().collection('users')
        .doc(uid)
        .update(updatedUser)
        .then(() => console.log('User updated'))
        .catch((error: ReactNativeFirebase.NativeFirebaseError) => console.log('Error updating user', error.code));
};

const firestoreUserActions = {
    getByUid,
    search,
    create,
    update
};

export default firestoreUserActions;
