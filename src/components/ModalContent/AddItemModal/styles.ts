import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

const styles = StyleSheet.create({
    addItemInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        marginRight: 10,
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    errorText: {
        color: theme.colors.red,
        marginVertical: 5,
        fontWeight: 'bold'
    },
    addedContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: theme.colors.green
    }
});

export default styles;
