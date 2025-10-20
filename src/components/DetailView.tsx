import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pokemonApi } from '../services/pokemonApi';
import { Pokemon } from '../types/Pokemon';
import './DetailView.css';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const currentId = parseInt(id || '1');
  const maxPokemonId = 151;

  useEffect(() => {
    loadPokemon();
  }, [id]);

  const loadPokemon = async () => {
    if (!id) return;
    
    setLoading(true);
    const data = await pokemonApi.getPokemonDetails(id);
    setPokemon(data);
    setLoading(false);
  };

  const handlePrevious = () => {
    const prevId = currentId > 1 ? currentId - 1 : maxPokemonId;
    navigate(`/pokemon/${prevId}`);
  };

  const handleNext = () => {
    const nextId = currentId < maxPokemonId ? currentId + 1 : 1;
    navigate(`/pokemon/${nextId}`);
  };

  const getImageUrl = (): string => {
    if (pokemon?.sprites?.other?.['official-artwork']?.front_default) {
      return pokemon.sprites.other['official-artwork'].front_default;
    }
    if (pokemon?.sprites?.front_default) {
      return pokemon.sprites.front_default;
    }
    return '';
  };

  if (loading) {
    return <div className="loading">Loading Pokemon Details...</div>;
  }

  if (!pokemon) {
    return <div className="error">Pokemon not found!</div>;
  }

  return (
    <div className="detail-view">
      <div className="navigation-buttons">
        <button onClick={handlePrevious} className="nav-button prev-button">
          ← Previous
        </button>
        <button onClick={handleNext} className="nav-button next-button">
          Next →
        </button>
      </div>

      <div className="detail-container">
        <div className="detail-header">
          <h1 className="pokemon-name">{pokemon.name}</h1>
          <span className="pokemon-number">#{currentId.toString().padStart(3, '0')}</span>
        </div>

        <div className="detail-content">
          <div className="detail-image">
            <img src={getImageUrl()} alt={pokemon.name} />
          </div>

          <div className="detail-info">
            <div className="info-section">
              <h3>Types</h3>
              <div className="types-container">
                {pokemon.types?.map(t => (
                  <span key={t.type.name} className={`type-badge type-${t.type.name}`}>
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Physical Attributes</h3>
              <div className="attributes">
                <div className="attribute">
                  <span className="attribute-label">Height:</span>
                  <span className="attribute-value">{((pokemon.height || 0) / 10).toFixed(1)} m</span>
                </div>
                <div className="attribute">
                  <span className="attribute-label">Weight:</span>
                  <span className="attribute-value">{((pokemon.weight || 0) / 10).toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Abilities</h3>
              <div className="abilities">
                {pokemon.abilities?.map((a, index) => (
                  <span key={index} className="ability-badge">
                    {a.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Base Stats</h3>
              <div className="stats">
                {pokemon.stats?.map((s, index) => (
                  <div key={index} className="stat-row">
                    <span className="stat-name">
                      {s.stat.name.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className="stat-bar-container">
                      <div
                        className="stat-bar"
                        style={{ width: `${(s.base_stat / 255) * 100}%` }}
                      />
                    </div>
                    <span className="stat-value">{s.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="back-button-container">
        <button onClick={() => navigate('/')} className="back-button">
          Back to List
        </button>
        <button onClick={() => navigate('/gallery')} className="back-button">
          Back to Gallery
        </button>
      </div>
    </div>
  );
};

export default DetailView;

