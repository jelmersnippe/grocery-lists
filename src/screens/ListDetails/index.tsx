import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {FirestoreList} from '../../firestore/types';
import Icon from 'react-native-vector-icons/Ionicons';
import firestoreListActions from '../../firestore/listActions';
import {setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import QtyInput from '../../components/QtyInput';
import FullSizeLoader from '../../components/FullSizeLoader';

const ListDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {dispatch} = useOverlayData();
    const {id} = route.params;
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);
    const [inputQty, setInputQty] = useState(0);
    const [inputName, setInputName] = useState('');
    const inputNameRef = useRef<TextInput>(null);

    useEffect(() => {
        if (selectedList) {
            navigation.setOptions({title: selectedList.name});
        }
    }, [selectedList]);

    useEffect(() => {
        return firestoreListActions.subscribeToItemUpdates(id);
    }, []);

    const addItem = async () => {
        const createdItem = await firestoreListActions.addListItem(id, {name: inputName, quantity: inputQty});
        if (createdItem) {
            setInputName('');
        }
    };

    const renderDetails = (list: FirestoreList): Array<JSX.Element> => {
        const listItems: Array<JSX.Element> = [];

        if (list?.items) {
            for (const [key, value] of Object.entries(list.items)) {
                listItems.push(
                    <View key={key} style={styles.item}>
                        <View style={styles.itemQuantity}>
                            <Text style={styles.itemQuantityText}>{value.quantity}</Text>
                            <Icon name={'close'} size={18} color={'black'}/>
                        </View>
                        <Text style={styles.itemName}>{value.name}</Text>
                        <TouchableOpacity onPress={() => firestoreListActions.removeListItem(id, key)}>
                            <Icon name={'trash'} size={26} color={'tomato'}/>
                        </TouchableOpacity>
                    </View>
                );
            }
        }

        return listItems;
    };

    return (
        selectedList ?
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{selectedList.name}</Text>
                    <TouchableOpacity onPress={() => {
                        dispatch(setOverlay({
                            title: `Delete '${selectedList.name}'`,
                            text: 'Are you sure you want to delete this list?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    textStyle: {
                                        color: 'black'
                                    },
                                    style: {
                                        borderColor: 'black'
                                    }
                                },
                                {
                                    text: 'Delete',
                                    onPress: async () => {
                                        await firestoreListActions.removeList(id);
                                        navigation.popToTop();
                                    },
                                    textStyle: {
                                        color: 'red'
                                    },
                                    style: {
                                        borderColor: 'red'
                                    }
                                }
                            ],
                            buttonStyle: {
                                marginHorizontal: 10
                            }
                        }));
                    }}>
                        <Icon name={'trash'} size={30} color={'tomato'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    {renderDetails(selectedList)}
                </ScrollView>
                <View style={styles.addItemContainer}>
                    <QtyInput onChangeValue={(value) => setInputQty(value)}/>
                    <View style={styles.addItemInputContainer}>
                        <TextInput
                            placeholder={'Item name'}
                            style={styles.addItemInput}
                            value={inputName}
                            onChangeText={(value) => setInputName(value)}
                            onSubmitEditing={() => addItem()}
                            blurOnSubmit={false}
                            ref={inputNameRef}
                        />
                        <TouchableOpacity
                            onPress={() => addItem()}
                        >
                            <Icon name={'add-circle-outline'} size={30} color={'black'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            : <FullSizeLoader size={100} color={'black'}/>
    );
};

export default ListDetails;
