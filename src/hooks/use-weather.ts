import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_QUERY_KEY = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
    search: (query: string) => ["location-search", query] as const,
} as const;
export function useWeatherQuery(coordunates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_QUERY_KEY.weather(coordunates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordunates ? weatherAPI.getCurrentWeather(coordunates) : null,
        enabled: !!coordunates,

    })

}
export function useForcastQuery(coordunates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_QUERY_KEY.forecast(coordunates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordunates ? weatherAPI.getForecast(coordunates) : null,
        enabled: !!coordunates,

    })

}
export function useReverseFGeocodeQuery(coordunates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_QUERY_KEY.location(coordunates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordunates ? weatherAPI.reverseGeocode(coordunates) : null,
        enabled: !!coordunates,

    })


}
export function useSearchLocationQuery(query: string) {
    return useQuery({
        queryKey: WEATHER_QUERY_KEY.search(query),
        queryFn: () => weatherAPI.searchLocation(query),
        enabled: query.length >= 3,

    })

}