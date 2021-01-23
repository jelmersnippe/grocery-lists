import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        marginLeft: 8,
        fontSize: 18
    }
});

export default styles;
