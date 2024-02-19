// INITIALIZER (ALwyas First)
import './init'

// CSS
import 'normalize.css'
import './app.css'

// Other Imports
import App from './App.svelte';
import { request, gql } from 'graphql-request';
import { wait } from './util';
import { meetupAPI } from './api';
import { appIsLoading, eventTopicCategories } from './store';

wait(0).then(async () => {
  const categories = await meetupAPI.getTopicCategories();
  eventTopicCategories.set(categories);
  appIsLoading.set(false);

  // log(await meetupAPI.getEvents());
})

const app = new App({
  target: document.getElementById('app') as any,
})

export default app;



async function test() {
  const { meetup: { clientId, redirectURL, token } } = env;

  if (0 && !env.meetup.token) {
    const meetupAuthUrl = `https://secure.meetup.com/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectURL}`;
    window.location.assign(meetupAuthUrl);
  }

  const topicCategories = gql`
    query  {
      topicCategories {
        count
          pageInfo {
            endCursor
          }
        edges {
          node {
            id
            urlkey
            name
          }
        }
      }
    }
  `

  
  const query = gql`
    query FindEventsByLocation($lat: Float!, $lon: Float!, $radius: Int) {
      findEvents(lat: $lat, lon: $lon, radius: $radius) {
        edges {
          node {
            id
            title
            description
            startTime
            endTime
            location {
              name
              address
              lat
              lon
            }
          }
        }
      }
    }
  `

  const variables = {
    lat: 40.7128, // example latitude
    lon: -74.0060, // example longitude
    radius: 10 // example search radius in kilometers
  }

  const corsProxy = (url: string) => `${env.corsProxyServer}?url=${url}`;

  if (1) {
    const x = await request(corsProxy('https://api.meetup.com/gql'), topicCategories, variables, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    log((x as any).topicCategories.edges.map((x: any) => x.node))
  }

  return
  const eventSearchOptions = {
    "operationName": "recommendedEventsWithSeries",
    "variables": {
        // "after": "Y21WalUyOTFjbU5sT20xc0xYQnZjSFZzWVhJdFpYWmxiblJ6TFc1bFlYSmllU3hwYm1SbGVEb3lNQT09",
        "first": 10000,
        "lat": "28.489999771118164",
        "lon": "-81.08000183105469",
        // "topicCategoryId": [535,612],
        "radius": 100,
        "startDateRange": "2024-02-18T00:00:00-05:00",
        "endDateRange": "2024-02-18T23:59:59-05:00",//23:59:59-05:00",
        "eventType": "PHYSICAL",
        "numberOfEventsForSeries": 500,
        // "seriesStartDate": "2024-02-18",
        sortField: "DATETIME",
        // "doConsolidateEvents": true,
        // "doPromotePaypalEvents": true
    },
    "extensions": {
        "persistedQuery": {
            "version": 1,
            "sha256Hash": '6af218804f3fb79d0d3c4e8555be804bedee4b425ec1eec6b0479f5641f8b549'
        }
    }
  }
  
  // return
  const response = await fetch(corsProxy('https://api.meetup.com/gql2'), {
    method: 'POST',
    mode: 'cors',
    headers: {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventSearchOptions),
  });

  try {
    log((await response.json()).data.result)
  } catch(err) {
    log(err)
  }
}

// setTimeout(test);


