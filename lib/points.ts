export interface Points {
    address: string;
    hasSampleImages: boolean;
    id: string;
    lat: number;
    lon: number;
    postedSpeedLimit: number;
    roadPosition: RoadPosition;
    stationTypes: number[];
}

export interface RoadPosition {
    offset: number;
    position: number;
    regionId: number;
    roadId: number;
    roadSide: number;
}
