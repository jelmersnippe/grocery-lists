import firestore, {firebase} from '@react-native-firebase/firestore';
import {FirestoreUser, FirestoreSearchResult} from './types';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {store} from '../config/store';
import {addCachedUser, removeCachedUser} from '../reducers/userCache/actions';
import {CachedUser, User, UserInfo} from '../reducers/userCache/types';
import moment from 'moment';

export const getUser = async (uid: string): Promise<UserInfo | undefined> => {
    const cachedUser = getUserFromCache(uid);
    if (cachedUser) {
        return cachedUser;
    }

    return getFirestoreUserByUid(uid);
};

export const getMultipleUsers = async (userUids: Array<string>): Promise<Array<User>> => {
    const foundUsers: Array<User> = [];
    const uidsToFetch: Array<string> = [];

    for (const userUid of userUids) {
        const cachedUser = getUserFromCache(userUid);
        if (cachedUser) {
            foundUsers.push({
                ...cachedUser,
                uid: userUid
            });
        } else {
            uidsToFetch.push(userUid);
        }
    }
    if (uidsToFetch.length > 0) {
        await firestore().collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', uidsToFetch).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as FirestoreUser;
                    const foundUser: User = {
                        uid: doc.id,
                        name: data.name
                    };
                    store.dispatch(addCachedUser({uid: doc.id, user: foundUser}));
                    foundUsers.push(foundUser);
                });
            });
    }

    return foundUsers;
};

const getUserFromCache = (uid: string): CachedUser | undefined => {
    const userCache = store.getState().userCache;
    const cachedUser = userCache.hasOwnProperty(uid) ? userCache[uid] : undefined;

    if (cachedUser) {
        if (moment(cachedUser.timestamp).valueOf() < moment().subtract(1, 'day').valueOf()) {
            store.dispatch(removeCachedUser(cachedUser.uid));
        } else {
            return cachedUser;
        }
    }
    return undefined;
};

const getFirestoreUserByUid = async (uid: string): Promise<UserInfo | undefined> => {
    return await firestore().collection('users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                const user = documentSnapshot.data() as FirestoreUser;
                store.dispatch(addCachedUser({uid, user}));
                return user;
            } else {
                return undefined;
            }
        });
};

export const searchFirestoreUsers = async (searchString: string): Promise<Array<FirestoreSearchResult>> => {
    const foundUsers: Array<FirestoreSearchResult> = [];

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

export const createFirestoreUser = async (uid: string, user: UserInfo): Promise<void> => {
    const userExists = await getUser(uid);
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

export const updateFirestoreUser = async (uid: string, user: Partial<User>): Promise<void> => {
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
