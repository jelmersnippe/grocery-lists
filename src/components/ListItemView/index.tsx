import React, {FunctionComponent, useRef, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import QtyInput from '../QtyInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {addFirestoreListItem} from '../../firestore/listActions';
import {ItemStatus} from '../../reducers/lists/types';
import moment from 'moment';
import ListItemRow from '../ListItemRow';
import {useTranslation} from 'react-i18next';

const ListItemView: FunctionComponent<Props> = ({listId, items}) => {
    const [inputQty, setInputQty] = useState(0);
    const [inputName, setInputName] = useState('');
    const inputNameRef = useRef<TextInput>(null);

    const {t} = useTranslation('lists');

    const addItem = async () => {
        const createdItem = await addFirestoreListItem(listId, {
            name: inputName,
            quantity: inputQty
        });
        if (createdItem) {
            setInputName('');
        }
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

    return (
        <>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
            >
                {renderDetails()}
            </ScrollView>
            <View style={styles.addItemContainer}>
                <QtyInput onChangeValue={(value) => setInputQty(value)}/>
                <View style={styles.addItemInputContainer}>
                    <TextInput
                        placeholder={t('itemName')}
                        style={styles.addItemInput}
                        value={inputName}
                        onChangeText={(value) => setInputName(value)}
                        onSubmitEditing={() => addItem()}
                        blurOnSubmit={false}
                        ref={inputNameRef}
                    />
                    <TouchableOpacity
                        onPress={() => addItem()}
                    >
                        <Icon name={'add-circle-outline'} size={30} color={'black'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default ListItemView;
