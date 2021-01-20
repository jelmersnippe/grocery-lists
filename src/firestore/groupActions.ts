import firestore from '@react-native-firebase/firestore';
import {FirestoreGroup, FirestoreList, FirestoreUserUid} from './types';
import {addGroup} from '../reducers/groups/actions';
import {store} from '../config/store';

const subscribeToUpdates = () => {
    const currentUserUid = store.getState().user.uid;

    return firestore().collection('groups')
        .where('users', 'array-contains', currentUserUid)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                const data = documentSnapshot.data() as FirestoreGroup;
                const id = documentSnapshot.id;
                store.dispatch(addGroup({id: id, group: data}));
            });
        });
};

const addUsersToFirestoreGroup = async (groupId: string, usersToAdd: Array<FirestoreUserUid>, usersToRemove: Array<FirestoreUserUid>) => {
    const groupUsersRef = firestore().doc(`groups/${groupId}`);

    return firestore().runTransaction(async (transaction) => {
        const listUsersSnapshot = await transaction.get(groupUsersRef);

        if (!listUsersSnapshot.exists) {
            throw 'Group users don\'t exists';
        }

        const listData = listUsersSnapshot.data() as FirestoreList;
        const newListUsers = listData.users.filter((user) => !usersToRemove.includes(user));
        await transaction.update(groupUsersRef, {
            users: [...newListUsers, ...usersToAdd]
        });
    });
};

const firestoreGroupActions = {
    subscribeToUpdates,
    addUsersToFirestoreGroup
};

export default firestoreGroupActions;
