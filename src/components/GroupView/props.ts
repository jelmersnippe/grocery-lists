import {Group} from '../../reducers/groups/types';

export type Props = {
    groups: Array<Group>;
    editable: boolean;
    removeAction: (groupUid: string) => void;
}
