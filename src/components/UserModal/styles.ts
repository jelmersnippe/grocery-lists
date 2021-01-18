import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    userContainer: {
        flex: 1
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 'auto',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10
    },
    searchResultContainer: {
        flex: 1,
        maxHeight: 150
    },
    searchInputContainer: {
        flex: 1
    },
    searchInput: {
        borderWidth: 0
    },
    searchIcon: {
        paddingHorizontal: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default styles;
