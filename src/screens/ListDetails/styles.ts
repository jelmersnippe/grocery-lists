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
    tabContainer: {
        flexDirection: 'row'
    },
    tabButton: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    activeTabButton: {
        flex: 0.6
    },
    tabButtonText: {
        paddingVertical: 10,
        fontSize: 20
    }
});

export default styles;
