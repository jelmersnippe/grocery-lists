import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    groupCard: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    groupName: {fontWeight: 'bold'},
    addUserButton: {...theme.iconButton, flexDirection: 'row', alignItems: 'center'},
    userItem: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    deleteButtonContainer: {marginLeft: 'auto', marginTop: 15},
    deleteButtonButton: {borderColor: theme.colors.red, paddingHorizontal: 10},
    deleteButtonTitle: {color: theme.colors.red}
});

export default styles;
