import firestore from '@react-native-firebase/firestore';
import {FirestoreList, FirestoreListItem} from './types';
import lists from '../reducers/lists/actions';
import {store} from '../config/store';

const subscribeToListUpdates = (): () => void => {
    return firestore().collection('lists').onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach(async (documentChange) => {
            const id = documentChange.doc.id;
            switch (documentChange.type) {
                case 'removed':
                    store.dispatch(lists.remove(id));
                    break;
                default:
                    const list = {...documentChange.doc.data()} as FirestoreList;
                    store.dispatch(lists.add({id, list}));
                    break;
            }
        });
    });
};

const subscribeToItemUpdates = (listId: string): () => void => {
    return firestore().collection(`lists/${listId}/items`).onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((documentChange) => {
            const id = documentChange.doc.id;
            switch (documentChange.type) {
                case 'removed':
                    store.dispatch(lists.removeItem({listId, listItemId: id}));
                    break;
                default:
                    const data = documentChange.doc.data() as FirestoreListItem;
                    const listItem = {id, data};
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

const addListItem = async (listId: string, item: FirestoreListItem): Promise<string | undefined> => {
    if (item.quantity <= 0 || item.name === '') {
        return undefined;
    }

    try {
        const createdListItem = await firestore().collection(`lists/${listId}/items`).add(item);
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
