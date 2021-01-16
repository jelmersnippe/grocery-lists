import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        width: '80%'
    },
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
    },
    addItemContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addItemInputContainer: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    addItemInput: {
        padding: 0,
        flex: 1
    }
});

export default styles;
