import firestore from '@react-native-firebase/firestore';
import {FirestoreList, FirestoreListItem} from './types';
import {store} from '../config/store';
import {List, ListItem} from '../reducers/lists/types';
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

                switch (documentChange.type) {
                    case 'removed':
                        store.dispatch(removeList(listId));
                        break;
                    default:
                        const documentData = documentChange.doc.data() as FirestoreList;
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
                        updatedAt: new Date(documentData.updatedAt)
                    };
                    const listItem = {id: listItemId, data: listItemData};
                    store.dispatch(addListItem({listId, listItem}));
                    break;
            }
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

export const removeFirestoreList = async (listId: string): Promise<void> => {
    const listDocument = await firestore().collection('lists').doc(listId).get();
    const listItemsQuerySnapshot = await firestore().collection(`lists/${listId}/items`).get();

    const batch = firestore().batch();

    listItemsQuerySnapshot.forEach((documentSnapshot) => {
        batch.delete(documentSnapshot.ref);
    });
    batch.delete(listDocument.ref);

    return batch.commit();
};

export const addFirestoreListItem = async (listId: string, item: ListItem): Promise<string | undefined> => {
    if (item.quantity <= 0 || item.name === '') {
        return undefined;
    }

    try {
        const createdListItem = await firestore().collection(`lists/${listId}/items`).add({
            ...item,
            updatedAt: moment(item.updatedAt).valueOf()
        });
        return createdListItem.id;
    } catch (error) {
        console.log('error', error);
        return undefined;
    }
};

export const removeFirestoreListItem = (listId: string, itemId: string): void => {
    firestore().collection(`lists/${listId}/items`)
        .doc(itemId)
        .delete()
        .then(() => console.log('removed list item'))
        .catch((error) => console.log('error', error));
};
