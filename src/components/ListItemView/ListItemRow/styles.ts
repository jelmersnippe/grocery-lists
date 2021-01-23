import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginBottom: 5,
        marginHorizontal: 10
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '12.5%',
        marginRight: 10
    },
    quantityText: {
        fontSize: 18,
        marginRight: -2,
        color: theme.colors.black
    },
    name: {
        flex: 1,
        fontSize: 18,
        marginRight: 10,
        color: theme.colors.black
    },
    addedBy: {
        marginRight: 10,
        color: theme.colors.black
    },
    deleteButton: {
        paddingHorizontal: 10,
        marginLeft: 8,
        justifyContent: 'center'
    }
});

export default styles;
