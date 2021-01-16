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

const addList = (name: string): void => {
    const userId = store.getState().user.uid;
    if (!userId) {
        return;
    }

    const userDocRef = firestore().collection('users').doc(userId);
    firestore().collection('lists')
        .add({
            name: name,
            creator: userDocRef
        })
        .then(() => console.log('added list'))
        .catch((error) => console.log('error',error));
};

const removeList = (listId: string): void => {
    firestore().collection('lists')
        .doc(listId)
        .delete()
        .then(() => console.log('removed list'))
        .catch((error) => console.log('error',error));
};

const addListItem = (listId: string, item: FirestoreListItem): void => {
    firestore().collection(`lists/${listId}/items`)
        .add(item)
        .then(() => console.log('added list item'))
        .catch((error) => console.log('error',error));
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
