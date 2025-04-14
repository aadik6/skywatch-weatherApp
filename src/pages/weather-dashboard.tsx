import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForcastQuery,
  useReverseFGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { API_CONFIG } from "@/api/config";
import CurrentWeather from "@/components/current-weather";
import HourlyTemp from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weatherDetails";
import WeatherForecast from "@/components/weatherForcast";
import { FavoriteCities } from "@/components/favCities";
// import AiSuggestion from "@/components/aiSuggestion";

const WeatherDashboard = () => {
  console.log(API_CONFIG.API_KEY, "key");
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForcastQuery(coordinates);
  const locationQuery = useReverseFGeocodeQuery(coordinates);
  console.log(location, weatherQuery, forecastQuery);
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 ">
          <p>{locationError}</p>
          <Button variant={"outline"} onClick={handleRefresh} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 ">
          <p>Please enable location to see your local weather</p>
          <Button variant={"outline"} onClick={handleRefresh} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  const locationName = locationQuery.data?.[0];
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 ">
          <p>Failed to fetch data please try again</p>
          <Button variant={"outline"} onClick={handleRefresh} className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }
  console.log(locationName);
  return (
    <div className="space-y-4">
      <FavoriteCities/>
      {/* fav cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
      <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemp data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div>
          <WeatherDetails data={weatherQuery.data} />
          {/* <AiSuggestion data={weatherQuery.data} locationName={locationName}/> */}

          </div>
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
