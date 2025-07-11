import React, { useState } from 'react';

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  type: 'Fiesta' | 'Festival' | 'Celebración' | 'Feria';
  image?: string;
  details: string[];
  traditions: string[];
}

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Día de los Muertos',
    description: 'Celebración tradicional mexicana para honrar a los difuntos',
    date: '1-2 de Noviembre',
    location: 'Todo México',
    type: 'Celebración',
    details: [
      'Ofrendas en casas y cementerios',
      'Calaveras de azúcar y pan de muerto',
      'Flores de cempasúchil',
      'Visitas a cementerios'
    ],
    traditions: [
      'Construir altares con ofrendas',
      'Visitar las tumbas de familiares',
      'Comer pan de muerto y calaveras',
      'Decorar con flores de cempasúchil'
    ]
  },
  {
    id: '2',
    name: 'Feria de San Marcos',
    description: 'Una de las ferias más importantes de México en Aguascalientes',
    date: 'Abril-Mayo',
    location: 'Aguascalientes',
    type: 'Feria',
    details: [
      'Exposiciones ganaderas',
      'Conciertos y espectáculos',
      'Gastronomía local',
      'Juegos mecánicos'
    ],
    traditions: [
      'Asistir a la coronación de la reina',
      'Probar la gastronomía local',
      'Visitar las exposiciones',
      'Disfrutar de la charrería'
    ]
  },
  {
    id: '3',
    name: 'Guelaguetza',
    description: 'Festival cultural de Oaxaca que celebra las tradiciones indígenas',
    date: 'Julio',
    location: 'Oaxaca',
    type: 'Festival',
    details: [
      'Danzas tradicionales',
      'Música folclórica',
      'Trajes típicos',
      'Gastronomía oaxaqueña'
    ],
    traditions: [
      'Presenciar las danzas de las 8 regiones',
      'Probar el mole oaxaqueño',
      'Admirar los trajes tradicionales',
      'Participar en las celebraciones'
    ]
  },
  {
    id: '4',
    name: 'Fiesta de la Virgen de Guadalupe',
    description: 'Celebración religiosa más importante de México',
    date: '12 de Diciembre',
    location: 'Basílica de Guadalupe, CDMX',
    type: 'Celebración',
    details: [
      'Peregrinaciones masivas',
      'Misas especiales',
      'Procesiones',
      'Celebraciones en todo el país'
    ],
    traditions: [
      'Peregrinar a la Basílica',
      'Cantar las mañanitas',
      'Llevar ofrendas',
      'Participar en las misas'
    ]
  },
  {
    id: '5',
    name: 'Festival de las Calaveras',
    description: 'Festival en Aguascalientes dedicado al Día de los Muertos',
    date: 'Octubre-Noviembre',
    location: 'Aguascalientes',
    type: 'Festival',
    details: [
      'Desfiles de catrinas',
      'Exposiciones de arte',
      'Teatro y danza',
      'Gastronomía tradicional'
    ],
    traditions: [
      'Disfrazarse de catrina',
      'Participar en el desfile',
      'Visitar las exposiciones',
      'Disfrutar de la gastronomía'
    ]
  },
  {
    id: '6',
    name: 'Fiesta de San Miguel',
    description: 'Celebración en San Miguel de Allende con música y arte',
    date: 'Septiembre',
    location: 'San Miguel de Allende',
    type: 'Fiesta',
    details: [
      'Festival de música',
      'Exposiciones de arte',
      'Gastronomía local',
      'Celebraciones religiosas'
    ],
    traditions: [
      'Asistir a conciertos',
      'Visitar galerías de arte',
      'Probar la gastronomía local',
      'Participar en las procesiones'
    ]
  }
];

const EventsTab: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const eventTypes = ['Todos', ...Array.from(new Set(mockEvents.map(e => e.type)))];
  
  const filteredEvents = selectedType === 'Todos' 
    ? mockEvents 
    : mockEvents.filter(event => event.type === selectedType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Fiesta': return '#FF6B6B';
      case 'Festival': return '#4ECDC4';
      case 'Celebración': return '#45B7D1';
      case 'Feria': return '#96CEB4';
      default: return '#666';
    }
  };

  return (
    <div className="events-tab">
      <div className="events-header">
        <h2>🎉 Eventos y Fiestas Mexicanas</h2>
        <p>Descubre las celebraciones más importantes de México</p>
      </div>

      <div className="type-filter">
        {eventTypes.map(type => (
          <button
            key={type}
            className={`type-button ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="events-content">
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className="event-card"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="event-header">
                <h3>{event.name}</h3>
                <span 
                  className="type-badge"
                  style={{ backgroundColor: getTypeColor(event.type) }}
                >
                  {event.type}
                </span>
              </div>
              <p className="event-description">{event.description}</p>
              <div className="event-meta">
                <span>📅 {event.date}</span>
                <span>📍 {event.location}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="event-modal">
            <div className="event-modal-content">
              <button 
                className="close-button"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>
              
              <h2>{selectedEvent.name}</h2>
              <p className="event-description">{selectedEvent.description}</p>
              
              <div className="event-details">
                <div className="event-info">
                  <span>📅 {selectedEvent.date}</span>
                  <span>📍 {selectedEvent.location}</span>
                  <span 
                    className="type-badge"
                    style={{ backgroundColor: getTypeColor(selectedEvent.type) }}
                  >
                    {selectedEvent.type}
                  </span>
                </div>
              </div>

              <div className="event-sections">
                <div className="details-section">
                  <h3>📋 Detalles del Evento</h3>
                  <ul>
                    {selectedEvent.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="traditions-section">
                  <h3>🎭 Tradiciones</h3>
                  <ul>
                    {selectedEvent.traditions.map((tradition, index) => (
                      <li key={index}>{tradition}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsTab; 