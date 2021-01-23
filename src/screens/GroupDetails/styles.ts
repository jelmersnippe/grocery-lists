import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    fab: {
        backgroundColor: 'black',
        borderRadius: 24,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 8,
        right: 8
    }
});

export default styles;
