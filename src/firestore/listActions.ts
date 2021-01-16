import firestore from '@react-native-firebase/firestore';
import {FirestoreList, FirestoreListItem} from './types';
import lists from '../reducers/lists/actions';
import {store} from '../config/store';
import {List, ListItem} from '../reducers/lists/types';
import moment from 'moment';

const subscribeToListUpdates = (): () => void => {
    return firestore().collection('lists').onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach(async (documentChange) => {
            const listId = documentChange.doc.id;

            switch (documentChange.type) {
                case 'removed':
                    store.dispatch(lists.remove(listId));
                    break;
                default:
                    const documentData = documentChange.doc.data() as FirestoreList;
                    const creatorUid = documentData.creator.id;
                    const listData: List = {
                        name: documentData.name,
                        creatorUid: creatorUid
                    };
                    store.dispatch(lists.add({id: listId, list: listData}));
                    break;
            }
        });
    });
};

const subscribeToItemUpdates = (listId: string): () => void => {
    return firestore().collection(`lists/${listId}/items`).onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((documentChange) => {
            const listItemId = documentChange.doc.id;
            switch (documentChange.type) {
                case 'removed':
                    store.dispatch(lists.removeItem({listId, listItemId}));
                    break;
                default:
                    const documentData = documentChange.doc.data() as FirestoreListItem;
                    const listItemData: ListItem = {
                        name: documentData.name,
                        quantity: documentData.quantity,
                        updatedAt: new Date(documentData.updatedAt)
                    };
                    const listItem = {id: listItemId, data: listItemData};
                    store.dispatch(lists.addItem({listId, listItem}));
                    break;
            }
        });
    });
};

const addList = async (name: string): Promise<string | undefined> => {
    const userId = store.getState().user.uid;
    if (!userId) {
        return;
    }

    try {
        const userDocRef = firestore().collection('users').doc(userId);
        const createdList = await firestore().collection('lists')
            .add({
                name: name,
                creator: userDocRef
            });
        return createdList.id;
    } catch (error) {
        console.log('error',error);
        return undefined;
    }
};

const removeList = async (listId: string): Promise<void> => {
    const listDocument = await firestore().collection('lists').doc(listId).get();
    const listItemsQuerySnapshot = await firestore().collection(`lists/${listId}/items`).get();

    const batch = firestore().batch();

    listItemsQuerySnapshot.forEach((documentSnapshot) => {
        batch.delete(documentSnapshot.ref);
    });
    batch.delete(listDocument.ref);

    return batch.commit();
};

const addListItem = async (listId: string, item: ListItem): Promise<string | undefined> => {
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
        console.log('error',error);
        return undefined;
    }
};

const removeListItem = (listId: string, itemId: string): void => {
    firestore().collection(`lists/${listId}/items`)
        .doc(itemId)
        .delete()
        .then(() => console.log('removed list item'))
        .catch((error) => console.log('error',error));
};

const firestoreListActions = {
    subscribeToListUpdates,
    subscribeToItemUpdates,
    addList,
    removeList,
    addListItem,
    removeListItem
};

export default firestoreListActions;
