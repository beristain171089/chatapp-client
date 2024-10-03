import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../utils';

export class UnreadMessages {

    async getTotalReadMessages(chatId) {

        const response = await AsyncStorage.getItem(`${chatId}_read`);
        return Number(response);

    };

    async setTotalReadMessages(chatId, total) {

        const response = await AsyncStorage.setItem(`${chatId}_read`, JSON.stringify(total));

    };

};