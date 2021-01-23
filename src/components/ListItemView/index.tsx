import React, {FunctionComponent} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Props} from './props';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {addFirestoreListItem} from '../../firestore/listActions';
import {ItemStatus} from '../../reducers/lists/types';
import moment from 'moment';
import ListItemRow from './ListItemRow';
import {setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import AddItemModal from '../ModalContent/AddItemModal';
import styles from './styles';
import theme from '../../config/theme';

const ListItemView: FunctionComponent<Props> = ({listId, items}) => {
    const {dispatch} = useOverlayData();

    const addItem = async (name: string, qty: number) => {
        await addFirestoreListItem(listId, {
            name: name,
            quantity: qty
        });
    };

    const renderDetails = (): Array<JSX.Element> => {
        const listItems: Array<JSX.Element> = [];

        if (items) {
            const sortedItems = Object.keys(items)
                .map((key) => ({
                    ...items[key],
                    uid: key
                }))
                .sort((a, b) => moment(b.updatedAt).valueOf() - moment(a.updatedAt).valueOf());
            const todoItems = sortedItems.filter((item) => item.status === ItemStatus.TODO);
            const doneItems = sortedItems.filter((item) => item.status === ItemStatus.DONE);
            for (const item of todoItems) {
                listItems.push(<ListItemRow key={item.uid} item={item} listId={listId} listItemId={item.uid}/>);
            }
            for (const item of doneItems) {
                listItems.push(<ListItemRow key={item.uid} item={item} listId={listId} listItemId={item.uid}/>);
            }
        }

        return listItems;
    };

    const openAddItemModal = () => {
        dispatch(setOverlay({
            content: <AddItemModal
                addAction={(name, qty) => addItem(name, qty)}
            />
        }));
    };

    return (
        <>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContentContainer}
            >
                {renderDetails()}
            </ScrollView>
            <TouchableOpacity
                onPress={() => openAddItemModal()}
                style={theme.floatingActionButton}
            >
                <Icon name={'add'} size={32} color={'white'}/>
            </TouchableOpacity>
        </>
    );
};

export default ListItemView;
