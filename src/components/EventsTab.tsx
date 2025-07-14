import { useEffect, useState } from "react";
import { fetchMexicanHolidays, type Holiday } from "../services/holidays";
import "./EventsTab.css";

const EventsTab = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [filterType, setFilterType] = useState<string>("Todos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");
  const [selectedDay, setSelectedDay] = useState<string>("Todos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMexicanHolidays(2024);
        setHolidays(data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtener tipos únicos para el filtro
  const types = ["Todos", ...Array.from(new Set(holidays.map(h => h.type).filter((type): type is string => Boolean(type))))];

  // Obtener meses únicos
  const months = [
    { value: "Todos", label: "Todos los meses" },
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" }
  ];

  // Obtener días únicos
  const days = [
    { value: "Todos", label: "Todos los días" },
    ...Array.from({ length: 31 }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString()
    }))
  ];

  // Función para extraer mes y día de una fecha
  const getMonthAndDay = (dateString: string) => {
    // Crear la fecha especificando que es en zona horaria local
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month - 1 porque los meses van de 0-11
    
    return {
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  };

  // Función para verificar si una fecha coincide con el término de búsqueda
  const matchesDateSearch = (holiday: Holiday, search: string) => {
    if (!search) return true;
    
    const { month, day } = getMonthAndDay(holiday.date);
    const searchLower = search.toLowerCase();
    
    // Buscar patrones como "6 enero", "24 diciembre", etc.
    const monthNames = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    
    // Buscar por número de día
    const dayMatch = search.match(/(\d{1,2})/);
    if (dayMatch && parseInt(dayMatch[1]) === day) return true;
    
    // Buscar por mes
    const monthMatch = monthNames.findIndex(name => searchLower.includes(name));
    if (monthMatch !== -1 && monthMatch + 1 === month) return true;
    
    // Buscar combinación día-mes
    for (let i = 0; i < monthNames.length; i++) {
      const pattern = new RegExp(`(\\d{1,2})\\s*${monthNames[i]}`, 'i');
      const match = search.match(pattern);
      if (match && parseInt(match[1]) === day && i + 1 === month) return true;
    }
    
    return false;
  };

  // Filtrar días festivos
  const filteredHolidays = holidays.filter(holiday => {
    const { month, day } = getMonthAndDay(holiday.date);
    
    // Filtro por tipo
    const typeMatch = filterType === "Todos" || holiday.type === filterType;
    
    // Filtro por mes
    const monthMatch = selectedMonth === "Todos" || month.toString() === selectedMonth;
    
    // Filtro por día
    const dayMatch = selectedDay === "Todos" || day.toString() === selectedDay;
    
    // Filtro por búsqueda (nombre o fecha)
    const searchMatch = !searchTerm || 
      holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matchesDateSearch(holiday, searchTerm);
    
    return typeMatch && monthMatch && dayMatch && searchMatch;
  });

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    // Crear la fecha especificando que es en zona horaria local
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month - 1 porque los meses van de 0-11
    
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para obtener color por tipo
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Celebración': return '#FF6B6B';
      case 'Celebración Nacional': return '#4ECDC4';
      case 'Conmemoración': return '#45B7D1';
      case 'Celebración Religiosa': return '#96CEB4';
      case 'Festival': return '#FFA726';
      case 'Feria': return '#AB47BC';
      default: return '#666';
    }
  };

  // Limpiar filtros
  const clearFilters = () => {
    setFilterType("Todos");
    setSearchTerm("");
    setSelectedMonth("Todos");
    setSelectedDay("Todos");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p>Cargando días festivos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="events-tab">
      <div className="events-header">
        <h1>🎉 Días Festivos de México</h1>
        <p>Descubre las celebraciones más importantes de nuestro país</p>
      </div>

      <div className="events-content">
        {/* Buscador */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por nombre o fecha (ej: 6 enero, 24 diciembre)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button 
              onClick={clearFilters}
              className="clear-filters-btn"
              title="Limpiar filtros"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Tipo:</label>
      <div className="type-filter">
              {types.map((type) => (
          <button
            key={type}
                  className={`type-button ${filterType === type ? 'active' : ''}`}
                  onClick={() => setFilterType(type)}
          >
            {type}
          </button>
        ))}
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Mes:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="filter-select"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Día:</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="filter-select"
              >
                {days.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="results-info">
          <p>Mostrando {filteredHolidays.length} de {holidays.length} festividades</p>
      </div>

        <div className="events-grid">
          {filteredHolidays.map((holiday) => (
            <div 
              key={holiday.uuid}
              className="event-card"
              onClick={() => setSelectedHoliday(holiday)}
            >
              <div className="event-header">
                <h3>{holiday.name}</h3>
                {holiday.type && (
                <span 
                  className="type-badge"
                    style={{ backgroundColor: getTypeColor(holiday.type) }}
                >
                    {holiday.type}
                </span>
                )}
              </div>
              
              {holiday.description && (
                <p className="event-description">{holiday.description}</p>
              )}

              <div className="event-meta">
                <span>📅 {formatDate(holiday.date)}</span>
                {holiday.location && (
                  <span>📍 {holiday.location}</span>
                )}
                <span>🏛️ {holiday.public ? 'Día oficial' : 'Celebración cultural'}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedHoliday && (
          <div className="event-modal">
            <div className="event-modal-content">
              <button 
                className="close-button"
                onClick={() => setSelectedHoliday(null)}
              >
                ×
              </button>
              
              <h2>{selectedHoliday.name}</h2>
              
              {selectedHoliday.description && (
                <p className="event-description">{selectedHoliday.description}</p>
              )}
              
              <div className="event-details">
                <div className="event-info">
                  <span>📅 {formatDate(selectedHoliday.date)}</span>
                  {selectedHoliday.location && (
                    <span>📍 {selectedHoliday.location}</span>
                  )}
                  <span>🏛️ {selectedHoliday.public ? 'Día oficial' : 'Celebración cultural'}</span>
                  <span>📅 {selectedHoliday.weekday.date.name}</span>
                </div>
              </div>

              <div className="event-sections">
                {selectedHoliday.details && selectedHoliday.details.length > 0 && (
                <div className="details-section">
                  <h3>📋 Detalles del Evento</h3>
                  <ul>
                      {selectedHoliday.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
                )}

                {selectedHoliday.traditions && selectedHoliday.traditions.length > 0 && (
                <div className="traditions-section">
                  <h3>🎭 Tradiciones</h3>
                  <ul>
                      {selectedHoliday.traditions.map((tradition, index) => (
                      <li key={index}>{tradition}</li>
                    ))}
                  </ul>
                </div>
                )}
              </div>
            </div>
          </div>
        )}

        {filteredHolidays.length === 0 && !loading && (
          <div className="no-results">
            <p>No se encontraron días festivos con los filtros seleccionados.</p>
            <button onClick={clearFilters} className="clear-filters-btn-large">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsTab; 
