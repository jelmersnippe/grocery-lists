import AuthStack from './AuthStack';
import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';
import DrawerMenu from './DrawerMenu';
import theme from '../config/theme';
import i18next from 'i18next';

const AppContainer = () => {
    const userState = useSelector((rootState: RootState) => rootState.user);
    const settings = useSelector((rootState: RootState) => rootState.settings);

    useEffect(() => {
        (async () => {
            i18next.changeLanguage(settings.language);
        })();
    }, [settings.language]);

    return (
        <SafeAreaView style={styles.appContainer}>
            {
                userState.uid ?
                    <DrawerMenu/>
                    :
                    <AuthStack/>
            }
        </SafeAreaView>
    );
};

export default AppContainer;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: theme.colors.background
    }
});
