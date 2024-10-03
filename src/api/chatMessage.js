import { ENV } from '../utils';

export class ChatMessage {

    async getLastMessage(token, chatId) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE_LAST}/${chatId}`;

            const params = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await fetch(url, params);

            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        };

    };

    async getTotal(token, chatId) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE_TOTAL}/${chatId}`;

            const params = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await fetch(url, params);

            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        };

    };

    async getAll(token, chatId) {

        try {

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE}/${chatId}`;

            const params = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await fetch(url, params);

            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        };

    };
};