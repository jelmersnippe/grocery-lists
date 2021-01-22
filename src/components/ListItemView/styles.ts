import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
