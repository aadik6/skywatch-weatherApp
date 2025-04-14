// // pages/api/ai-suggestions.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Configuration, OpenAIApi } from 'openai';

// // Initialize OpenAI
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// // Helper function to determine appropriate activity icons
// function getActivityIcon(activity: string): string {
//   const activityMap: Record<string, string> = {
//     'hiking': 'mountain',
//     'running': 'running',
//     'swimming': 'swimming',
//     'reading': 'book-open',
//     'movies': 'film',
//     'indoor': 'home',
//     'shopping': 'shopping-bag',
//     'cooking': 'utensils',
//     'coffee': 'coffee',
//     'museum': 'landmark',
//     'gaming': 'gamepad',
//     'yoga': 'heart',
//     'gardening': 'flower',
//     'cycling': 'bike',
//     // Add more mappings as needed
//   };
  
//   // Default fallback icon
//   let icon = 'check-circle';
  
//   // Check if any keyword from the map is in the activity
//   for (const [keyword, iconName] of Object.entries(activityMap)) {
//     if (activity.toLowerCase().includes(keyword)) {
//       icon = iconName;
//       break;
//     }
//   }
  
//   return icon;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     const { weather, location } = req.body;
    
//     // Extract relevant weather data
//     const temperature = weather.main.temp;
//     const conditions = weather.weather[0].main;
//     const description = weather.weather[0].description;
//     const humidity = weather.main.humidity;
//     const windSpeed = weather.wind.speed;
    
//     // Create prompt for OpenAI
//     const prompt = `Based on the following weather conditions in ${location}:
// - Temperature: ${temperature}°C
// - Weather: ${conditions} (${description})
// - Humidity: ${humidity}%
// - Wind Speed: ${windSpeed} m/s

// Suggest 5 activities appropriate for these weather conditions. Return ONLY a JSON array where each item has a single "activity" property with a short description (10 words or less). Example format: [{"activity":"Go for a hike"},{"activity":"Read a book indoors"}]`;

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant that suggests activities based on weather conditions. Return only JSON arrays with short activity descriptions." },
//         { role: "user", content: prompt }
//       ],
//       temperature: 0.7,
//       max_tokens: 200,
//     });

//     // Parse the response
//     const content = response.data.choices[0].message?.content?.trim() || '';
//     let suggestions;
    
//     try {
//       // Extract JSON array from response (handles if AI wraps in code blocks)
//       const jsonMatch = content.match(/\[.*\]/s);
//       if (jsonMatch) {
//         suggestions = JSON.parse(jsonMatch[0]);
//       } else {
//         throw new Error("Couldn't parse JSON from response");
//       }
      
//       // Add appropriate icons to each suggestion
//       suggestions = suggestions.map((suggestion: any) => ({
//         activity: suggestion.activity,
//         icon: getActivityIcon(suggestion.activity)
//       }));
      
//     } catch (error) {
//       console.error("Error parsing AI response:", error);
//       return res.status(500).json({ error: "Failed to parse AI suggestions" });
//     }

//     return res.status(200).json({ suggestions });
//   } catch (error: any) {
//     console.error("API error:", error);
//     return res.status(500).json({ error: error.message || "Failed to get AI suggestions" });
//   }
// }