import styles from './styles';
import {Text, TouchableOpacity} from 'react-native';
import {capitalize} from '../../../utils/capitalize';
import React, {FunctionComponent, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Props} from './props';

const GroupItem: FunctionComponent<Props> = ({group, editable, removeAction}) => {
    const [opened, setOpened] = useState(false);

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
        <TouchableOpacity
            style={styles.container}
            delayLongPress={500}
            onLongPress={() => editable && setOpened(true)}
            activeOpacity={editable ? 0.6 : 1}
        >
            <Text style={styles.name}>
                {capitalize(group.name)}
            </Text>
            {
                opened &&
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeAction(group.uid)}
                >
                    <Icon name={'delete'} size={32} color={'tomato'}/>
                </TouchableOpacity>
            }
        </TouchableOpacity>
    );
};

export default GroupItem;
