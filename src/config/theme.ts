import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const rowContainer: ViewStyle = {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    backgroundColor: 'white'
};

const rowContainerShadow: ViewStyle = {
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
};

const floatingActionButton: ViewStyle = {
    backgroundColor: 'black',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: 8
};

const iconButton: ViewStyle = {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
};

const pageTitle: TextStyle = {
    fontSize: 36,
    fontWeight: 'bold'
};

const buttons: {[key: string]: {container: ViewStyle, text: TextStyle}} = {
    primary: {
        container: {
            backgroundColor: 'black',
            alignItems: 'center',
            padding: 10
        },
        text: {
            color: 'white'
        }
    },
    secondary: {
        container: {
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: 'black'
        },
        text: {
            color: 'black'
        }
    },
    tertiary: {
        container: {
            padding: 10
        },
        text: {
            color: 'black',
            textDecorationLine: 'underline'
        }
    }
};

const theme = {
    rowContainer,
    rowContainerShadow,
    floatingActionButton,
    iconButton,
    pageTitle,
    buttons
};

export default theme;
