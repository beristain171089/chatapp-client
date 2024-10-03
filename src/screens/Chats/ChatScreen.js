import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ChatMessage, UnreadMessages } from '../../api';
import { useAuth } from '../../hooks';
import { HeaderChat } from '../../components/Navigation';
import { LoadingScreen } from '../../components/Shared';
import { ListMessages } from '../../components/Chat';
import { ENV } from '../../utils';

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export function ChatScreen() {

    const { params: { chatId } } = useRoute();
    const { accessToken } = useAuth();

    const [messages, setMessages] = useState(null);

    useEffect(() => {

        (async () => {

            await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID, chatId);

        })();

        return async () => {

            await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID);

        };

    }, [chatId]);

    useEffect(() => {

        (async () => {

            try {

                const response = await chatMessageController.getAll(accessToken, chatId);

                setMessages(response.messages);

                unreadMessagesController.setTotalReadMessages(chatId, response.total);

            } catch (error) {
                console.error(error);
            };

        })();

        return async () => {

            const response = await chatMessageController.getAll(accessToken, chatId);

            unreadMessagesController.setTotalReadMessages(chatId, response.total);
        };

    }, [chatId]);

    return (
        <>
            <HeaderChat chatId={chatId} />
            {!messages ?
                <LoadingScreen />
                :
                <View flex>
                    <ListMessages
                        messages={messages}
                    />
                </View>
            }
        </>
    );
};