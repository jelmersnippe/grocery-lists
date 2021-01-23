import {User} from '../../../reducers/userCache/types';

export type Props = {
    user: User;
    editable: boolean;
    removeAction: (userId: string) => void;
    isCurrentUser: boolean;
}
