import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 36,
        fontWeight: 'bold',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black'
    },
    listContainer: {
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'black'
    },
    listItemName: {
        fontSize: 18
    },
    listItemIcon: {
        marginLeft: 'auto'
    }
});

export default styles;
