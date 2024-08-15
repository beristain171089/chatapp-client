import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { IconButton, AddIcon } from 'native-base';
import { size } from 'lodash';
import { Chat } from '../../api';
import { useAuth } from '../../hooks';
import { LoadingScreen } from '../../components/Shared';
import { ListChat } from '../../components/Chat';
import { screens } from '../../utils';

const chatCrontroller = new Chat();

export function ChatsScreen() {

    const { accessToken } = useAuth();

    const navigation = useNavigation();

    const [chats, setChats] = useState(null);
    const [chatsResult, setChatsResult] = useState(null);

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={<AddIcon />}
                    padding={0}
                    onPress={() => navigation.navigate(screens.tab.chats.createChatScreen)}
                />
            )
        });

    }, []);

    useFocusEffect(

        useCallback(() => {

            (async () => {

                try {

                    const response = await chatCrontroller.getAll(accessToken);
                    setChats(response);
                    setChatsResult(response);

                } catch (error) {
                    console.log(error);
                };

            })();

        }, [])
    );

    if (!chatsResult) return <LoadingScreen />;

    return (
        <View>
            <ListChat
                chats={size(chats) === size(chatsResult) ? chats : chatsResult}
            />
        </View>
    );
};