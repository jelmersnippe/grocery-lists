import {FirestoreUserUid} from '../../firestore/types';

export interface Props {
    saveAction: (usersToAdd: Array<FirestoreUserUid>, usersToRmove: Array<FirestoreUserUid>) => void;
    initialUsers: Array<FirestoreUserUid>;
    editable: boolean;
}
