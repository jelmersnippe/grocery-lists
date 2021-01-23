import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: theme.colors.black,
        borderRadius: 25,
        backgroundColor: theme.colors.white
    },
    name: {
        color: theme.colors.black,
        fontSize: 22
    },
    deleteButton: {
        padding: 5
    }
});

export default styles;
