import {StyleSheet} from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.background
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.black
    },
    headerTextContainer: {
        width: '80%'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabContainer: {
        flexDirection: 'row'
    },
    tabButton: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.grayDark,
        margin: 10,
        borderRadius: 15,
        backgroundColor: theme.colors.gray
    },
    activeTabButton: {
        flex: 0.6,
        borderColor: theme.colors.black,
        backgroundColor: theme.colors.white
    },
    tabButtonText: {
        paddingVertical: 10,
        fontSize: 20,
        color: theme.colors.grayDark
    },
    activeTabButtonText: {
        color: theme.colors.black
    }
});

export default styles;
