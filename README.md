# 🌮 GastroMundo - Mapa de Restaurantes Mexicanos

Una aplicación web que te permite encontrar restaurantes de comida tradicional mexicana en cualquier ciudad del mundo, además de explorar las festividades más importantes de México.

## 🚀 Características

- **Búsqueda por ciudad**: Busca restaurantes mexicanos en cualquier ciudad
- **Mapa interactivo**: Visualiza los restaurantes en un mapa con marcadores
- **Festividades mexicanas**: Explora días festivos y tradiciones de México
- **Búsqueda inteligente**: Filtra festividades por nombre, fecha, tipo y mes
- **Lista detallada**: Ve información de cada restaurante incluyendo calificaciones
- **Diseño responsivo**: Funciona perfectamente en móviles y computadoras
- **APIs gratuitas**: Utiliza OpenTripMap API y HolidayAPI

## 🛠️ Tecnologías Utilizadas

- **React 19** con TypeScript
- **Leaflet** para mapas interactivos
- **OpenTripMap API** para datos de restaurantes
- **HolidayAPI** para días festivos mexicanos
- **Express.js** para el servidor proxy
- **Vite** para el bundling
- **CSS moderno** con gradientes y efectos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd GastroMundo
```

2. Instala las dependencias del frontend:
```bash
npm install
```

3. Instala las dependencias del backend (proxy):
```bash
cd backend
npm install
cd ..
```

## 🚀 Cómo Levantar el Proyecto

**IMPORTANTE**: Necesitas ejecutar tanto el servidor proxy como el frontend.

### 1. Iniciar el Servidor Proxy (Backend)

Primero, inicia el servidor proxy que maneja las peticiones a las APIs externas:

```bash
# Desde la raíz del proyecto
npx ts-node backend\holiday-proxy.js
```

Deberías ver:
```
Proxy listening on http://localhost:3001
```

### 2. Iniciar el Frontend

En una nueva terminal, inicia la aplicación React:

```bash
# Desde la raíz del proyecto
npm run dev
```

Deberías ver:
```
VITE v7.0.3  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 3. Acceder a la Aplicación

Abre tu navegador en `http://localhost:5173`

## 🔑 Configuración de APIs

### OpenTripMap API (Opcional)
Para obtener datos reales de restaurantes:

1. Ve a [OpenTripMap](https://opentripmap.io/)
2. Regístrate para obtener una API key gratuita
3. Reemplaza la API key en `src/services/api.ts`:
```typescript
const OPENTRIPMAP_API_KEY = 'TU_API_KEY_AQUI';
```

### HolidayAPI (Ya configurada)
La API para días festivos ya está configurada en el proxy con una clave válida.

**Nota**: La aplicación funciona con datos simulados de restaurantes si no tienes una API key de OpenTripMap.

## 🎯 Cómo Usar

### 🌮 Restaurantes
1. **Buscar restaurantes**: Escribe el nombre de una ciudad en el campo de búsqueda
2. **Ver en el mapa**: Los restaurantes aparecerán como marcadores en el mapa
3. **Explorar detalles**: Haz clic en un restaurante para ver su información
4. **Navegar**: Usa los controles del mapa para hacer zoom y moverte

### 🎉 Festividades Mexicanas
1. **Explorar festividades**: Ve a la pestaña de eventos
2. **Buscar por nombre**: Usa el buscador para encontrar festividades específicas
3. **Buscar por fecha**: Escribe "6 enero", "24 diciembre", etc.
4. **Filtrar por tipo**: Usa los botones para filtrar por tipo de celebración
5. **Filtrar por mes/día**: Usa los selectores para filtrar por fecha específica
6. **Ver detalles**: Haz clic en una festividad para ver información completa

## 🍽️ Tipos de Restaurantes

La aplicación busca restaurantes que incluyan:
- Tacos
- Burritos
- Enchiladas
- Comida mexicana tradicional
- Cantinas mexicanas

## 🎊 Festividades Incluidas

- Día de los Muertos
- Día de la Independencia
- Día de la Revolución
- Día de la Virgen de Guadalupe
- Navidad y Año Nuevo
- Día de Reyes
- Día de la Constitución
- Día del Trabajo
- Día de la Bandera
- Día del Niño
- Día de las Madres y del Padre
- Y muchas más...

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Tablets y móviles

## 🚀 Despliegue

Para desplegar en producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

**Nota**: Para producción, necesitarás configurar el proxy en tu servidor.

## 🔧 Solución de Problemas

### Error de CORS
Si ves errores de CORS, asegúrate de que:
1. El proxy esté corriendo en `http://localhost:3001`
2. El frontend esté corriendo en `http://localhost:5173`

### Fechas incorrectas
Si las fechas aparecen un día antes, el problema ya está solucionado en el código.

### No se cargan los datos
Verifica que:
1. El proxy esté funcionando correctamente
2. Tengas conexión a internet
3. Las APIs estén disponibles

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [OpenTripMap](https://opentripmap.io/) por proporcionar la API gratuita
- [HolidayAPI](https://holidayapi.com/) por los datos de días festivos
- [Leaflet](https://leafletjs.com/) por la librería de mapas
- [React](https://reactjs.org/) por el framework

---

¡Disfruta explorando los mejores restaurantes mexicanos y las festividades más importantes de México! 🌮🇲🇽🎉
