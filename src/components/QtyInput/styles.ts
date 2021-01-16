import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'black'
    },
    input: {
        height: 40,
        width: 40,
        textAlign: 'center'
    }
});

export default styles;
