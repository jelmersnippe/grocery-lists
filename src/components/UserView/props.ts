import {User} from '../../reducers/userCache/types';

export interface Props {
    users: Array<User>;
    editable: boolean;
    removeAction: (userId: string) => void;
}
