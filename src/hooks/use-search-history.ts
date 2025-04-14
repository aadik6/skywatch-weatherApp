import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";


interface SearchHistoryItem {
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number;
}

export function useSearchHistory() {
    const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>('search-hoistory', []);

    const historyQuery = useQuery({
        queryKey: ['searchHistory'],
        queryFn: () => history,
        initialData: history
    })

    const queryClient = new QueryClient();
    const addToHistory = useMutation({
        mutationFn: async (search: Omit<SearchHistoryItem, "id" | "searchedAt">) => {
            const newSearch: SearchHistoryItem = {
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt: Date.now(),
            };

            const filterHistory = history.filter(
                (item) => !(item.lat === search.lat && item.lon === search.lon)
            );
            const newHistory = [newSearch, ...filterHistory].slice(0, 10);

            setHistory(newHistory);
            return newHistory;
        },
        onSuccess: (newHistory) => {
            queryClient.setQueryData(["searchHistory"],newHistory)
            historyQuery.refetch();
        }

    })


    const clearHistory = useMutation({
        mutationFn: async () => {
            setHistory([]);
            return [];
        },
        onSuccess: () => {
            queryClient.setQueryData(["searchHistory"],[])
            historyQuery.refetch();
        }
    })

    return{
        history: historyQuery.data??[],
        addToHistory,
        clearHistory
    }
}