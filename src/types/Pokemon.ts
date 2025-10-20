export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types?: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
  height?: number;
  weight?: number;
  abilities?: Array<{
    ability: {
      name: string;
      url: string;
    };
  }>;
  stats?: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonType {
  name: string;
  url: string;
}

