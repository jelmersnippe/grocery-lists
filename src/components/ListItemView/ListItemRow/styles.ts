import {StyleSheet} from 'react-native';

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
        marginRight: -2
    },
    name: {
        flex: 1,
        fontSize: 18,
        marginRight: 10
    },
    addedBy: {
        marginRight: 10
    },
    deleteButton: {
        paddingHorizontal: 10,
        marginLeft: 8,
        justifyContent: 'center'
    }
});

export default styles;
