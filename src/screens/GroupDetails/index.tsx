import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import FullSizeLoader from '../../components/FullSizeLoader';

const GroupDetails: FunctionComponent<Props> = ({route}) => {
    const {id} = route.params;
    const selectedGroup = useSelector((rootState: RootState) => rootState.groups.hasOwnProperty(id) ? rootState.groups[id] : undefined);

    return (
        selectedGroup ?
            <View style={styles.container}>
                <Text style={styles.title}>{selectedGroup.name}</Text>
            </View>
            : <FullSizeLoader size={100} color={'black'}/>
    );
};

export default GroupDetails;
