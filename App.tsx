import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './src/screens/Home';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.appContainer}>
                <Home/>
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
