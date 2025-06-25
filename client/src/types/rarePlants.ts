export interface Observation {
    id: number;
    community_taxon_id?: number | null;
    created_time_zone?: string | null;
    description?: string | null;
    place_guess?: string | null;
    observed_on?: string | null;
    taxon: {
        id: number;
        preferred_common_name: string | null;
        scientific_name: string;
        rank: string;
        iconic_taxon_name?: string | null;
        extinct?: boolean | null;
        default_photo?: {
            medium_url: string;
        };
        wikipedia_url?: string | null;
    } | null;
}
