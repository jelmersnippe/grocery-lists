import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppTabsParamList} from './AppTabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import ListDetails from '../screens/ListDetails';
import ListOverview from '../screens/ListOverview';
import {useTranslation} from 'react-i18next';
import CustomHeader from '../components/Header';

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
                header: ({scene, previous}) => {
                    return (
                        <CustomHeader title={t(scene.route.name)} showBackButton={!!previous}/>
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
