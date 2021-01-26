import {User} from '../../reducers/userCache/types';

export interface Props {
    listId: string;
    users: Array<User>;
    editable: boolean;
    removeAction: (userId: string) => void;
}
