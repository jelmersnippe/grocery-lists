import {User} from '../../reducers/userCache/types';

export type Props = {
    initialUsers: Array<User>;
    saveAction: (usersToAdd: Array<string>, usersToRemove: Array<string>) => void;
    nonEditableUsers: Array<string>;
}
