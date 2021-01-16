import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GroupDetails from '../screens/GroupDetails';
import GroupOverview from '../screens/GroupOverview';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AppTabsParamList} from './AppTabs';

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
                        style={{padding: 5, marginRight: 10}}
                    >
                        <Icon name={'settings-outline'} size={30}/>
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
