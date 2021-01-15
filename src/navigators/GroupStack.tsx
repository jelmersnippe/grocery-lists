import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GroupDetails from '../screens/GroupDetails';
import GroupOverview from '../screens/GroupOverview';

export type GroupStackParamList = {
    GroupOverview: undefined;
    GroupDetails: {
        id: string
    };
}

const Stack = createStackNavigator<GroupStackParamList>();

const GroupStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='GroupOverview' component={GroupOverview}/>
            <Stack.Screen name='GroupDetails' component={GroupDetails}/>
        </Stack.Navigator>
    );
};

export default GroupStack;
