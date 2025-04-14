export const API_CONFIG = {
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    GEO:"https://api.openweathermap.org/geo/1.0",
    // API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
    API_KEY: "37768920e97affe93afd3f6b58bb252a",
    DEFAULT_PARAMS: {
        units: "metric",
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    },
};