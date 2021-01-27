import {Header} from 'react-native-elements';
import Text from '../Text';
import theme from '../../config/theme';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {FunctionComponent} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Props} from './props';

const CustomHeader: FunctionComponent<Props> = ({title, showBackButton}) => {
    const navigation = useNavigation();

    return (
        <Header
            leftComponent={showBackButton ?
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-back'} color={theme.colors.white} size={26} />
                </TouchableOpacity>
                : <></>
            }
            centerComponent={<Text style={theme.headerText}>{title}</Text>}
            rightComponent={
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
                    <Icon name={'settings'} color={theme.colors.white} size={26} />
                </TouchableOpacity>
            }
        />
    );
};

export default CustomHeader;
