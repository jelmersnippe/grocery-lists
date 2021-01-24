import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {AppTabsParamList} from './AppTabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import ListDetails from '../screens/ListDetails';
import ListOverview from '../screens/ListOverview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';

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

const ListStack: FunctionComponent<Props> = ({navigation}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: (_) => (
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={[theme.iconButton, {marginRight: 5}]}
                    >
                        <Icon name={'settings'} size={30}/>
                    </TouchableOpacity>
                ),
                title: ''
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
