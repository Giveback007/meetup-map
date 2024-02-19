import { request, gql } from 'graphql-request';
import { isType } from './util';

type GetEventsOpts = {
    /** eg: 2020-12-23 */
    date: string | Date;
    topicCategoryId: string;
    radius: 2 | 5 | 10 | 25 | 50 | 100;
    lat: string;
    lon: string;
}

const corsProxyUrl = (url: string) => `${env.corsProxyServer}?url=${url}`;
export const meetupAPI = new class MeetupAPI {

    getTopicCategories = async () => {
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
        return (await request(corsProxyUrl('https://api.meetup.com/gql'), topicCategories, {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }) as any).topicCategories.edges.map((x: any) => x.node) as TopicCategorie[];
    }

    getMeetupEventsPayload = async () => {
        const res =  await fetch(env.corsProxyServer + '/meetup-gql2-payload', {
            method: 'GET',
            mode: 'cors',
            headers: {
              // 'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify(eventSearchOptions),
        });

        return await res.json();
    }

    getEvents = async(options: GetEventsOpts) => {
        let date = options.date;
        if (!isType(date, 'string')) date = date.toISOString().split('T')[0]!;

        type Opts = {
            after?: string;
        } & GetEventsOpts;

        const fetchReq = (op: Opts) => fetch(corsProxyUrl('https://api.meetup.com/gql2'), {
            method: 'POST',
            mode: 'cors',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operationName: "recommendedEventsWithSeries",
                variables: {
                    after: op.after,
                    lat: op.lat,
                    lon: op.lon,
                    topicCategoryId: options.topicCategoryId,
                    radius: op.radius,
                    startDateRange: `${date}T00:00:00-05:00`,
                    endDateRange: `${date}T23:59:59-05:00`,
                    eventType: "PHYSICAL",
                    sortField: "DATETIME",
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash: '6af218804f3fb79d0d3c4e8555be804bedee4b425ec1eec6b0479f5641f8b549'
                    }
                }
            }),
        });

        const data = [];

        try {
            const opts: Opts = {...options};

            do {
                const response = await fetchReq(opts);
                const { pageInfo: { hasNextPage, endCursor }, edges } = (await response.json()).data.result;
                const _data = edges.map((x: any) => x.node);

                data.push(..._data);
                log(_data)
                opts.after = hasNextPage ? endCursor : undefined;
            } while (opts.after)

            return { ok: true, data };
        } catch(err) {
            console.error(err);
            return { ok: false, err };
        }
    }
}