export interface Municipio {
    nombre: string;
  }
  
  export interface Estado {
    nombre: string;
    municipios: Municipio[];
  }
  
  export const estadosDeMexico: Estado[] = [
    {
      nombre: 'Aguascalientes',
      municipios: [
        { nombre: 'Aguascalientes' },
        { nombre: 'Jesús María' },
        { nombre: 'Calvillo' },
        { nombre: 'Rincón de Romos' },
        { nombre: 'Pabellón de Arteaga' },
        { nombre: 'Asientos' },
        { nombre: 'San José de Gracia' },
        { nombre: 'Tepezalá' },
        { nombre: 'San Francisco de los Romo' },
        { nombre: 'Cosío' },
        { nombre: 'El Llano' }
      ]
    },
    {
      nombre: 'Baja California',
      municipios: [
        { nombre: 'Tijuana' },
        { nombre: 'Mexicali' },
        { nombre: 'Ensenada' },
        { nombre: 'Playas de Rosarito' },
        { nombre: 'Tecate' },
        { nombre: 'San Quintín' },
        { nombre: 'San Felipe' }
      ]
    },
    {
      nombre: 'Baja California Sur',
      municipios: [
        { nombre: 'La Paz' },
        { nombre: 'Los Cabos' },
        { nombre: 'Comondú' },
        { nombre: 'Mulegé' },
        { nombre: 'Loreto' }
      ]
    },
    {
      nombre: 'Campeche',
      municipios: [
        { nombre: 'Campeche' },
        { nombre: 'Carmen' },
        { nombre: 'Champotón' },
        { nombre: 'Escárcega' },
        { nombre: 'Calkiní' },
        { nombre: 'Palizada' },
        { nombre: 'Candelaria' },
        { nombre: 'Hecelchakán' },
        { nombre: 'Hopelchén' },
        { nombre: 'Tenabo' },
        { nombre: 'Seybaplaya' },
        { nombre: 'Dzitbalché' },
        { nombre: 'Calakmul' }
      ]
    },
    {
      nombre: 'Chiapas',
      municipios: [
        { nombre: 'Tuxtla Gutiérrez' },
        { nombre: 'Tapachula' },
        { nombre: 'San Cristóbal de las Casas' },
        { nombre: 'Comitán de Domínguez' },
        { nombre: 'Chiapa de Corzo' },
        { nombre: 'Villaflores' },
        { nombre: 'Tonalá' },
        { nombre: 'Ocosingo' },
        { nombre: 'Palenque' },
        { nombre: 'Huixtla' },
        { nombre: 'Pijijiapan' },
        { nombre: 'Cintalapa' },
        { nombre: 'Las Margaritas' },
        { nombre: 'Reforma' },
        { nombre: 'Motozintla' }
      ]
    },
    {
      nombre: 'Chihuahua',
      municipios: [
        { nombre: 'Ciudad Juárez' },
        { nombre: 'Chihuahua' },
        { nombre: 'Cuauhtémoc' },
        { nombre: 'Delicias' },
        { nombre: 'Parral' },
        { nombre: 'Nuevo Casas Grandes' },
        { nombre: 'Camargo' },
        { nombre: 'Jiménez' },
        { nombre: 'Ojinaga' },
        { nombre: 'Meoqui' },
        { nombre: 'Saucillo' },
        { nombre: 'Guachochi' },
        { nombre: 'Madera' },
        { nombre: 'Casas Grandes' },
        { nombre: 'Ascensión' }
      ]
    },
    {
      nombre: 'Ciudad de México',
      municipios: [
        { nombre: 'Iztapalapa' },
        { nombre: 'Gustavo A. Madero' },
        { nombre: 'Álvaro Obregón' },
        { nombre: 'Tlalpan' },
        { nombre: 'Cuauhtémoc' },
        { nombre: 'Coyoacán' },
        { nombre: 'Venustiano Carranza' },
        { nombre: 'Azcapotzalco' },
        { nombre: 'Benito Juárez' },
        { nombre: 'Miguel Hidalgo' },
        { nombre: 'Iztacalco' },
        { nombre: 'Tláhuac' },
        { nombre: 'Xochimilco' },
        { nombre: 'La Magdalena Contreras' },
        { nombre: 'Cuajimalpa de Morelos' },
        { nombre: 'Milpa Alta' }
      ]
    },
    {
      nombre: 'Coahuila',
      municipios: [
        { nombre: 'Torreón' },
        { nombre: 'Saltillo' },
        { nombre: 'Monclova' },
        { nombre: 'Piedras Negras' },
        { nombre: 'Ciudad Acuña' },
        { nombre: 'Frontera' },
        { nombre: 'Matamoros' },
        { nombre: 'San Pedro' },
        { nombre: 'Ramos Arizpe' },
        { nombre: 'Sabinas' },
        { nombre: 'San Juan de Sabinas' },
        { nombre: 'Múzquiz' },
        { nombre: 'Castaños' },
        { nombre: 'Parras' },
        { nombre: 'Nava' }
      ]
    },
    {
      nombre: 'Colima',
      municipios: [
        { nombre: 'Manzanillo' },
        { nombre: 'Colima' },
        { nombre: 'Villa de Álvarez' },
        { nombre: 'Tecomán' },
        { nombre: 'Armería' },
        { nombre: 'Cuauhtémoc' },
        { nombre: 'Comala' },
        { nombre: 'Coquimatlán' },
        { nombre: 'Minatitlán' },
        { nombre: 'Ixtlahuacán' }
      ]
    },
    {
      nombre: 'Durango',
      municipios: [
        { nombre: 'Durango' },
        { nombre: 'Gómez Palacio' },
        { nombre: 'Lerdo' },
        { nombre: 'Santiago Papasquiaro' },
        { nombre: 'Canatlán' },
        { nombre: 'Nombre de Dios' },
        { nombre: 'Vicente Guerrero' },
        { nombre: 'Nazas' },
        { nombre: 'Guadalupe Victoria' },
        { nombre: 'El Oro' },
        { nombre: 'San Juan del Río' },
        { nombre: 'Pueblo Nuevo' },
        { nombre: 'Mapimí' },
        { nombre: 'Tlahualilo' },
        { nombre: 'Poanas' }
      ]
    },
    {
      nombre: 'Estado de México',
      municipios: [
        { nombre: 'Ecatepec de Morelos' },
        { nombre: 'Nezahualcóyotl' },
        { nombre: 'Naucalpan de Juárez' },
        { nombre: 'Toluca' },
        { nombre: 'Chimalhuacán' },
        { nombre: 'Tlalnepantla de Baz' },
        { nombre: 'Atizapán de Zaragoza' },
        { nombre: 'Cuautitlán Izcalli' },
        { nombre: 'Ixtapaluca' },
        { nombre: 'Tecámac' },
        { nombre: 'La Paz' },
        { nombre: 'Nicolás Romero' },
        { nombre: 'Valle de Chalco Solidaridad' },
        { nombre: 'Chalco' },
        { nombre: 'Tultitlán' },
        { nombre: 'Coacalco de Berriozábal' },
        { nombre: 'Huixquilucan' },
        { nombre: 'Zinacantepec' },
        { nombre: 'Chicoloapan' },
        { nombre: 'Zumpango' },
        { nombre: 'Tejupilco' },
        { nombre: 'Tlalmanalco' },
        { nombre: 'San Mateo Atenco' },
        { nombre: 'Almoloya de Juárez' },
        { nombre: 'Metepec' }
      ]
    },
    {
      nombre: 'Guanajuato',
      municipios: [
        { nombre: 'León' },
        { nombre: 'Irapuato' },
        { nombre: 'Celaya' },
        { nombre: 'Salamanca' },
        { nombre: 'Guanajuato' },
        { nombre: 'Silao' },
        { nombre: 'San Miguel de Allende' },
        { nombre: 'Salvatierra' },
        { nombre: 'Valle de Santiago' },
        { nombre: 'Cortazar' },
        { nombre: 'Acámbaro' },
        { nombre: 'San Francisco del Rincón' },
        { nombre: 'Pénjamo' },
        { nombre: 'Dolores Hidalgo' },
        { nombre: 'San Luis de la Paz' }
      ]
    },
    {
      nombre: 'Guerrero',
      municipios: [
        { nombre: 'Acapulco de Juárez' },
        { nombre: 'Chilpancingo de los Bravo' },
        { nombre: 'Iguala de la Independencia' },
        { nombre: 'Taxco de Alarcón' },
        { nombre: 'Zihuatanejo de Azueta' },
        { nombre: 'Chilapa de Álvarez' },
        { nombre: 'Tlapa de Comonfort' },
        { nombre: 'Ometepec' },
        { nombre: 'Ayutla de los Libres' },
        { nombre: 'San Luis Acatlán' },
        { nombre: 'Huitzuco de los Figueroa' },
        { nombre: 'Técpan de Galeana' },
        { nombre: 'Petatlán' },
        { nombre: 'Atoyac de Álvarez' },
        { nombre: 'Teloloapan' }
      ]
    },
    {
      nombre: 'Hidalgo',
      municipios: [
        { nombre: 'Pachuca de Soto' },
        { nombre: 'Tulancingo de Bravo' },
        { nombre: 'Mineral de la Reforma' },
        { nombre: 'Tizayuca' },
        { nombre: 'Tula de Allende' },
        { nombre: 'Actopan' },
        { nombre: 'Ixmiquilpan' },
        { nombre: 'Huejutla de Reyes' },
        { nombre: 'Tepeji del Río de Ocampo' },
        { nombre: 'Zimapán' },
        { nombre: 'Atotonilco el Grande' },
        { nombre: 'Tepeapulco' },
        { nombre: 'Mixquiahuala de Juárez' },
        { nombre: 'Progreso de Obregón' },
        { nombre: 'Apan' }
      ]
    },
    {
      nombre: 'Jalisco',
      municipios: [
        { nombre: 'Guadalajara' },
        { nombre: 'Zapopan' },
        { nombre: 'Tlaquepaque' },
        { nombre: 'Tonalá' },
        { nombre: 'Tlajomulco de Zúñiga' },
        { nombre: 'Puerto Vallarta' },
        { nombre: 'Lagos de Moreno' },
        { nombre: 'Tepatitlán de Morelos' },
        { nombre: 'El Salto' },
        { nombre: 'Zapotlanejo' },
        { nombre: 'Arandas' },
        { nombre: 'Ciudad Guzmán' },
        { nombre: 'Ocotlán' },
        { nombre: 'San Juan de los Lagos' },
        { nombre: 'Tala' },
        { nombre: 'La Barca' },
        { nombre: 'Autlán de Navarro' },
        { nombre: 'Zapotiltic' },
        { nombre: 'Ameca' },
        { nombre: 'Jalostotitlán' },
        { nombre: 'Cihuatlán' },
        { nombre: 'Encarnación de Díaz' },
        { nombre: 'Teocaltiche' },
        { nombre: 'Jamay' },
        { nombre: 'Atotonilco el Alto' }
      ]
    },
    {
      nombre: 'Michoacán',
      municipios: [
        { nombre: 'Morelia' },
        { nombre: 'Uruapan' },
        { nombre: 'Zamora' },
        { nombre: 'Lázaro Cárdenas' },
        { nombre: 'Apatzingán' },
        { nombre: 'La Piedad' },
        { nombre: 'Zitácuaro' },
        { nombre: 'Sahuayo' },
        { nombre: 'Hidalgo' },
        { nombre: 'Pátzcuaro' },
        { nombre: 'Maravatío' },
        { nombre: 'Tacámbaro' },
        { nombre: 'Jiquilpan' },
        { nombre: 'Los Reyes' },
        { nombre: 'Zinapécuaro' }
      ]
    },
    {
      nombre: 'Morelos',
      municipios: [
        { nombre: 'Cuernavaca' },
        { nombre: 'Jiutepec' },
        { nombre: 'Temixco' },
        { nombre: 'Cuautla' },
        { nombre: 'Yautepec' },
        { nombre: 'Emiliano Zapata' },
        { nombre: 'Xochitepec' },
        { nombre: 'Puente de Ixtla' },
        { nombre: 'Tlalnepantla' },
        { nombre: 'Ayala' },
        { nombre: 'Jojutla' },
        { nombre: 'Tepoztlán' },
        { nombre: 'Tlaltizapán de Zapata' },
        { nombre: 'Xoxocotla' },
        { nombre: 'Coatetelco' }
      ]
    },
    {
      nombre: 'Nayarit',
      municipios: [
        { nombre: 'Tepic' },
        { nombre: 'Bahía de Banderas' },
        { nombre: 'Santiago Ixcuintla' },
        { nombre: 'Compostela' },
        { nombre: 'Acaponeta' },
        { nombre: 'Tuxpan' },
        { nombre: 'Rosamorada' },
        { nombre: 'Ixtlán del Río' },
        { nombre: 'San Blas' },
        { nombre: 'Ahuacatlán' },
        { nombre: 'Tecuala' },
        { nombre: 'Jala' },
        { nombre: 'Ruiz' },
        { nombre: 'Del Nayar' },
        { nombre: 'Xalisco' }
      ]
    },
    {
      nombre: 'Nuevo León',
      municipios: [
        { nombre: 'Monterrey' },
        { nombre: 'Guadalupe' },
        { nombre: 'Apodaca' },
        { nombre: 'San Nicolás de los Garza' },
        { nombre: 'San Pedro Garza García' },
        { nombre: 'Santa Catarina' },
        { nombre: 'General Escobedo' },
        { nombre: 'Juárez' },
        { nombre: 'García' },
        { nombre: 'Cadereyta Jiménez' },
        { nombre: 'Santiago' },
        { nombre: 'Linares' },
        { nombre: 'Montemorelos' },
        { nombre: 'Salinas Victoria' },
        { nombre: 'Ciénega de Flores' }
      ]
    },
    {
      nombre: 'Oaxaca',
      municipios: [
        { nombre: 'Oaxaca de Juárez' },
        { nombre: 'Salina Cruz' },
        { nombre: 'Juchitán de Zaragoza' },
        { nombre: 'Huajuapan de León' },
        { nombre: 'San Juan Bautista Tuxtepec' },
        { nombre: 'Santa Cruz Xoxocotlán' },
        { nombre: 'Santo Domingo Tehuantepec' },
        { nombre: 'Puerto Escondido' },
        { nombre: 'Miahuatlán de Porfirio Díaz' },
        { nombre: 'Santa María Atzompa' },
        { nombre: 'Tlacolula de Matamoros' },
        { nombre: 'Pinotepa Nacional' },
        { nombre: 'San Pedro Mixtepec' },
        { nombre: 'Putla Villa de Guerrero' },
        { nombre: 'Matías Romero Avendaño' }
      ]
    },
    {
      nombre: 'Puebla',
      municipios: [
        { nombre: 'Puebla' },
        { nombre: 'Tehuacán' },
        { nombre: 'San Martín Texmelucan' },
        { nombre: 'Atlixco' },
        { nombre: 'San Andrés Cholula' },
        { nombre: 'San Pedro Cholula' },
        { nombre: 'Teziutlán' },
        { nombre: 'Huauchinango' },
        { nombre: 'Izúcar de Matamoros' },
        { nombre: 'Tecamachalco' },
        { nombre: 'Acatzingo' },
        { nombre: 'Xicotepec' },
        { nombre: 'Zacatlán' },
        { nombre: 'Tepeaca' },
        { nombre: 'Chalchicomula de Sesma' }
      ]
    },
    {
      nombre: 'Querétaro',
      municipios: [
        { nombre: 'Querétaro' },
        { nombre: 'San Juan del Río' },
        { nombre: 'Corregidora' },
        { nombre: 'El Marqués' },
        { nombre: 'Pedro Escobedo' },
        { nombre: 'Tequisquiapan' },
        { nombre: 'Cadereyta de Montes' },
        { nombre: 'Colón' },
        { nombre: 'Ezequiel Montes' },
        { nombre: 'Huimilpan' },
        { nombre: 'Amealco de Bonfil' },
        { nombre: 'Jalpan de Serra' },
        { nombre: 'Tolimán' },
        { nombre: 'Pinal de Amoles' },
        { nombre: 'Arroyo Seco' }
      ]
    },
    {
      nombre: 'Quintana Roo',
      municipios: [
        { nombre: 'Benito Juárez' },
        { nombre: 'Solidaridad' },
        { nombre: 'Othón P. Blanco' },
        { nombre: 'Cozumel' },
        { nombre: 'Felipe Carrillo Puerto' },
        { nombre: 'Tulum' },
        { nombre: 'Bacalar' },
        { nombre: 'Isla Mujeres' },
        { nombre: 'José María Morelos' },
        { nombre: 'Lázaro Cárdenas' },
        { nombre: 'Puerto Morelos' }
      ]
    },
    {
      nombre: 'San Luis Potosí',
      municipios: [
        { nombre: 'San Luis Potosí' },
        { nombre: 'Soledad de Graciano Sánchez' },
        { nombre: 'Ciudad Valles' },
        { nombre: 'Matehuala' },
        { nombre: 'Ríoverde' },
        { nombre: 'Tamazunchale' },
        { nombre: 'Ciudad Fernández' },
        { nombre: 'Tamuín' },
        { nombre: 'Ébano' },
        { nombre: 'Cárdenas' },
        { nombre: 'Cerritos' },
        { nombre: 'Villa de Reyes' },
        { nombre: 'Santa María del Río' },
        { nombre: 'Tancanhuitz' },
        { nombre: 'Villa de Pozos' }
      ]
    },
    {
      nombre: 'Sinaloa',
      municipios: [
        { nombre: 'Culiacán' },
        { nombre: 'Mazatlán' },
        { nombre: 'Ahome' },
        { nombre: 'Guasave' },
        { nombre: 'Navolato' },
        { nombre: 'Sinaloa' },
        { nombre: 'Mocorito' },
        { nombre: 'El Fuerte' },
        { nombre: 'Salvador Alvarado' },
        { nombre: 'Angostura' },
        { nombre: 'Badiraguato' },
        { nombre: 'Escuinapa' },
        { nombre: 'Rosario' },
        { nombre: 'Concordia' },
        { nombre: 'Elota' }
      ]
    },
    {
      nombre: 'Sonora',
      municipios: [
        { nombre: 'Hermosillo' },
        { nombre: 'Ciudad Obregón' },
        { nombre: 'Nogales' },
        { nombre: 'San Luis Río Colorado' },
        { nombre: 'Navojoa' },
        { nombre: 'Guaymas' },
        { nombre: 'Caborca' },
        { nombre: 'Agua Prieta' },
        { nombre: 'Puerto Peñasco' },
        { nombre: 'Cananea' },
        { nombre: 'Empalme' },
        { nombre: 'Huatabampo' },
        { nombre: 'Magdalena' },
        { nombre: 'Etchojoa' },
        { nombre: 'Álamos' }
      ]
    },
    {
      nombre: 'Tabasco',
      municipios: [
        { nombre: 'Centro' },
        { nombre: 'Cárdenas' },
        { nombre: 'Comalcalco' },
        { nombre: 'Huimanguillo' },
        { nombre: 'Paraíso' },
        { nombre: 'Cunduacán' },
        { nombre: 'Macuspana' },
        { nombre: 'Nacajuca' },
        { nombre: 'Jalpa de Méndez' },
        { nombre: 'Teapa' },
        { nombre: 'Tenosique' },
        { nombre: 'Balancán' },
        { nombre: 'Emiliano Zapata' },
        { nombre: 'Centla' },
        { nombre: 'Jalapa' }
      ]
    },
    {
      nombre: 'Tamaulipas',
      municipios: [
        { nombre: 'Reynosa' },
        { nombre: 'Matamoros' },
        { nombre: 'Nuevo Laredo' },
        { nombre: 'Tampico' },
        { nombre: 'Ciudad Victoria' },
        { nombre: 'Ciudad Madero' },
        { nombre: 'Altamira' },
        { nombre: 'Río Bravo' },
        { nombre: 'El Mante' },
        { nombre: 'Valle Hermoso' },
        { nombre: 'San Fernando' },
        { nombre: 'Ciudad Mier' },
        { nombre: 'Güémez' },
        { nombre: 'Xicoténcatl' },
        { nombre: 'Aldama' }
      ]
    },
    {
      nombre: 'Tlaxcala',
      municipios: [
        { nombre: 'Tlaxcala' },
        { nombre: 'Apizaco' },
        { nombre: 'Huamantla' },
        { nombre: 'Chiautempan' },
        { nombre: 'Zacatelco' },
        { nombre: 'San Pablo del Monte' },
        { nombre: 'Tlaxco' },
        { nombre: 'Contla de Juan Cuamatzi' },
        { nombre: 'Calpulalpan' },
        { nombre: 'Yauhquemehcan' },
        { nombre: 'Papalotla de Xicohténcatl' },
        { nombre: 'Tetla de la Solidaridad' },
        { nombre: 'Santa Cruz Tlaxcala' },
        { nombre: 'Xaloztoc' },
        { nombre: 'Natívitas' }
      ]
    },
    {
      nombre: 'Veracruz',
      municipios: [
        { nombre: 'Veracruz' },
        { nombre: 'Xalapa' },
        { nombre: 'Coatzacoalcos' },
        { nombre: 'Poza Rica de Hidalgo' },
        { nombre: 'Córdoba' },
        { nombre: 'Orizaba' },
        { nombre: 'Minatitlán' },
        { nombre: 'Boca del Río' },
        { nombre: 'Martínez de la Torre' },
        { nombre: 'Tuxpan' },
        { nombre: 'Cosoleacaque' },
        { nombre: 'San Andrés Tuxtla' },
        { nombre: 'Papantla' },
        { nombre: 'Fortín' },
        { nombre: 'Coatepec' },
        { nombre: 'Tierra Blanca' },
        { nombre: 'Las Choapas' },
        { nombre: 'Álamo Temapache' },
        { nombre: 'Acayucan' },
        { nombre: 'Río Blanco' },
        { nombre: 'Camerino Z. Mendoza' },
        { nombre: 'Tlalixcoyan' },
        { nombre: 'Catemaco' },
        { nombre: 'Tihuatlán' },
        { nombre: 'Cosamaloapan de Carpio' }
      ]
    },
    {
      nombre: 'Yucatán',
      municipios: [
        { nombre: 'Mérida' },
        { nombre: 'Kanasín' },
        { nombre: 'Valladolid' },
        { nombre: 'Progreso' },
        { nombre: 'Tizimín' },
        { nombre: 'Umán' },
        { nombre: 'Ticul' },
        { nombre: 'Hunucmá' },
        { nombre: 'Motul' },
        { nombre: 'Oxkutzcab' },
        { nombre: 'Izamal' },
        { nombre: 'Maxcanú' },
        { nombre: 'Tekax' },
        { nombre: 'Peto' },
        { nombre: 'Halachó' }
      ]
    },
    {
      nombre: 'Zacatecas',
      municipios: [
        { nombre: 'Zacatecas' },
        { nombre: 'Guadalupe' },
        { nombre: 'Fresnillo' },
        { nombre: 'Jerez' },
        { nombre: 'Río Grande' },
        { nombre: 'Sombrerete' },
        { nombre: 'Calera' },
        { nombre: 'Ojocaliente' },
        { nombre: 'Pinos' },
        { nombre: 'Villanueva' },
        { nombre: 'Juan Aldama' },
        { nombre: 'Valparaíso' },
        { nombre: 'Loreto' },
        { nombre: 'Tlaltenango de Sánchez Román' },
        { nombre: 'Nochistlán de Mejía' }
      ]
    }
  ];

// --- Agregado para react-select ---
export interface LocationOption {
  label: string;
  value: string;
  type: 'estado' | 'municipio';
  estado?: string; // Solo para municipios
}

export function getLocationOptions() {
  const estados = estadosDeMexico.map(e => ({
    label: e.nombre,
    value: e.nombre,
    type: 'estado' as const
  }));

  const municipios = estadosDeMexico.flatMap(e =>
    e.municipios.map(m => ({
      label: `${m.nombre} (${e.nombre})`,
      value: m.nombre,
      type: 'municipio' as const,
      estado: e.nombre
    }))
  );

  return [
    { label: 'Estados', options: estados },
    { label: 'Municipios', options: municipios }
  ];
}