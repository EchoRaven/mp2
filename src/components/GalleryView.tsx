import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pokemonApi } from '../services/pokemonApi';
import { Pokemon } from '../types/Pokemon';
import './GalleryView.css';

const GalleryView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<Map<number, Pokemon>>(new Map());
  const [types, setTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadPokemonByTypes();
  }, [selectedTypes]);

  const loadInitialData = async () => {
    setLoading(true);
    const allTypes = await pokemonApi.getAllTypes();
    setTypes(allTypes);
    const initialPokemon = await pokemonApi.getAllPokemon(151);
    setPokemonList(initialPokemon);
    loadPokemonDetails(initialPokemon.slice(0, 30));
    setLoading(false);
  };

  const loadPokemonByTypes = async () => {
    if (selectedTypes.length === 0) {
      const allPokemon = await pokemonApi.getAllPokemon(151);
      setPokemonList(allPokemon);
      loadPokemonDetails(allPokemon.slice(0, 30));
      return;
    }

    setLoadingDetails(true);
    const pokemonByType = await Promise.all(
      selectedTypes.map(type => pokemonApi.getPokemonByType(type))
    );

    const allPokemon = pokemonByType.flat();
    const uniquePokemon = Array.from(
      new Map(allPokemon.map(p => [p.id, p])).values()
    ).sort((a, b) => a.id - b.id);

    setPokemonList(uniquePokemon);
    loadPokemonDetails(uniquePokemon.slice(0, 30));
    setLoadingDetails(false);
  };

  const loadPokemonDetails = async (pokemon: Pokemon[]) => {
    const detailsMap = new Map<number, Pokemon>();
    
    const promises = pokemon.map(async (p) => {
      const details = await pokemonApi.getPokemonDetails(p.id);
      if (details) {
        detailsMap.set(p.id, details);
      }
    });

    await Promise.all(promises);
    setPokemonDetails(detailsMap);
  };

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeName)) {
        return prev.filter(t => t !== typeName);
      } else {
        return [...prev, typeName];
      }
    });
  };

  const getImageUrl = (pokemon: Pokemon): string => {
    const details = pokemonDetails.get(pokemon.id);
    if (details?.sprites?.other?.['official-artwork']?.front_default) {
      return details.sprites.other['official-artwork'].front_default;
    }
    if (details?.sprites?.front_default) {
      return details.sprites.front_default;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  };

  if (loading) {
    return <div className="loading">Loading Gallery...</div>;
  }

  return (
    <div className="gallery-view">
      <h1>Pokemon Gallery</h1>

      <div className="filter-section">
        <h3>Filter by Type:</h3>
        <div className="type-filters">
          {types.map(type => (
            <button
              key={type}
              className={`type-filter ${selectedTypes.includes(type) ? 'active' : ''} type-${type}`}
              onClick={() => handleTypeToggle(type)}
            >
              {type}
            </button>
          ))}
        </div>
        {selectedTypes.length > 0 && (
          <button
            className="clear-filters"
            onClick={() => setSelectedTypes([])}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {loadingDetails && (
        <div className="loading-message">Loading Pokemon...</div>
      )}

      <div className="gallery-grid">
        {pokemonList.map(pokemon => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="gallery-item"
          >
            <div className="gallery-item-image">
              <img
                src={getImageUrl(pokemon)}
                alt={pokemon.name}
                loading="lazy"
              />
            </div>
            <div className="gallery-item-info">
              <span className="pokemon-number">#{pokemon.id.toString().padStart(3, '0')}</span>
              <h3 className="pokemon-name">{pokemon.name}</h3>
              {pokemonDetails.get(pokemon.id)?.types && (
                <div className="pokemon-types">
                  {pokemonDetails.get(pokemon.id)?.types?.map(t => (
                    <span key={t.type.name} className={`type-badge type-${t.type.name}`}>
                      {t.type.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;

