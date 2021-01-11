import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigators/AuthStack';

const App = () => {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.appContainer}>
                <AuthStack />
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1
    }
});
