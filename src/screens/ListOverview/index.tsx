import React, {FunctionComponent, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Icon from 'react-native-vector-icons/Ionicons';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import InputModal from '../../components/InputModal';
import {useTranslation} from 'react-i18next';
import {addFirestoreList, subscribeToFirestoreListUpdates} from '../../firestore/listActions';

const ListOverview: FunctionComponent<Props> = ({navigation}) => {
    const lists = useSelector((rootState: RootState) => rootState.lists);
    const {dispatch} = useOverlayData();
    const {t} = useTranslation('lists');

    useEffect(() => {
        return subscribeToFirestoreListUpdates();
    }, []);

    const createNewList = async (name: string) => {
        if (name === '') {
            dispatch(resetOverlay());
            return;
        }

        const listId = await addFirestoreList(name);
        dispatch(resetOverlay());
        if (listId) {
            navigation.navigate('ListDetails', {id: listId});
        }
    };

    const renderLists = (): Array<JSX.Element> => {
        const listItems: Array<JSX.Element> = [];
        for (const [key, value] of Object.entries(lists)) {
            listItems.push(
                <TouchableOpacity
                    key={key}
                    onPress={() => navigation.navigate('ListDetails', {id: key})}
                    style={styles.listItem}
                >
                    <Text style={styles.listItemName}>{value.name}</Text>
                    <Icon style={styles.listItemIcon} name={'caret-forward'} size={24} color={'black'}/>
                </TouchableOpacity>
            );
        }

        return listItems;
    };

    const openInputModal = () => {
        dispatch(setOverlay({
            title: t('newList'),
            content: <InputModal
                onSubmit={async (input: string) => createNewList(input)}
            />,
            wrapperStyle: {
                width: '60%'
            }
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{t('title')}</Text>
                <TouchableOpacity
                    onPress={() => openInputModal()}
                >
                    <Icon name={'add-circle-outline'} size={40} color={'black'}/>
                </TouchableOpacity>
            </View>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                style={styles.listContainer}
            >
                {renderLists()}
            </ScrollView>
        </View>
    );
};

export default ListOverview;
