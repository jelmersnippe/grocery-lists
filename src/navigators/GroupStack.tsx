import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GroupDetails from '../screens/GroupDetails';
import GroupOverview from '../screens/GroupOverview';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AppTabsParamList} from './AppTabs';
import theme from '../config/theme';

export type GroupStackParamList = {
    GroupOverview: undefined;
    GroupDetails: {
        id: string
    };
}

const Stack = createStackNavigator<GroupStackParamList>();

interface Props {
    navigation: DrawerNavigationProp<AppTabsParamList, 'Lists'>;
}

const GroupStack: FunctionComponent<Props> = ({navigation}) => {
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
                )
            }}
        >
            <Stack.Screen name='GroupOverview' component={GroupOverview}/>
            <Stack.Screen name='GroupDetails' component={GroupDetails}/>
        </Stack.Navigator>
    );
};

export default GroupStack;
