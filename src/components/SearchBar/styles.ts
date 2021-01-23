import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 'auto',
        borderWidth: 1,
        borderColor: 'black'
    },
    searchInputContainer: {
        flex: 1
    },
    searchInput: {
        borderWidth: 0
    },
    searchIcon: {
        paddingHorizontal: 5
    }
});

export default styles;
