import axios from 'axios';

export interface PlantPhoto {
    score: number;
    species: {
        scientificNameWithoutAuthor: string;
    };
    images: {
        url: {
            s: string;
        };
    }[];
}

interface SearchPhotoResponse {
    results: PlantPhoto[];
}

export async function searchPhoto(data: FormData): Promise<PlantPhoto[]> {
    const res = await axios.post<SearchPhotoResponse>(
        'https://my-api.plantnet.org/v2/identify/all?api-key=2b101VvCccv6Xmnzp0AnxRHOO',
        data
    );

    return res.data.results;
}
