const SERVER_IP = '192.168.1.91:3977';

export const ENV = {
    SERVER_IP: SERVER_IP,
    BASE_PATH: `http://${SERVER_IP}`,
    API_URL: `http://${SERVER_IP}/api`,
    SOCKET_URL: `http://${SERVER_IP}`,
    ENDPOINTS: {
        AUTH: {
            REGISTER: 'auth/register',
            LOGIN: 'auth/login',
            REFRESH_ACCESS_TOKEN: 'auth/refresh_access_token'
        },
        ME: 'user/me',
        USER: 'user'
    },
    JWT: {
        ACCESS: 'access',
        REFRESH: 'refresh'
    }
};