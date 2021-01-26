import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {AppTabsParamList} from './AppTabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import ListDetails from '../screens/ListDetails';
import ListOverview from '../screens/ListOverview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';
import Text from '../components/Text';
import {Header} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import { DrawerActions } from '@react-navigation/native';

export type ListStackParamList = {
    ListOverview: undefined;
    ListDetails: {
        id: string;
    };
}

const Stack = createStackNavigator<ListStackParamList>();

interface Props {
    navigation: DrawerNavigationProp<AppTabsParamList, 'Lists'>;
}

const ListStack: FunctionComponent<Props> = ({}) => {
    const {t} = useTranslation('navigation');

    return (
        <Stack.Navigator
            screenOptions={{
                header: ({scene, previous, navigation}) => {
                    return (
                        <Header
                            leftComponent={previous && (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Icon name={'arrow-back'} color={theme.colors.white} size={26}/>
                                </TouchableOpacity>
                            )}
                            centerComponent={<Text style={theme.headerText}>{t(scene.route.name)}</Text>}
                            rightComponent={
                                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                    <Icon name={'settings'} color={theme.colors.white} size={26}/>
                                </TouchableOpacity>
                            }
                        />
                    );
                }
            }}
        >
            <Stack.Screen
                name='ListOverview'
                component={ListOverview}
            />
            <Stack.Screen
                name='ListDetails'
                component={ListDetails}
            />
        </Stack.Navigator>
    );
};

export default ListStack;
