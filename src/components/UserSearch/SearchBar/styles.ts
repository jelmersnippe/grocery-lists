import {StyleSheet} from 'react-native';
import theme from '../../../config/theme';

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 'auto',
        borderWidth: 1,
        borderColor: theme.colors.black
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
