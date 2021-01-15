import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, Text} from 'react-native';
import {AppTabsParamList} from './AppTabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import ListDetails from '../screens/ListDetails';
import ListOverview from '../screens/ListOverview';

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
                    >
                        <Text>Menu</Text>
                    </TouchableOpacity>
                )
            }}
        >
            <Stack.Screen name='ListOverview' component={ListOverview} />
            <Stack.Screen name='ListDetails' component={ListDetails} />
        </Stack.Navigator>
    );
};

export default ListStack;
