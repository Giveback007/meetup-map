import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { key } from './key';

const corsProxy = `${key.corsProxyServer}?url=https://api.meetup.com/gql`;

const client = new ApolloClient({
  link: new HttpLink({ uri: corsProxy }),
  cache: new InMemoryCache(),
});

export default client;
