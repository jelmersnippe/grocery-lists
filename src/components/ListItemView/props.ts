import {ListItem} from '../../reducers/lists/types';

export type Props = {
    listId: string;
    items?: { [key: string]: ListItem };
}
