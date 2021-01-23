import React, {FunctionComponent, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Props} from './props';
import {capitalize} from '../../../utils/capitalize';
import {useTranslation} from 'react-i18next';
import theme from '../../../config/theme';

export const UserItem: FunctionComponent<Props> = ({user, editable, removeAction, isCurrentUser}) => {
    const [opened, setOpened] = useState(false);
    const {t} = useTranslation();

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
                style={[theme.rowContainer, theme.rowContainerShadow]}
                delayLongPress={500}
                onLongPress={() => (editable && !isCurrentUser) && setOpened(true)}
                activeOpacity={(editable && !isCurrentUser) ? 0.6 : 1}
            >
                <Text
                    style={styles.name}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {capitalize(user.name)}
                    {isCurrentUser && ` (${t('common:you')})`}
                </Text>
            </TouchableOpacity>
            {
                opened &&
                <TouchableOpacity
                    style={theme.iconButton}
                    onPress={() => removeAction(user.uid)}
                >
                    <Icon name={'delete'} size={32} color={'tomato'}/>
                </TouchableOpacity>
            }
        </View>
    );
};
