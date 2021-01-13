import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '60%',
        padding: 10,
        marginVertical: 10
    },
    linkWrapper: {
        padding: 10
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    buttonContainer: {
        backgroundColor: 'black',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    },
    error: {
        color: 'tomato',
        fontWeight: 'bold'
    }
});

export default styles;
