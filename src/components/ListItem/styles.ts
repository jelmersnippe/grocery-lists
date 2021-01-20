import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: 18
    },
    addedBy: {
        marginRight: 10
    },
    iconButton: {}
});

export default styles;
