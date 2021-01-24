import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';

const colors = {
    background: 'white',
    white: '#ffffff',
    black: '#011627',
    red: '#FF0022',
    blue: '#02A9EA',
    gray: '#EAEAEA',
    grayDark: '#a1a1a1',
    primary: '#e6f2ff',
    primaryDark: '#2d4c74'
};

const defaultFontFamily = Platform.OS === 'android' ? 'raleway' : 'Raleway';

const defaultText: TextStyle = {
    fontFamily: defaultFontFamily,
    fontWeight: 'normal',
    fontSize: 18
};

const rowContainer: ViewStyle = {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    backgroundColor: colors.primary
};

const lightShadow: ViewStyle = {
    shadowColor: colors.black,
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
};

const heavyShadow: ViewStyle = {
    shadowOffset: {
        width: 0,
        height: 10
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 10
};

const floatingActionButton: ViewStyle = {
    backgroundColor: colors.blue,
    borderColor: colors.primaryDark,
    borderWidth: 1,
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

type ButtonStyling = {container: ViewStyle, text: TextStyle}
type MainButtonsStyle = {
    primary: ButtonStyling,
    secondary: ButtonStyling,
    tertiary: ButtonStyling
}
const buttons: MainButtonsStyle = {
    primary: {
        container: {
            backgroundColor: colors.black,
            alignItems: 'center',
            padding: 10
        },
        text: {
            color: colors.white
        }
    },
    secondary: {
        container: {
            backgroundColor: colors.white,
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: colors.black
        },
        text: {
            color: colors.black
        }
    },
    tertiary: {
        container: {
            padding: 10
        },
        text: {
            color: colors.black,
            textDecorationLine: 'underline'
        }
    }
};

const theme = {
    colors,
    defaultText,
    rowContainer,
    lightShadow,
    heavyShadow,
    floatingActionButton,
    iconButton,
    pageTitle,
    buttons
};

export default theme;
