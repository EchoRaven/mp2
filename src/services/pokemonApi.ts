import axios from 'axios';
import { Pokemon, PokemonListResponse } from '../types/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getAllPokemon(limit: number = 151): Promise<Pokemon[]> {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=${limit}`
      );
      
      const pokemonList = response.data.results.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        url: pokemon.url,
      }));
      
      return pokemonList;
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      return [];
    }
  },

  async getPokemonDetails(idOrName: string | number): Promise<Pokemon | null> {
    try {
      const response = await axios.get<Pokemon>(
        `${BASE_URL}/pokemon/${idOrName}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching pokemon details for ${idOrName}:`, error);
      return null;
    }
  },

  async getPokemonByType(typeName: string): Promise<Pokemon[]> {
    try {
      const response = await axios.get(`${BASE_URL}/type/${typeName}`);
      const pokemonList = response.data.pokemon.map((p: any) => {
        const id = parseInt(p.pokemon.url.split('/').slice(-2)[0]);
        return {
          id,
          name: p.pokemon.name,
          url: p.pokemon.url,
        };
      });
      return pokemonList;
    } catch (error) {
      console.error(`Error fetching pokemon by type ${typeName}:`, error);
      return [];
    }
  },

  async getAllTypes(): Promise<string[]> {
    try {
      const response = await axios.get(`${BASE_URL}/type`);
      const types = response.data.results
        .map((type: any) => type.name)
        .filter((name: string) => 
          !['unknown', 'shadow'].includes(name)
        );
      return types;
    } catch (error) {
      console.error('Error fetching types:', error);
      return [];
    }
  },
};

