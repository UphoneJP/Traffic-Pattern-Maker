export interface RunwayType {
  id: string;
  touchdownLat: number;
  touchdownLng: number;
  elevation: number; // ft MSL
  distanceFromThreshold: number; // ft
  heading: number; // degrees,
}
export interface AirportType {
  icao: string;
  name: string;
  runways: RunwayType[];
  varidation: number; // degrees
}
export interface touchdownType {
  lat: number;
  lng: number;
  elevation: number;
  finalApproachCourse: number;
  varidation: number;
  distanceFromThreshold: number;
}
export interface latLng {
  lat: number;
  lng: number;
}
export interface latLngDelta {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
export interface latLngAltHdg {
  lat: number;
  lng: number;
  alt: number;
  heading: number;
}
export interface FlightPointData {
  touchdownpoint: touchdownType;
  ThresholdPoint: latLngAltHdg;
  finalTurnEndPoint: latLngAltHdg;
  finalTurnTopPointLatLng: latLng;
  finalTurnStartPoint: latLngAltHdg;
  baseTurnEndPoint: latLngAltHdg;
  baseTurnTopPointLatLng: latLng;
  baseTurnStartPoint: latLngAltHdg;
  abeamPoint: latLngAltHdg;
  beforeDownwind: latLngAltHdg;
  TODPoint: latLngAltHdg;
  agl1000: latLngAltHdg;
  agl500: latLngAltHdg;
  secondsToTurn: number;
};
export interface FlightData {
  [key: string]: FlightPointData;
};
