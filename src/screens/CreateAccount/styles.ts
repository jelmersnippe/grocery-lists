import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '5%',
        backgroundColor: theme.colors.background
    },
    input: {
        width: '60%',
        marginVertical: 10
    },
    error: {
        color: 'tomato',
        fontWeight: 'bold'
    }
});

export default styles;
