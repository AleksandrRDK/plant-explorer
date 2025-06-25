import axios from 'axios';
import type { Observation } from '@/types/rarePlants';

interface ApiResponse {
    results: Observation[];
}

export async function fetchObservations(page: number): Promise<Observation[]> {
    try {
        const res = await axios.get<ApiResponse>(
            `https://api.inaturalist.org/v1/observations?taxon_id=47126&threatened=true&order=asc&page=${page}&per_page=20`
        );
        const data = res.data.results;

        const uniquePlantsMap = new Map<string, Observation>();

        data.forEach((obs) => {
            const name = obs.taxon?.preferred_common_name;
            if (name && !uniquePlantsMap.has(name)) {
                uniquePlantsMap.set(name, obs);
            }
        });

        return Array.from(uniquePlantsMap.values());
    } catch (error) {
        console.error(error);
        return [];
    }
}
