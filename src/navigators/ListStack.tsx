import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {AppTabsParamList} from './AppTabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import ListDetails from '../screens/ListDetails';
import ListOverview from '../screens/ListOverview';
import Icon from 'react-native-vector-icons/Ionicons';

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
                        style={{padding: 5, marginRight: 10}}
                    >
                        <Icon name={'settings-outline'} size={30}/>
                    </TouchableOpacity>
                )
            }}
        >
            <Stack.Screen name='ListOverview' component={ListOverview}/>
            <Stack.Screen name='ListDetails' component={ListDetails}/>
        </Stack.Navigator>
    );
};

export default ListStack;
