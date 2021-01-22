import firestore from '@react-native-firebase/firestore';
import {FirestoreGroup, FirestoreGroupSearchResult, FirestoreList, FirestoreUserUid} from './types';
import {addGroup, removeGroup} from '../reducers/groups/actions';
import {store} from '../config/store';
import {Group} from '../reducers/groups/types';

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
                        const group: Group = {
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
                    name: group.name,
                    creatorUid: group.creator,
                    users: group.users
                };
                store.dispatch(addGroup({id: uid, group: groupData}));
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
            name: name,
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

export const addUsersToFirestoreGroup = async (groupId: string, usersToAdd: Array<FirestoreUserUid>, usersToRemove: Array<FirestoreUserUid>) => {
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

export const searchFirestoreGroups = async (searchString: string): Promise<Array<FirestoreGroupSearchResult>> => {
    const foundGroups: Array<FirestoreGroupSearchResult> = [];

    const groups = await firestore().collection('groups')
        .where('name', '>=', searchString.toLowerCase())
        .where('name', '<', searchString.toLowerCase() + 'z')
        .get();

    groups.forEach((documentSnapshot) => {
        const uid = documentSnapshot.id;
        const data = documentSnapshot.data() as FirestoreGroup;
        const groupInfo = {
            uid: uid,
            name: data.name
        };
        foundGroups.push(groupInfo);
    });

    return foundGroups;
};
