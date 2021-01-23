import React, {FunctionComponent, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {addFirestoreGroup, subscribeToFirestoreGroupUpdates} from '../../firestore/groupActions';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import InputModal from '../../components/ModalContent/InputModal';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {capitalize} from '../../utils/capitalize';

const GroupOverview: FunctionComponent<Props> = ({navigation}) => {
    const groups = useSelector((rootState: RootState) => rootState.groups);
    const {dispatch} = useOverlayData();
    const {t} = useTranslation('groups');

    useEffect(() => {
        return subscribeToFirestoreGroupUpdates();
    }, []);

    const renderGroups = (): Array<JSX.Element> => {
        const groupItems: Array<JSX.Element> = [];

        for (const [key, value] of Object.entries(groups)) {
            groupItems.push(
                <TouchableOpacity
                    key={key}
                    onPress={() => navigation.navigate('GroupDetails', {id: key})}
                >
                    <Text>{capitalize(value.name)}</Text>
                </TouchableOpacity>
            );
        }

        return groupItems;
    };

    const createNewGroup = async (name: string) => {
        if (name === '') {
            dispatch(resetOverlay());
            return;
        }

        const groupId = await addFirestoreGroup(name);
        dispatch(resetOverlay());
        if (groupId) {
            navigation.navigate('GroupDetails', {id: groupId});
        }
    };

    const openInputModal = () => {
        dispatch(setOverlay({
            title: t('newGroup'),
            content: <InputModal
                buttonLabel={t('common:create')}
                onSubmit={async (input: string) => createNewGroup(input)}
            />,
            wrapperStyle: {
                width: '60%'
            }
        }));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => openInputModal()}
            >
                <Icon name={'add'} size={40} color={'black'}/>
            </TouchableOpacity>
            <Text style={styles.title}>GroupOverview</Text>
            {renderGroups()}
        </View>
    );
};

export default GroupOverview;
