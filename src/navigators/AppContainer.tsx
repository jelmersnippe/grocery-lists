import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {RootState} from '../reducers';
import {resetUser, setUser} from '../reducers/user/actions';

const AppContainer = () => {
    const dispatch = useDispatch();
    const userState = useSelector((rootState: RootState) => rootState.user);

    useEffect(() => {
        return auth().onAuthStateChanged((user) => {
            if (!user) {
                dispatch(resetUser());
            } else {
                dispatch(setUser({
                    displayName: user.displayName ?? undefined,
                    email: user.email ?? undefined,
                    uid: user.uid
                }));
            }
        });
    }, []);

    return (
        <SafeAreaView style={styles.appContainer}>
            {
                userState.uid ?
                    <AppStack/>
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
