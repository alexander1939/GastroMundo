# 🌮 GastroMundo - Mapa de Restaurantes Mexicanos

Una aplicación web que te permite encontrar restaurantes de comida tradicional mexicana en cualquier ciudad del mundo.

## 🚀 Características

- **Búsqueda por ciudad**: Busca restaurantes mexicanos en cualquier ciudad
- **Mapa interactivo**: Visualiza los restaurantes en un mapa con marcadores
- **Lista detallada**: Ve información de cada restaurante incluyendo calificaciones
- **Diseño responsivo**: Funciona perfectamente en móviles y computadoras
- **APIs gratuitas**: Utiliza OpenTripMap API (gratuita)

## 🛠️ Tecnologías Utilizadas

- **React 19** con TypeScript
- **Leaflet** para mapas interactivos
- **OpenTripMap API** para datos de restaurantes
- **Vite** para el bundling
- **CSS moderno** con gradientes y efectos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd GastroMundo
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🔑 Configuración de API (Opcional)

Para obtener datos reales de restaurantes, puedes obtener una API key gratuita de OpenTripMap:

1. Ve a [OpenTripMap](https://opentripmap.io/)
2. Regístrate para obtener una API key gratuita
3. Reemplaza la API key en `src/services/api.ts`:
```typescript
const OPENTRIPMAP_API_KEY = 'TU_API_KEY_AQUI';
```

**Nota**: La aplicación funciona con datos simulados si no tienes una API key.

## 🎯 Cómo Usar

1. **Buscar restaurantes**: Escribe el nombre de una ciudad en el campo de búsqueda
2. **Ver en el mapa**: Los restaurantes aparecerán como marcadores en el mapa
3. **Explorar detalles**: Haz clic en un restaurante para ver su información
4. **Navegar**: Usa los controles del mapa para hacer zoom y moverte

## 🍽️ Tipos de Restaurantes

La aplicación busca restaurantes que incluyan:
- Tacos
- Burritos
- Enchiladas
- Comida mexicana tradicional
- Cantinas mexicanas

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
- [Leaflet](https://leafletjs.com/) por la librería de mapas
- [React](https://reactjs.org/) por el framework

---

¡Disfruta explorando los mejores restaurantes mexicanos del mundo! 🌮🇲🇽
