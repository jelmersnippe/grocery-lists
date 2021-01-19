import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '5%'
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
