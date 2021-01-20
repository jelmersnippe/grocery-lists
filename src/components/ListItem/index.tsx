import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {updateFirestoreListItem} from '../../firestore/listActions';
import {ItemStatus} from '../../reducers/lists/types';
import {Props} from './props';
import styles from './styles';

const ListItem: FunctionComponent<Props> = ({item, listId, listItemId}) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemQuantity}>
                <Text style={styles.itemQuantityText}>{item.quantity}</Text>
                <Icon name={'close'} size={18} color={'black'}/>
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity
                onPress={() => updateFirestoreListItem(listId, listItemId, {status: item.status === ItemStatus.TODO ? ItemStatus.DONE : ItemStatus.TODO})}>
                <Icon name={item.status === ItemStatus.TODO ? 'checkbox-outline' : 'checkbox'} size={26} color={'black'}/>
            </TouchableOpacity>
        </View>
    );
};

export default ListItem;
