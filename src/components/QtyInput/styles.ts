import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: theme.colors.black,
        alignItems: 'center'
    },
    button: {
        width: 50,
        height: 50
    },
    input: {
        width: 50,
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.black,
        textAlign: 'center'
    }
});

export default styles;
