import firestore from '@react-native-firebase/firestore';
import {FirestoreGroup} from './types';
import {addGroup} from '../reducers/groups/actions';
import {store} from '../config/store';

const subscribeToUpdates = () => {
    return firestore().collection('groups').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
            console.log('documentSnapshot received in group subscribe');
            const data = documentSnapshot.data() as FirestoreGroup;
            const id = documentSnapshot.id;
            console.log({id, data});
            store.dispatch(addGroup({id: id, group: data}));
        });
    });
};

const firestoreGroupActions = {
    subscribeToUpdates
};

export default firestoreGroupActions;
