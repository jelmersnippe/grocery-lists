import firestore from '@react-native-firebase/firestore';
import {FirestoreUser} from './types';
import {ReactNativeFirebase} from '@react-native-firebase/app';

const getByUid = async (uid: string): Promise<FirestoreUser | undefined> => {
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
