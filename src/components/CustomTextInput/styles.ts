import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    container: {},
    label: {
        marginBottom: 5,
        color: theme.colors.black
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.black,
        backgroundColor: theme.colors.white,
        color: theme.colors.black,
        width: '100%',
        paddingHorizontal: 10
    }
});

export default styles;
