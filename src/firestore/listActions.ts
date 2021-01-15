import firestore from '@react-native-firebase/firestore';
import {FirestoreList} from './types';
import {addList} from '../reducers/lists/actions';
import {store} from '../config/store';

const subscribeToUpdates = () => {
    return firestore().collection('lists').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
            const data = documentSnapshot.data() as FirestoreList;
            const id = documentSnapshot.id;
            store.dispatch(addList({id: id, list: data}));
        });
    });
};

const firestoreListActions = {
    subscribeToUpdates
};

export default firestoreListActions;
