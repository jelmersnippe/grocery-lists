import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AppTabsParamList} from '../../navigators/AppTabs';

export type Props = {
    navigation: DrawerNavigationProp<AppTabsParamList, 'GroupOverview'>;
}
