import firestore from '@react-native-firebase/firestore';
import {FirestoreUser, FirestoreUserSearchResult} from './types';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {store} from '../config/store';
import {addCachedUser, removeCachedUser} from '../reducers/userCache/actions';
import {CachedUser, User, UserInfo} from '../reducers/userCache/types';
import moment from 'moment';

const getByUid = async (uid: string): Promise<UserInfo | undefined> => {
    const userCache = store.getState().userCache;
    const cachedUser = userCache.hasOwnProperty(uid) ? userCache[uid] : undefined;

    if (cachedUser) {
        if (moment(cachedUser.timestamp).valueOf() < moment().subtract(1, 'day').valueOf()) {
            store.dispatch(removeCachedUser(cachedUser.uid));
        } else {
            return cachedUser;
        }
    }

    return await firestore().collection('users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                const user = documentSnapshot.data() as FirestoreUser;
                const newCachedUser: CachedUser = {
                    uid: uid,
                    name: user.name,
                    timestamp: new Date()
                };
                store.dispatch(addCachedUser(newCachedUser));
                return user;
            } else {
                return undefined;
            }
        });
};

const search = async (searchString: string): Promise<Array<FirestoreUserSearchResult>> => {
    const foundUsers: Array<FirestoreUserSearchResult> = [];

    const users = await firestore().collection('users')
        .where('name', '>=', searchString.toLowerCase())
        .where('name', '<', searchString.toLowerCase() + 'z')
        .get();

    users.forEach((documentSnapshot) => {
        const uid = documentSnapshot.id;
        const data = documentSnapshot.data() as FirestoreUser;
        const userInfo = {
            uid: uid,
            name: data.name
        };
        foundUsers.push(userInfo);
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
        .set({
            ...newUser,
            name: newUser.name.toLowerCase()
        })
        .then(() => console.log('User created'))
        .catch((error: ReactNativeFirebase.NativeFirebaseError) => console.log('Error creating user', error));
};

const update = async (uid: string, user: Partial<User>): Promise<void> => {
    const updatedUser: Partial<FirestoreUser> = user;
    return await firestore().collection('users')
        .doc(uid)
        .update({
            ...updatedUser,
            name: updatedUser.name?.toLowerCase()
        })
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
