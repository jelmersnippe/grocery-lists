import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';

const ListDetails: FunctionComponent<Props> = ({route}) => {
    const {id} = route.params;
    const list = useSelector((rootState: RootState) => rootState.lists[id]);

    const renderDetails = (): JSX.Element => {
        return (
            <View>
                <Text>{list.name}</Text>
                <View>
                    {list.items.map((item) => (
                        <Text>{`${item.quantity}x ${item.name}`}</Text>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ListDetails</Text>
            <Text>Id: {id}</Text>
            {list && renderDetails()}
        </View>
    );
};

export default ListDetails;
