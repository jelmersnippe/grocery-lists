import AuthStack from './AuthStack';
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';
import DrawerMenu from './DrawerMenu';

const AppContainer = () => {
    const userState = useSelector((rootState: RootState) => rootState.user);

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
        flex: 1
    }
});
