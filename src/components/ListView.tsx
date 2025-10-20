import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pokemonApi } from '../services/pokemonApi';
import { Pokemon } from '../types/Pokemon';
import './ListView.css';

const ListView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemon();
  }, []);

  useEffect(() => {
    filterAndSortPokemon();
  }, [searchQuery, sortBy, sortOrder, pokemonList]);

  const loadPokemon = async () => {
    setLoading(true);
    const data = await pokemonApi.getAllPokemon(151);
    setPokemonList(data);
    setLoading(false);
  };

  const filterAndSortPokemon = () => {
    let filtered = [...pokemonList];

    if (searchQuery) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery)
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'id') {
        comparison = a.id - b.id;
      } else {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredList(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'id' | 'name');
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  if (loading) {
    return <div className="loading">Loading Pokemon...</div>;
  }

  return (
    <div className="list-view">
      <h1>Pokemon List</h1>
      
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="sort-controls">
          <label>
            Sort by:
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="id">ID</option>
              <option value="name">Name</option>
            </select>
          </label>

          <label>
            Order:
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>

      <div className="results-info">
        Showing {filteredList.length} of {pokemonList.length} Pokemon
      </div>

      <div className="pokemon-list">
        {filteredList.map(pokemon => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="pokemon-list-item"
          >
            <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
            <span className="pokemon-name">{pokemon.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListView;

