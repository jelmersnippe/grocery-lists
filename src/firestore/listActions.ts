import firestore from '@react-native-firebase/firestore';
import {FirestoreList, FirestoreListItem, FirestoreUserUid} from './types';
import {store} from '../config/store';
import {ItemStatus, List, ListItem} from '../reducers/lists/types';
import moment from 'moment';
import {addList, addListItem, removeList, removeListItem} from '../reducers/lists/actions';

export const subscribeToFirestoreListUpdates = (): () => void => {
    const currentUserUid = store.getState().user.uid;

    return firestore()
        .collection('lists')
        .where('users', 'array-contains', currentUserUid)
        .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach(async (documentChange) => {
                const listId = documentChange.doc.id;
                const documentData = documentChange.doc.data() as FirestoreList;

                switch (documentChange.type) {
                    case 'removed':
                        store.dispatch(removeList(listId));
                        break;
                    default:
                        const listData: List = {
                            name: documentData.name,
                            creatorUid: documentData.creator,
                            users: documentData.users
                        };
                        store.dispatch(addList({id: listId, list: listData}));
                        break;
                }
            });
        });
};

export const subscribeToFirestoreListItemUpdates = (listId: string): () => void => {
    const currentUserUid = store.getState().user.uid;

    if (!currentUserUid) {
        throw new Error('No current user');
    }

    return firestore().collection(`lists/${listId}/items`).onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((documentChange) => {
            const listItemId = documentChange.doc.id;
            switch (documentChange.type) {
                case 'removed':
                    store.dispatch(removeListItem({listId, listItemId}));
                    break;
                default:
                    const documentData = documentChange.doc.data() as FirestoreListItem;
                    const listItemData: ListItem = {
                        name: documentData.name,
                        quantity: documentData.quantity,
                        status: documentData.status,
                        addedBy: documentData.addedBy,
                        updatedAt: new Date(documentData.updatedAt)
                    };
                    const listItem = {id: listItemId, data: listItemData};
                    store.dispatch(addListItem({listId, listItem}));
                    break;
            }
        });
    });
};

export const addFirestoreListUsers = async (listId: string, usersToAdd: Array<FirestoreUserUid>): Promise<void> => {
    const listRef = firestore().collection('lists').doc(listId);

    return await firestore().runTransaction(async (transaction) => {
        const listSnapshot = await transaction.get(listRef);

        if (!listSnapshot.exists) {
            throw 'List users don\'t exists';
        }

        const listData = listSnapshot.data() as FirestoreList;
        const filteredListUsers = listData.users.filter((user) => !usersToAdd.includes(user));
        await transaction.update(listRef, {
            users: [...filteredListUsers, ...usersToAdd]
        });
    });
};

export const removeFirestoreListUsers = async (listId: string, usersToRemove: Array<FirestoreUserUid>): Promise<void> => {
    const listRef = firestore().collection('lists').doc(listId);

    return await firestore().runTransaction(async (transaction) => {
        const listSnapshot = await transaction.get(listRef);

        if (!listSnapshot.exists) {
            throw 'List users don\'t exists';
        }

        const listData = listSnapshot.data() as FirestoreList;
        const filteredListUsers = listData.users.filter((user) => !usersToRemove.includes(user));
        await transaction.update(listRef, {
            users: filteredListUsers
        });
    });
};

export const addFirestoreList = async (name: string): Promise<string | undefined> => {
    const userId = store.getState().user.uid;
    if (!userId) {
        return;
    }

    try {
        const newList: FirestoreList = {
            name: name,
            creator: userId,
            users: [userId]
        };
        const createdList = await firestore().collection('lists').add(newList);
        return createdList.id;
    } catch (error) {
        console.log('error', error);
        return undefined;
    }
};

export const updateFirestoreList = (listId: string, updatedName: string): void => {
    firestore().collection('lists').doc(listId).update({name: updatedName})
        .then(() => console.log('updated list item'))
        .catch((error) => console.log('error', error));
};

export const deleteFirestoreList = async (listId: string): Promise<void> => {
    const listDocument = await firestore().collection('lists').doc(listId).get();
    const listItemsQuerySnapshot = await firestore().collection(`lists/${listId}/items`).get();

    const batch = firestore().batch();

    listItemsQuerySnapshot.forEach((documentSnapshot) => {
        batch.delete(documentSnapshot.ref);
    });
    batch.delete(listDocument.ref);

    return batch.commit();
};

export const addFirestoreListItem = async (listId: string, item: { name: string, quantity: number }): Promise<string | undefined> => {
    const userId = store.getState().user.uid;
    if (!userId || item.quantity <= 0 || item.name === '') {
        return undefined;
    }

    try {
        const newListItem: FirestoreListItem = {
            ...item,
            status: ItemStatus.TODO,
            addedBy: userId,
            updatedAt: moment(new Date()).valueOf()
        };
        const createdListItem = await firestore().collection(`lists/${listId}/items`).add(newListItem);
        return createdListItem.id;
    } catch (error) {
        console.log('error', error);
        return undefined;
    }
};

export const updateFirestoreListItem = async (listId: string, itemId: string, updates: Partial<ListItem>): Promise<void> => {
    if (!updates) {
        return;
    }

    try {
        return await firestore().collection(`lists/${listId}/items`).doc(itemId)
            .update({...updates, updatedAt: moment(new Date()).valueOf()});
    } catch (error) {
        console.log('error', error);
        return;
    }
};

export const removeFirestoreListItem = (listId: string, itemId: string): void => {
    firestore().collection(`lists/${listId}/items`)
        .doc(itemId)
        .delete()
        .then(() => console.log('removed list item'))
        .catch((error) => console.log('error', error));
};
