import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.black
    },
    button: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: theme.colors.black
    },
    input: {
        height: 40,
        width: 40,
        textAlign: 'center'
    }
});

export default styles;
