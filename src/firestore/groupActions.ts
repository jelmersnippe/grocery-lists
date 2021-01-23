import firestore from '@react-native-firebase/firestore';
import {FirestoreGroup, FirestoreUserUid} from './types';
import {addGroup, removeGroup} from '../reducers/groups/actions';
import {store} from '../config/store';
import {Group, GroupInfo} from '../reducers/groups/types';

export const subscribeToFirestoreGroupUpdates = () => {
    const currentUserUid = store.getState().user.uid;

    return firestore().collection('groups')
        .where('users', 'array-contains', currentUserUid)
        .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach(async (documentChange) => {
                const id = documentChange.doc.id;

                switch (documentChange.type) {
                    case 'removed':
                        store.dispatch(removeGroup(id));
                        break;
                    default:
                        const documentData = documentChange.doc.data() as FirestoreGroup;
                        const group: GroupInfo = {
                            name: documentData.name,
                            creatorUid: documentData.creator,
                            users: documentData.users
                        };
                        store.dispatch(addGroup({id, group}));
                        break;
                }
            });
        });
};

export const getFirestoreGroupByUid = async (uid: string): Promise<Group | undefined> => {
    const groupsState = store.getState().groups;
    const foundGroup = groupsState[uid];

    if (foundGroup) {
        return foundGroup;
    }

    return await firestore().collection('groups')
        .doc(uid)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                const group = documentSnapshot.data() as FirestoreGroup;
                const groupData: Group = {
                    uid: documentSnapshot.id,
                    name: group.name,
                    creatorUid: group.creator,
                    users: group.users
                };
                return groupData;
            } else {
                return undefined;
            }
        });
};

export const addFirestoreGroup = async (name: string): Promise<string | undefined> => {
    const userId = store.getState().user.uid;
    if (!userId) {
        return;
    }

    try {
        const newGroup: FirestoreGroup = {
            name: name.toLowerCase(),
            creator: userId,
            users: [userId]
        };
        const createdGroup = await firestore().collection('groups').add(newGroup);
        return createdGroup.id;
    } catch (error) {
        console.log('error', error);
        return undefined;
    }
};

export const deleteFirestoreGroup = async (id: string): Promise<void> => {
    return await firestore().collection('groups').doc(id).delete();
};

export const addFirestoreGroupUsers = async (groupId: string, usersToAdd: Array<FirestoreUserUid>) => {
    const groupUsersRef = firestore().doc(`groups/${groupId}`);

    return firestore().runTransaction(async (transaction) => {
        const groupUsersSnapshot = await transaction.get(groupUsersRef);

        if (!groupUsersSnapshot.exists) {
            throw 'Group users don\'t exists';
        }

        const groupData = groupUsersSnapshot.data() as FirestoreGroup;
        const filteredGroupUsers = groupData.users.filter((user) => !usersToAdd.includes(user));
        await transaction.update(groupUsersRef, {
            users: [...filteredGroupUsers, ...usersToAdd]
        });
    });
};

export const removeFirestoreGroupUsers = async (groupId: string, usersToRemove: Array<FirestoreUserUid>) => {
    const groupUsersRef = firestore().doc(`groups/${groupId}`);

    return firestore().runTransaction(async (transaction) => {
        const groupUsersSnapshot = await transaction.get(groupUsersRef);

        if (!groupUsersSnapshot.exists) {
            throw 'Group users don\'t exists';
        }

        const groupData = groupUsersSnapshot.data() as FirestoreGroup;
        const filteredGroupUsers = groupData.users.filter((user) => !usersToRemove.includes(user));
        await transaction.update(groupUsersRef, {
            users: filteredGroupUsers
        });
    });
};
