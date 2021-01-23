import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginBottom: 5
    },
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        flex: 1,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
    },
    name: {
        flex: 1,
        fontSize: 18,
        marginRight: 10
    },
    deleteButton: {
        paddingHorizontal: 10,
        marginLeft: 8,
        justifyContent: 'center'
    }
});
