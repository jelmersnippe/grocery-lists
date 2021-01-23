import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        marginLeft: 8,
        fontSize: 18
    }
});

export default styles;
