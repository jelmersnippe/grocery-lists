import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    button: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: theme.colors.black
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: theme.colors.black,
        textAlign: 'center'
    }
});

export default styles;
