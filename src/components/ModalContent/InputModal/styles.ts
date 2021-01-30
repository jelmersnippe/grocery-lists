import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: theme.colors.black,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    deleteButtonContainer: {marginLeft: 'auto', marginBottom: 10},
    deleteButtonButton: {borderColor: theme.colors.red, paddingHorizontal: 10},
    deleteButtonTitle: {color: theme.colors.red}
});

export default styles;
