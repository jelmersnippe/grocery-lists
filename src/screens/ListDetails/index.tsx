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
import {ItemStatus, List} from '../../reducers/lists/types';
import firestoreUserActions from '../../firestore/userActions';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {
    addFirestoreListItem,
    subscribeToFirestoreListItemUpdates,
    updateFirestoreList,
    updateFirestoreListItem
} from '../../firestore/listActions';
import InputModal from '../../components/InputModal';
import UserModal from '../../components/UserModal';
import {UserInfo} from '../../reducers/userCache/types';
import {capitalize} from '../../utils/capitalize';

const ListDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {dispatch} = useOverlayData();
    const {id} = route.params;
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);
    const [creator, setCreator] = useState<UserInfo | undefined>(undefined);

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
                const creatorUserInfo = await firestoreUserActions.getByUid(creatorUid);
                setCreator(creatorUserInfo);
            })();
        }
    }, [selectedList?.creatorUid]);

    useEffect(() => {
        return subscribeToFirestoreListItemUpdates(id);
    }, []);

    const addItem = async () => {
        const createdItem = await addFirestoreListItem(id, {
            name: inputName,
            quantity: inputQty
        });
        if (createdItem) {
            setInputName('');
        }
    };

    const renderDetails = (list: List): Array<JSX.Element> => {
        const listItems: Array<JSX.Element> = [];
        const items = list?.items;

        if (items) {
            // TODO:
            // Seperate DONE and TODO items before sorting
            // So we can show the DONE items above the TODO items,
            // and have both lists in order of updatedAt
            const sortedItems = Object.keys(items)
                .map((key) => ({
                    ...items[key],
                    uid: key
                }))
                .sort((a, b) => moment(b.updatedAt).valueOf() - moment(a.updatedAt).valueOf());
            for (const item of sortedItems) {
                listItems.push(
                    // TODO:
                    // Make seperate ListItem component so we can use hooks
                    // Need to add an opened/closed state where we can put
                    // More info and actions, such as delete
                    <View key={item.uid} style={styles.item}>
                        <View style={styles.itemQuantity}>
                            <Text style={styles.itemQuantityText}>{item.quantity}</Text>
                            <Icon name={'close'} size={18} color={'black'}/>
                        </View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <TouchableOpacity onPress={() => updateFirestoreListItem(id, item.uid, {status: item.status === ItemStatus.TODO ? ItemStatus.DONE : ItemStatus.TODO})}>
                            <Icon name={item.status === ItemStatus.TODO ? 'checkbox-outline' : 'checkbox'} size={26} color={'black'}/>
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
                    <View style={styles.headerTextContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{selectedList.name}</Text>
                            <TouchableOpacity
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
                        {creator &&
                        <Text>
                            {t('createdBy', {
                                creator: capitalize(creator.name)
                            })}
                        </Text>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(setOverlay({
                                title: t('users'),
                                content: <UserModal
                                    listId={id}
                                />,
                                wrapperStyle: {
                                    width: '80%',
                                    height: '80%'
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
