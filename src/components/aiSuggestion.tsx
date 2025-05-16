import { useEffect, useState } from "react";
import { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Loader,
  AlertTriangle,
  Snowflake,
  Umbrella,
  TentTree,
  FlameKindling,
  GlassWater,
  Shirt,
  Glasses,
  Footprints,
  Sun,
  ShieldPlus,
  Wind,
  Leaf
} from "lucide-react";

interface AiSuggestionProps {
  data: WeatherData;
  locationName: string | undefined;
}

const AiSuggestion = ({ data, locationName }: AiSuggestionProps) => {
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAiSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "http://localhost:8000/api/weatherSggestion",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ weatherData: data }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setSuggestions(result.suggestions || []);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchAiSuggestions();
  }, [data, locationName]);

  const getSuggestionIcon = (suggestion: string) => {
    if (suggestion.includes("sunny"))
      return <FlameKindling className="w-5 h-5 text-yellow-500" />;
    if (suggestion.includes("hydrate"))
      return <GlassWater className="w-5 h-5 text-blue-500" />;
    if (suggestion.includes("pollen"))
      return <Snowflake className="w-5 h-5 text-blue-300" />;
    if (suggestion.includes("cloth"))
      return <Shirt className="w-5 h-5 text-purple-500" />;
    if (suggestion.includes("glasses"))
      return <Glasses className="w-5 h-5 text-green-500" />;
    if (suggestion.includes("umbrella"))
      return <Umbrella className="w-5 h-5 text-blue-500" />;
    if (suggestion.includes("Outdoor"))
      return <TentTree className="w-5 h-5 text-green-500" />;
    if (suggestion.includes("wind"))
      return <Wind className="w-5 h-5 text-green-500" />;
    if (suggestion.includes("walk"))
      return <Footprints className="w-5 h-5 text-orange-500" />;
    if (suggestion.includes("sunshine"))
      return <Sun className="w-5 h-5 text-yellow-500" />;
    if (suggestion.includes("sunscreen"))
      return <ShieldPlus className="w-5 h-5 text-red-500" />;
    else
    return <Leaf className="w-5 h-5 text-green-500" />;
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>AI Tips for {locationName || "your location"}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center space-x-2">
            <Loader className="animate-spin w-5 h-5 text-primary" />
            <span>Loading suggestions...</span>
          </div>
        )}
        {error && (
          <div className="flex items-center space-x-2 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && suggestions && (
          <div className="grid gap-6 sm:grid-cols-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                {getSuggestionIcon(suggestion)}
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiSuggestion;
