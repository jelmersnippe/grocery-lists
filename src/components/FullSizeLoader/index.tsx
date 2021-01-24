import {ActivityIndicator, View} from 'react-native';
import Text from '../Text';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import Button from '../Button';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {useNavigation} from '@react-navigation/native';
import theme from '../../config/theme';

const FullSizeLoader: FunctionComponent<Props> = ({size = 100, color = theme.colors.black}) => {
    const [showButton, setShowButton] = useState(false);
    const {state, dispatch} = useOverlayData();
    const navigation = useNavigation();

    useEffect(() => {
        const goBackTimeout = setTimeout(() => {
            setShowButton(true);
        }, 5000);

        return () => clearTimeout(goBackTimeout);
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
