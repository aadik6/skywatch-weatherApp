import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import HourlyTemp from "@/components/hourly-temperature";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import WeatherDetails from "@/components/weatherDetails";
import WeatherForecast from "@/components/weatherForcast";
import { useForcastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForcastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 ">
          <p>Failed to fetch data please try again</p>
          {/* <Button variant={"outline"} onClick={handleRefresh} className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button> */}
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data ||!params.cityName) {
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-4">
    {/* fav cities */}
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
      <FavoriteButton data={{...weatherQuery.data,name:params.cityName}} />
        
    </div>
    <div className="grid gap-6">
    <div className="flex flex-col gap-4">
        <CurrentWeather
          data={weatherQuery.data}
        />
        <HourlyTemp data={forecastQuery.data} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 items-start">
        <WeatherDetails data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
    </div>
  </div>
); 
}

export default CityPage;
