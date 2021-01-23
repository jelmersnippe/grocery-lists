import {User} from '../../reducers/userCache/types';

export interface Props {
    users: Array<User>;
    editable: boolean;
    userRemoveAction: (userId: string) => void;
}
