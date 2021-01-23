import {Group} from '../../../reducers/groups/types';

export type Props = {
    group: Group;
    editable: boolean;
    removeAction: (groupUid: string) => void;
}
