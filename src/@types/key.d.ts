type Key = {
    meetup: {
        /** In the "Your Key" field */
        clientId: str;
        website: str;
        redirectURL: str;
        token?: str;
    },
    corsProxyServer: str;
}