export interface Site {
    roadPositionString: string;
    address: string;
    lat: number;
    lon: number;
    postedSpeedLimit: number;
    stations: {
        referenceId: number;
        stationType: number;
        description: string;
        readingsCount: string;
        mostRecentDate: string;
    }[];
}
