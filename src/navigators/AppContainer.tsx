import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {RESET_USER, SET_USER} from '../reducers/userReducer';
import {RootState} from '../config/store';

const AppContainer = () => {
    const dispatch = useDispatch();
    const userState = useSelector((rootState: RootState) => rootState.user);
    console.log(userState);

    useEffect(() => {
        return auth().onAuthStateChanged((user) => {
            if (!user) {
                dispatch({type: RESET_USER});
            } else {
                dispatch({
                    type: SET_USER, payload: {
                        displayName: user?.displayName,
                        email: user?.email,
                        uid: user?.uid
                    }
                });
            }
        });
    }, [dispatch]);

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
