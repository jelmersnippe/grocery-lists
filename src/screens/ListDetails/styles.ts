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
    tabContainer: {
        flexDirection: 'row'
    },
    tabButton: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    activeTabButton: {
        flex: 0.6,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 10
    },
    tabButtonText: {
        paddingVertical: 10,
        fontSize: 20,
        color: 'gray'
    },
    activeTabButtonText: {
        color: 'black'
    }
});

export default styles;
