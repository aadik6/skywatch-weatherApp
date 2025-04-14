// import { useEffect, useState } from "react";
// import { GeoCodingResponse, WeatherData } from "@/api/types";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Loader, AlertTriangle } from "lucide-react"; // Icons for status

// interface AiSuggestionProps {
//   data: WeatherData;
//   locationName?: GeoCodingResponse;
// }

// const AiSuggestion = ({ data, locationName }: AiSuggestionProps) => {
//   const [suggestions, setSuggestions] = useState<{ activity: string; icon: string }[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAiSuggestions = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Example AI API call
//         const response = await fetch("/api/ai-suggestions", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             weather: data,
//             location: locationName?.name || "Unknown Location",
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch AI suggestions");
//         }

//         const result = await response.json();
//         setSuggestions(result.suggestions); // Assuming API returns a 'suggestions' array
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAiSuggestions();
//   }, [data, locationName]);

//   return (
//     <Card className="bg-background">
//       <CardHeader>
//         <CardTitle>AI Suggestions for {locationName?.name || "Your Location"}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {loading && (
//           <div className="flex items-center space-x-2">
//             <Loader className="animate-spin w-5 h-5 text-primary" />
//             <span>Loading suggestions...</span>
//           </div>
//         )}
//         {error && (
//           <div className="flex items-center space-x-2 text-red-500">
//             <AlertTriangle className="w-5 h-5" />
//             <span>{error}</span>
//           </div>
//         )}
//         {!loading && !error && suggestions && (
//           <ul className="space-y-2">
//             {suggestions.map((suggestion, index) => (
//               <li key={index} className="flex items-center space-x-3">
//                 {/* Use dynamic icons */}
//                 <i className={`lucide-${suggestion.icon} text-primary w-6 h-6`} />
//                 <span>{suggestion.activity}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default AiSuggestion;
