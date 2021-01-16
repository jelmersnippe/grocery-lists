import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    titleContainer: {
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
        fontWeight: 'bold'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black'
    },
    headerQuantity: {
        fontSize: 16,
        paddingVertical: 10,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        width: '12.5%',
        marginRight: 10
    },
    headerName: {
        fontSize: 16,
        paddingVertical: 10
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
    }
});

export default styles;
