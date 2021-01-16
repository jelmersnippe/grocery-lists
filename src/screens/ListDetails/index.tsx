import React, {FunctionComponent, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {FirestoreList} from '../../firestore/types';
import Icon from 'react-native-vector-icons/Ionicons';
import firestoreListActions from '../../firestore/listActions';
import {OverlayActions, useOverlayData} from '@jelmersnippe/flexible-overlays';

const ListDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {dispatch} = useOverlayData();
    const {id} = route.params;
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);

    useEffect(() => {
        if (selectedList) {
            navigation.setOptions({title: selectedList.name});
        }
    }, [selectedList]);

    useEffect(() => {
        return firestoreListActions.subscribeToItemUpdates(id);
    }, []);

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
                    <Text style={styles.title}>{selectedList.name}</Text>
                    <TouchableOpacity>
                        <Icon name={'pencil'} size={30} color={'black'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        dispatch({
                            type: OverlayActions.SET,
                            payload: {
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
                                        onPress: () => {
                                            firestoreListActions.removeList(id);
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
                            }
                        });
                    }}>
                        <Icon name={'trash'} size={30} color={'tomato'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerQuantity}>Qty.</Text>
                    <Text style={styles.headerName}>Name</Text>
                    <TouchableOpacity
                        style={{marginLeft: 'auto'}}
                        onPress={() => firestoreListActions.addListItem(id, {name: 'New item', quantity: 1})}
                    >
                        <Icon name={'add-circle-outline'} size={32} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    {renderDetails(selectedList)}
                </ScrollView>
            </View>
            : <Text>List not found</Text>
    );
};

export default ListDetails;
