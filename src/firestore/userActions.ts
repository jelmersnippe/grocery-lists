import firestore, {firebase} from '@react-native-firebase/firestore';
import {FirestoreUser, FirestoreSearchResult} from './types';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {User, UserInfo} from '../reducers/user/types';

export const getUser = async (uid: string): Promise<UserInfo | undefined> => {
    return getFirestoreUserByUid(uid);
};

export const getMultipleUsers = async (userUids: Array<string>): Promise<Array<User>> => {
    const foundUsers: Array<User> = [];

    if (userUids.length > 0) {
        await firestore().collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', userUids).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as FirestoreUser;
                    const foundUser: User = {
                        uid: doc.id,
                        name: data.name
                    };
                    foundUsers.push(foundUser);
                });
            });
    }

    return foundUsers;
};

const getFirestoreUserByUid = async (uid: string): Promise<UserInfo | undefined> => {
    return await firestore().collection('users')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                return documentSnapshot.data() as FirestoreUser;
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
