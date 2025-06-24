import axios from 'axios';
import type { Plant, PlantsResponse } from '@/types/plant';

interface FetchPlantsResult {
    plants: Plant[];
    lastPage: number;
}

export async function fetchPlants(
    query?: string,
    page?: number
): Promise<FetchPlantsResult> {
    try {
        console.log('запрос', query, page);
        let url =
            'https://perenual.com/api/v2/species-list?key=sk-lo4s685937fe902ad11133';
        if (query !== undefined) {
            url += `&query=${encodeURIComponent(query)}`;
        }

        if (page) {
            url += `&page=${page}`;
        }

        const res = await axios.get<PlantsResponse>(url);
        console.log(res);

        return {
            plants: res.data.data,
            lastPage: res.data.last_page,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            return {
                plants: [],
                lastPage: 1,
            };
        } else {
            console.error('Unexpected error:', error);
            return {
                plants: [],
                lastPage: 1,
            };
        }
    }
}
