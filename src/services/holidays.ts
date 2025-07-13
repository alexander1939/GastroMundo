import axios from "axios";

export interface Holiday {
  name: string;
  date: string;
  observed: string;
  public: boolean;
  country: string;
  uuid: string;
  weekday: {
    date: { name: string; numeric: string };
    observed: { name: string; numeric: string };
  };
  description?: string;
  type?: string;
  location?: string;
  details?: string[];
  traditions?: string[];
}

// Datos complementarios para eventos específicos
const eventDetailsMap: Record<string, Partial<Holiday>> = {
  'Día de los Muertos': {
    description: 'Celebración tradicional mexicana para honrar a los difuntos',
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
  'Día de la Independencia': {
    description: 'Celebración de la independencia de México',
    location: 'Todo México',
    type: 'Celebración Nacional',
    details: [
      'Grito de Dolores',
      'Desfiles militares',
      'Fiestas patrias',
      'Decoraciones tricolores'
    ],
    traditions: [
      'El Grito a las 11 PM del 15 de septiembre',
      'Comer pozole y chiles en nogada',
      'Usar ropa con los colores de la bandera',
      'Asistir a desfiles y celebraciones'
    ]
  },
  'Día de la Revolución': {
    description: 'Conmemoración del inicio de la Revolución Mexicana',
    location: 'Todo México',
    type: 'Conmemoración',
    details: [
      'Desfile deportivo',
      'Actividades culturales',
      'Reflexión histórica',
      'Celebraciones cívicas'
    ],
    traditions: [
      'Participar en el desfile deportivo',
      'Aprender sobre la historia de México',
      'Asistir a eventos culturales',
      'Reflexionar sobre los valores revolucionarios'
    ]
  },
  'Día de la Virgen de Guadalupe': {
    description: 'Celebración religiosa más importante de México',
    location: 'Basílica de Guadalupe, CDMX',
    type: 'Celebración Religiosa',
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
  'Navidad': {
    description: 'Celebración del nacimiento de Jesucristo',
    location: 'Todo México',
    type: 'Celebración Religiosa',
    details: [
      'Nacimientos y pesebres',
      'Cenas familiares',
      'Intercambio de regalos',
      'Misas de gallo'
    ],
    traditions: [
      'Armar el árbol de Navidad',
      'Preparar la cena de Nochebuena',
      'Intercambiar regalos a medianoche',
      'Asistir a la misa de gallo'
    ]
  },
  'Año Nuevo': {
    description: 'Celebración del inicio del nuevo año',
    location: 'Todo México',
    type: 'Celebración',
    details: [
      'Cenas especiales',
      'Fuegos artificiales',
      'Resoluciones de año nuevo',
      'Celebraciones familiares'
    ],
    traditions: [
      'Comer 12 uvas a medianoche',
      'Usar ropa interior roja',
      'Hacer resoluciones',
      'Celebrar con familia y amigos'
    ]
  },
  'Día de Reyes': {
    description: 'Celebración de la llegada de los Reyes Magos',
    location: 'Todo México',
    type: 'Celebración Religiosa',
    details: [
      'Rosca de Reyes',
      'Regalos para los niños',
      'Celebraciones familiares',
      'Tradiciones católicas'
    ],
    traditions: [
      'Comer rosca de reyes',
      'Encontrar el niño en la rosca',
      'Dar regalos a los niños',
      'Celebrar con tamales el 2 de febrero'
    ]
  },
  'Día de la Constitución': {
    description: 'Conmemoración de la promulgación de la Constitución Mexicana',
    location: 'Todo México',
    type: 'Conmemoración',
    details: [
      'Actos cívicos',
      'Reflexión sobre la democracia',
      'Celebraciones gubernamentales',
      'Educación cívica'
    ],
    traditions: [
      'Asistir a ceremonias cívicas',
      'Aprender sobre la Constitución',
      'Reflexionar sobre los derechos',
      'Participar en actividades educativas'
    ]
  },
  'Día del Trabajo': {
    description: 'Día internacional de los trabajadores',
    location: 'Todo México',
    type: 'Conmemoración',
    details: [
      'Desfiles sindicales',
      'Reivindicaciones laborales',
      'Celebraciones obreras',
      'Reflexión sobre derechos laborales'
    ],
    traditions: [
      'Participar en marchas sindicales',
      'Reflexionar sobre condiciones laborales',
      'Celebrar los logros obreros',
      'Luchar por mejores condiciones'
    ]
  },
  'Día de la Bandera': {
    description: 'Celebración del símbolo patrio más importante',
    location: 'Todo México',
    type: 'Celebración Nacional',
    details: [
      'Ceremonias cívicas',
      'Juramento a la bandera',
      'Desfiles escolares',
      'Actos patrióticos'
    ],
    traditions: [
      'Participar en ceremonias escolares',
      'Jurar lealtad a la bandera',
      'Aprender sobre la historia de la bandera',
      'Mostrar respeto al símbolo patrio'
    ]
  },
  'Día del Niño': {
    description: 'Celebración dedicada a los niños de México',
    location: 'Todo México',
    type: 'Celebración',
    details: [
      'Actividades infantiles',
      'Regalos para niños',
      'Festivales escolares',
      'Celebraciones familiares'
    ],
    traditions: [
      'Dar regalos a los niños',
      'Organizar fiestas infantiles',
      'Actividades recreativas',
      'Celebrar la infancia'
    ]
  },
  'Día de las Madres': {
    description: 'Homenaje a todas las madres mexicanas',
    location: 'Todo México',
    type: 'Celebración',
    details: [
      'Regalos para mamás',
      'Cenas familiares',
      'Celebraciones especiales',
      'Demostraciones de cariño'
    ],
    traditions: [
      'Dar regalos a las madres',
      'Preparar cenas especiales',
      'Demostrar amor y gratitud',
      'Pasar tiempo en familia'
    ]
  },
  'Día del Padre': {
    description: 'Celebración dedicada a todos los padres',
    location: 'Todo México',
    type: 'Celebración',
    details: [
      'Regalos para papás',
      'Actividades familiares',
      'Cenas especiales',
      'Demostraciones de cariño'
    ],
    traditions: [
      'Dar regalos a los padres',
      'Organizar actividades familiares',
      'Preparar comidas especiales',
      'Expresar gratitud y amor'
    ]
  },
  'Día de la Raza': {
    description: 'Conmemoración del encuentro entre dos mundos',
    location: 'Todo México',
    type: 'Conmemoración',
    details: [
      'Reflexión histórica',
      'Actividades culturales',
      'Educación intercultural',
      'Celebraciones mestizas'
    ],
    traditions: [
      'Aprender sobre la historia',
      'Reflexionar sobre la identidad',
      'Participar en actividades culturales',
      'Celebrar la diversidad'
    ]
  },
  'Día de Todos los Santos': {
    description: 'Celebración católica en honor a todos los santos',
    location: 'Todo México',
    type: 'Celebración Religiosa',
    details: [
      'Misas especiales',
      'Visitas a cementerios',
      'Ofrendas religiosas',
      'Celebraciones católicas'
    ],
    traditions: [
      'Asistir a misas especiales',
      'Visitar cementerios',
      'Rezar por los difuntos',
      'Preparar ofrendas'
    ]
  },
  'Día de la Candelaria': {
    description: 'Celebración religiosa con tamales y atole',
    location: 'Todo México',
    type: 'Celebración Religiosa',
    details: [
      'Tamales y atole',
      'Bendición de velas',
      'Celebraciones religiosas',
      'Tradiciones familiares'
    ],
    traditions: [
      'Comer tamales y atole',
      'Bendecir velas',
      'Celebrar en familia',
      'Continuar tradiciones del Día de Reyes'
    ]
  }
};

export async function fetchMexicanHolidays(year: number): Promise<Holiday[]> {
  const res = await axios.get("http://localhost:3001/api/holidays", {
    params: { year: year },
  });

  // Enriquecer los datos con información complementaria
  return res.data.holidays.map((holiday: any) => ({
    ...holiday,
    ...eventDetailsMap[holiday.name]
  })) as Holiday[];
}
