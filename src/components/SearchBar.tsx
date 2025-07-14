import React, { useState } from 'react';
import { estadosDeMexico } from '../services/mexicoLocations';

interface SearchBarProps {
  onSearch: (params: { estado?: string; municipio?: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const estado = e.target.value;
    setSelectedEstado(estado);
    setSelectedMunicipio(''); // Reset municipio
    onSearch({ estado, municipio: '' });
  };

  const handleMunicipioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const municipio = e.target.value;
    setSelectedMunicipio(municipio);
    onSearch({ estado: selectedEstado, municipio });
  };

  // Municipios del estado seleccionado
  const municipios = selectedEstado
    ? estadosDeMexico.find(e => e.nombre === selectedEstado)?.municipios || []
    : [];

  return (
    <div className="search-container">
      <form className="search-form" style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <select
          value={selectedEstado}
          onChange={handleEstadoChange}
          className="search-select"
          style={{ minWidth: 220, fontSize: '1.1rem', borderRadius: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '0.9rem 1.2rem', border: '1.5px solid #764ba2', background: 'white', color: '#333', fontWeight: 600 }}
        >
          <option value="">Selecciona un estado...</option>
          {estadosDeMexico.map((estado) => (
            <option key={estado.nombre} value={estado.nombre}>{estado.nombre}</option>
          ))}
        </select>

        <select
          value={selectedMunicipio}
          onChange={handleMunicipioChange}
          className="search-select"
          style={{ minWidth: 220, fontSize: '1.1rem', borderRadius: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '0.9rem 1.2rem', border: '1.5px solid #764ba2', background: 'white', color: '#333', fontWeight: 600 }}
          disabled={!selectedEstado}
        >
          <option value="">Selecciona un municipio...</option>
          {municipios.map((m) => (
            <option key={m.nombre} value={m.nombre}>{m.nombre}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default SearchBar; 