import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Icon from 'react-native-vector-icons/Ionicons';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import QtyInput from '../../components/QtyInput';
import FullSizeLoader from '../../components/FullSizeLoader';
import {List} from '../../reducers/lists/types';
import firestoreUserActions from '../../firestore/userActions';
import {FirestoreUser} from '../../firestore/types';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {
    addFirestoreListItem,
    removeFirestoreListItem,
    subscribeToFirestoreListItemUpdates,
    updateFirestoreList
} from '../../firestore/listActions';
import InputModal from '../../components/InputModal';
import UserModal from '../../components/UserModal';

const ListDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {dispatch} = useOverlayData();
    const {id} = route.params;
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);
    const [creator, setCreator] = useState<FirestoreUser | undefined>(undefined);

    const [inputQty, setInputQty] = useState(0);
    const [inputName, setInputName] = useState('');
    const inputNameRef = useRef<TextInput>(null);

    const {t} = useTranslation('lists');

    useEffect(() => {
        const listName = selectedList?.name;
        if (listName) {
            navigation.setOptions({title: listName});
        }
    }, [selectedList?.name]);

    useEffect(() => {
        const creatorUid = selectedList?.creatorUid;
        if (creatorUid) {
            (async () => {
                const creatorUser = await firestoreUserActions.getByUid(creatorUid);
                if (creatorUser) {
                    setCreator(creatorUser);
                }
            })();
        }
    }, [selectedList?.creatorUid]);

    useEffect(() => {
        return subscribeToFirestoreListItemUpdates(id);
    }, []);

    const addItem = async () => {
        const createdItem = await addFirestoreListItem(id, {
            name: inputName,
            quantity: inputQty,
            updatedAt: new Date()
        });
        if (createdItem) {
            setInputName('');
        }
    };

    const renderDetails = (list: List): Array<JSX.Element> => {
        const listItems: Array<JSX.Element> = [];
        const items = list?.items;

        if (items) {
            const sortedItems = Object.keys(items)
                .map((key) => ({
                    ...items[key],
                    uid: key
                }))
                .sort((a, b) => moment(b.updatedAt).valueOf() - moment(a.updatedAt).valueOf());
            for (const item of sortedItems) {
                listItems.push(
                    <View key={item.uid} style={styles.item}>
                        <View style={styles.itemQuantity}>
                            <Text style={styles.itemQuantityText}>{item.quantity}</Text>
                            <Icon name={'close'} size={18} color={'black'}/>
                        </View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <TouchableOpacity onPress={() => removeFirestoreListItem(id, item.uid)}>
                            <Icon name={'trash'} size={26} color={'tomato'}/>
                        </TouchableOpacity>
                    </View>
                );
            }
        }

        return listItems;
    };

    const updateList = (listId: string, updatedName: string) => {
        if (updatedName === '' || updatedName === selectedList?.name) {
            dispatch(resetOverlay());
            return;
        }

        updateFirestoreList(listId, updatedName);
        dispatch(resetOverlay());
    };

    return (
        selectedList ?
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{selectedList.name}</Text>
                            <TouchableOpacity
                                style={{marginLeft: 5}}
                                onPress={() => {
                                    dispatch(setOverlay({
                                        content: <InputModal
                                            defaultValue={selectedList.name}
                                            onSubmit={async (input: string) => updateList(id, input)}
                                            buttonLabel={t('common:update')}
                                        />,
                                        wrapperStyle: {
                                            width: '60%'
                                        }
                                    }));
                                }}
                            >
                                <Icon name={'create-outline'} size={30} color={'black'}/>
                            </TouchableOpacity>
                        </View>
                        {creator && <Text>{t('createdBy', {
                            creator: creator.name
                        })}</Text>}
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(setOverlay({
                                title: t('users'),
                                content: <UserModal
                                    listId={id}
                                />,
                                wrapperStyle: {
                                    width: '60%',
                                    height: '60%'
                                }
                            }));
                        }}
                    >
                        <Icon name={'people'} size={36} color={'black'}/>
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
                            placeholder={t('itemName')}
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
