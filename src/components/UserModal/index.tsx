import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {useTranslation} from 'react-i18next';
import Button from '../Button';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {FirestoreUser} from '../../firestore/types';
import firestoreUserActions from '../../firestore/userActions';
import CustomTextInput from '../CustomTextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const UserModal: FunctionComponent<Props> = ({listId}) => {
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(listId) ? rootState.lists[listId] : undefined);
    const [users, setUsers] = useState<Array<FirestoreUser>>([]);
    const {t} = useTranslation('lists');
    const {dispatch} = useOverlayData();

    useEffect(() => {
        (async () => {
            if (selectedList) {
                const userList: Array<FirestoreUser> = [];
                for (const user of selectedList.users) {
                    const userData = await firestoreUserActions.getByUid(user);
                    if (userData) {
                        userList.push(userData);
                    }
                }
                setUsers(userList);
            }
        })();
    }, [selectedList]);


    const [userInput, setUserInput] = useState('');
    const addUser = async () => {
        const user = await firestore().collection('users').where('name', '==', userInput).get();
        user.forEach((documentSnapshot) => {
            if (documentSnapshot.exists) {
                const id = documentSnapshot.id;
                firestore().collection('lists').doc(listId).update({
                    users: firestore.FieldValue.arrayUnion(id)
                });
            }
        });
        setUserInput('');
    };

    return (
        selectedList ?
            <View style={styles.container}>
                <ScrollView
                    style={{flex: 1}}
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity activeOpacity={1}>
                        <Text>Users</Text>
                        {
                            users.map((user) => {
                                return <Text key={user.name}>{user.name}</Text>;
                            })
                        }
                    </TouchableOpacity>
                </ScrollView>
                <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 'auto'}}>
                    <CustomTextInput
                        containerStyle={{flex: 1}}
                        label={'New user'}
                        placeholder={'New user'}
                        value={userInput}
                        onChangeText={(input) => setUserInput(input)}
                        onSubmitEditing={() => addUser()}
                    />
                    <TouchableOpacity onPress={() => addUser()}>
                        <Icon name={'add-circle-outline'} size={40} color={'black'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        text={t('common:cancel')}
                        onPress={() => dispatch(resetOverlay())}
                    />
                    <Button
                        text={t('common:save')}
                        onPress={() => dispatch(resetOverlay())}
                    />
                </View>
            </View>
            : <ActivityIndicator size={60} color={'black'}/>
    );
};

export default UserModal;
