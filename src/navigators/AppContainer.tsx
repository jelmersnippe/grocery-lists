import AuthStack from './AuthStack';
import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {RootState} from '../reducers';
import {resetUser, setUser} from '../reducers/user/actions';
import DrawerMenu from './DrawerMenu';

const AppContainer = () => {
    const dispatch = useDispatch();
    const userState = useSelector((rootState: RootState) => rootState.user);

    useEffect(() => {
        return auth().onAuthStateChanged((user) => {
            console.log('auth state changed', user);
            if (user) {
                dispatch(setUser({
                    displayName: user.displayName ?? undefined,
                    email: user.email ?? undefined,
                    uid: user.uid
                }));
            }
            else if (!user && userState) {
                dispatch(resetUser());
            }
        });
    }, []);

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
