import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 5
    },
    header: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
    addUsersButton: {...theme.iconButton, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, marginLeft: 'auto'},
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10
    },
    userContainer: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default styles;
