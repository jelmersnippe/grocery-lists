import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginBottom: 5,
        marginHorizontal: 10
    },
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        flex: 1
    },
    containerShadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
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
