export interface Coordinates {
    lat:number;
    lon:number; 
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    visibility: number;
    dt: number;
    name: string;
}

export interface ForecastData{
list: Array<{
    dt: number;
    main:WeatherData["main"];
    weather: WeatherData["weather"];
    wind: WeatherData["wind"];
    dt_txt: string;
}>;
city:{
    name: string;
    country: string;
    sunrise: number;
    sunset: number;

};
}

export interface GeoCodingResponse {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}