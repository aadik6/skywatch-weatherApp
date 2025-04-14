import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}
interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        date: forecast.dt,
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);
  const formettedTemp = (temp: number) => `${Math.round(temp)}°C`;
  const nextDays = Object.values(dailyForecast).slice(0, 6);
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Upcoming days</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="h-3 w-3" />
                    {formettedTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="h-3 w-3" />
                    {formettedTemp(day.temp_max)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      {day.humidity}%
                    </span>
                  </span>
                
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    {day.wind}m/s
                  </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
