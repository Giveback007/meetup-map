interface PhotoInfo {
    baseUrl: string;
    highResUrl: string;
    id: string;
    __typename: string;
}

interface CovidPrecautions {
    venueType: null;
    __typename: string;
}

interface Group {
    id: string;
    isNewGroup: boolean;
    isPrivate: boolean;
    membershipMetadata: null;
    keyGroupPhoto: PhotoInfo;
    name: string;
    timezone: string;
    urlname: string;
    __typename: string;
}

interface RsvpConnection {
    totalCount: number;
    __typename: string;
}

interface Venue {
    id: string;
    name: string;
    lat: number;
    lon: number;
    city: string;
    state: string;
    country: string;
    __typename: string;
}

interface Event {
    dateTime: string;
    description: string;
    eventType: string;
    eventUrl: string;
    featuredEventPhoto: PhotoInfo;
    feeSettings: null;
    id: string;
    isAttending: boolean;
    isOnline: boolean;
    isSaved: boolean;
    covidPrecautions: CovidPrecautions;
    group: Group;
    maxTickets: number;
    rsvps: RsvpConnection;
    title: string;
    venue: Venue;
    socialLabels: string[];
    __typename: string;
    rsvpState: string;
    series: null;
}
