import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black'
    },
    itemQuantity: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '12.5%',
        marginRight: 10
    },
    itemQuantityText: {
        fontSize: 18,
        marginRight: -2
    },
    itemName: {
        flex: 1,
        fontSize: 18
    }
});

export default styles;
