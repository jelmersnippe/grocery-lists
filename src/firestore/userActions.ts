import firestore from '@react-native-firebase/firestore';
import {FirestoreUser} from './types';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {store} from '../config/store';
import {addCachedUser} from '../reducers/userCache/actions';

// TODO: Make a TTL mechanism / implement some way to refresh user data
const getByUid = async (uid: string): Promise<FirestoreUser | undefined> => {
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
                store.dispatch(addCachedUser({id: uid, user: user, timestamp: new Date()}));
                return user;
            } else {
                return undefined;
            }
        });
};

const create = async (uid: string, user: FirestoreUser): Promise<void> => {
    const userExists = await getByUid(uid);
    if (userExists) {
        console.log('User already exists');
        return;
    }

    return await firestore().collection('users')
        .doc(uid)
        .set(user)
        .then(() => console.log('User created'))
        .catch((error: ReactNativeFirebase.NativeFirebaseError) => console.log('Error creating user', error));
};

const update = async (uid: string, user: Partial<FirestoreUser>): Promise<void> => {
    return await firestore().collection('users')
        .doc(uid)
        .update(user)
        .then(() => console.log('User updated'))
        .catch((error: ReactNativeFirebase.NativeFirebaseError) => console.log('Error updating user', error.code));
};


const firestoreUserActions = {
    getByUid,
    create,
    update
};

export default firestoreUserActions;
