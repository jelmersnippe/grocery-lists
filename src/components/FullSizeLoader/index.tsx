import {ActivityIndicator, Text, View} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import Button from '../Button';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {useNavigation} from '@react-navigation/native';

const FullSizeLoader: FunctionComponent<Props> = ({size = 100, color = 'black'}) => {
    const [showButton, setShowButton] = useState(false);
    const {state, dispatch} = useOverlayData();
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            setShowButton(true);
        }, 5000);
    }, []);

    const goBack = () => {
        if (state?.isVisible) {
            dispatch(resetOverlay());
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            {
                showButton ?
                    <>
                        <Text>Something went wrong</Text>
                        <Button
                            text={'Go back'}
                            onPress={() => goBack()}
                        />
                    </>
                    : <ActivityIndicator size={size} color={color}/>
            }
        </View>
    );
};

export default FullSizeLoader;
