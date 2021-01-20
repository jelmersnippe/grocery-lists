import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black'
    },
    headerTextContainer: {
        width: '80%'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginRight: 'auto'
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
