import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {removeFirestoreListItem, updateFirestoreListItem} from '../../firestore/listActions';
import {ItemStatus} from '../../reducers/lists/types';
import {Props} from './props';
import styles from './styles';
import firestoreUserActions from '../../firestore/userActions';
import {UserInfo} from '../../reducers/userCache/types';
import {capitalize} from '../../utils/capitalize';

const ListItem: FunctionComponent<Props> = ({item, listId, listItemId}) => {
    const [opened, setOpened] = useState(false);
    const [addedBy, setAddedBy] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const addedByUser = await firestoreUserActions.getByUid(item.addedBy);
            setAddedBy(addedByUser);
        })();
    }, [item.addedBy]);

    return (
        <TouchableOpacity
            style={[
                styles.wrapper,
                item.status === ItemStatus.DONE && {backgroundColor: 'lightgray'}
            ]}
            delayLongPress={0}
            onLongPress={() => {
                setOpened(true);
                setTimeout(() => {
                    setOpened(false);
                }, 5000);
            }}
        >
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
            {
                opened ?
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => removeFirestoreListItem(listId, listItemId)}
                    >
                        <Icon name={'trash'} size={26} color={'tomato'}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => updateFirestoreListItem(listId, listItemId, {status: item.status === ItemStatus.TODO ? ItemStatus.DONE : ItemStatus.TODO})}
                    >
                        <Icon name={item.status === ItemStatus.TODO ? 'checkbox-outline' : 'checkbox'} size={26} color={'black'}/>
                    </TouchableOpacity>
            }
        </TouchableOpacity>
    );
};

export default ListItem;
