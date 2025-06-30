import axios from 'axios';

const API_BASE = 'https://api.inaturalist.org/v1';

export const fetchMapPlants = async () => {
    try {
        const res = await axios.get(`${API_BASE}/observations`, {
            params: { taxon_id: '47126', per_page: 200 },
        });
        return res.data.results;
    } catch (error) {
        console.error(error);
    }
};

export const searchMapPlants = async (query = '', region = '') => {
    const params: Record<string, string> = {
        taxon_id: '47126',
        per_page: '50',
        order: 'desc',
        order_by: 'created_at',
    };

    if (query) params.q = query;
    if (region) params.place_id = region;

    const response = await axios.get(`${API_BASE}/observations`, { params });
    return response.data.results;
};
