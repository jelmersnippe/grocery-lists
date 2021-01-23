import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {removeFirestoreListItem, updateFirestoreListItem} from '../../../firestore/listActions';
import {ItemStatus} from '../../../reducers/lists/types';
import {Props} from './props';
import styles from './styles';
import {getUser} from '../../../firestore/userActions';
import {UserInfo} from '../../../reducers/userCache/types';
import {capitalize} from '../../../utils/capitalize';
import Checkbox from '../../Checkbox';
import theme from '../../../config/theme';

const ListItemRow: FunctionComponent<Props> = ({item, listId, listItemId}) => {
    const [opened, setOpened] = useState(false);
    const [addedBy, setAddedBy] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const addedByUser = await getUser(item.addedBy);
            setAddedBy(addedByUser);
        })();
    }, [item.addedBy]);

    useEffect(() => {
        if (opened) {
            const close = setTimeout(() => {
                setOpened(false);
            }, 5000);

            return () => clearTimeout(close);
        }

        return;
    }, [opened]);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[
                    theme.rowContainer,
                    {backgroundColor: item.status === ItemStatus.DONE ? 'lightgray' : 'white'},
                    item.status !== ItemStatus.DONE && theme.rowContainerShadow
                ]}
                delayLongPress={500}
                onLongPress={() => setOpened(true)}
            >
                <Checkbox
                    checked={item.status !== ItemStatus.TODO}
                    onPress={() => updateFirestoreListItem(listId, listItemId, {status: item.status === ItemStatus.TODO ? ItemStatus.DONE : ItemStatus.TODO})}
                />
                <View style={styles.quantity}>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Icon name={'close'} size={18} color={'black'}/>
                </View>
                <Text
                    style={[
                        styles.name,
                        item.status === ItemStatus.DONE && {textDecorationLine: 'line-through'}
                    ]}
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                >
                    {item.name}
                </Text>
                {addedBy &&
                <View style={styles.addedBy}>
                    <Text>{capitalize(addedBy.name)}</Text>
                </View>
                }
            </TouchableOpacity>

            {
                opened &&
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeFirestoreListItem(listId, listItemId)}
                >
                    <Icon name={'delete'} size={32} color={'tomato'}/>
                </TouchableOpacity>
            }
        </View>
    );
};

export default ListItemRow;
