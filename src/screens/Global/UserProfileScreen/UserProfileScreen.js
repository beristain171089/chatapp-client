import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
import { ENV } from '../../../utils';
import { styles } from './UserProfileScreen.styles.js';

const userController = new User();

export function UserProfileScreen() {

    const { params } = useRoute();
    const { accessToken } = useAuth();

    const [user, setUser] = useState(null);

    useEffect(() => {

        (async () => {

            const response = await userController.getUser(accessToken, params.userId);

            setUser(response);

        })();

    }, [params.userId]);

    if (!user) return null;

    return (
        <View style={styles.content}>
            <Avatar
                bg='cyan.500'
                size='xl'
                source={{ uri: user.avatar && `${ENV.BASE_PATH}/${user.avatar}` }}
            >
                {user.email.substring(0, 2).toUpperCase()}
            </Avatar>
            {user.firstname || user.lastname ?
                <Text style={styles.identity}>
                    {`${user.firstname || ''} ${user.lastname || ''}`}
                </Text>
                :
                null
            }

            <Text style={styles.email}>{user.email}</Text>
        </View>
    );
};