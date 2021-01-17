import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '60%',
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
