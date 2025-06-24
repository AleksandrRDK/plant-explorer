export interface PlantsResponse {
    current_pag: number;
    data: Plant[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface Plant {
    id: number;
    common_name: string;
    scientific_name: string[];
    other_name: string[];
    family: string | null;
    hybrid: boolean | null;
    authority: string | null;
    subspecies: string | null;
    cultivar: string | null;
    variety: string | null;
    species_epithet: string;
    genus: string;
    default_image: PlantImage | null;
}

export interface PlantImage {
    license: number;
    license_name: string;
    license_url: string;
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
}
