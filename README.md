# 🎮 Portafolio Profesional de Game Developer (Bilingüe)

Portafolio web modular, profesional y bilingüe (Español/Inglés) para desarrolladores de videojuegos, con diseño retro-futurista mejorado y sistema de visualización de proyectos con modales.

## ✨ Características Nuevas

- 🌐 **Sistema Bilingüe** - Cambio instantáneo entre Español e Inglés
- 📖 **Modales de Proyectos** - Cada proyecto tiene su propia vista detallada
- 🎨 **Diseño Profesional Mejorado** - Visual pulido y acabado
- 🔍 **Filtrado de Proyectos** - Por categoría (Unity, Web Games, Tools)
- ⚡ **Animaciones Avanzadas** - Partículas, transiciones suaves, efectos visuales
- 📊 **Barras de Progreso** - Skills con porcentajes visuales
- 💳 **Cards Profesionales** - Diseño tipo portfolio de alto nivel

## 🚀 Características Principales

- ✨ Diseño retro-futurista con estética neon cyberpunk mejorada
- 📱 Completamente responsive (mobile, tablet, desktop)
- 🌍 Soporte bilingüe (ES/EN) con toggle interactivo
- 🎯 Sistema modular: agrega proyectos editando un solo archivo JSON
- 📖 Modales individuales para cada proyecto con información detallada
- 🎨 Filtros de proyecto por categoría
- ⚡ Animaciones suaves y efectos de partículas
- 🎨 Paleta de colores personalizada con CSS variables
- 🔧 Sin dependencias externas (HTML, CSS, JS puro)
- 🌐 Optimizado para GitHub Pages

## 📁 Estructura del Proyecto

```
tu-repositorio/
├── index.html              # Página principal con soporte bilingüe
├── css/
│   └── style.css          # Estilos mejorados (modales, animaciones)
├── js/
│   └── main.js            # JavaScript (bilingüe + modales + filtros)
├── data/
│   └── projects.json      # ⭐ ARCHIVO PRINCIPAL - ahora con soporte bilingüe
├── assets/
│   ├── images/            # Imágenes del portafolio
│   └── projects/          # Screenshots de proyectos
└── README.md              # Este archivo
```

## 🛠️ Instalación y Setup

### GitHub Pages (Recomendado)

1. **Crea un repositorio:**
   ```
   Nombre: tu-usuario.github.io
   ```

2. **Sube los archivos:**
   ```bash
   git init
   git add .
   git commit -m "Portfolio v2.0 - Bilingual with modals"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-usuario.github.io.git
   git push -u origin main
   ```

3. **Activa GitHub Pages:**
   - Settings > Pages
   - Source: main / (root)
   - Guarda

4. **¡Listo!** Tu sitio: `https://tu-usuario.github.io`

## ✏️ Personalización

### 1. Información Personal

Edita `index.html`:

```html
<!-- Título -->
<title>Tu Nombre | Game Developer & Programmer</title>

<!-- Hero Stats - línea 82 -->
<span class="stat-number">15+</span> <!-- Cambia tus números -->

<!-- Contacto - líneas 270-295 -->
<a href="mailto:TUEMAIL@example.com" class="contact-card">
<a href="https://github.com/TUUSUARIO" target="_blank" class="contact-card">
```

### 2. Skills y Porcentajes

Edita los porcentajes en `index.html` (líneas 230-260):

```html
<div class="skill-progress" style="width: 90%"></div> <!-- Ajusta % -->
```

## 🎯 Agregar Proyectos (Sistema Bilingüe)

### Paso a Paso:

1. **Abre `data/projects.json`**

2. **Agrega un proyecto con soporte bilingüe:**

```json
{
  "title": "Mi Juego Increíble",
  "title_en": "My Amazing Game",
  
  "description": "Descripción corta en español",
  "description_en": "Short description in English",
  
  "full_description": "Descripción completa detallada en español para el modal",
  "full_description_en": "Detailed full description in English for the modal",
  
  "category": "unity",
  
  "technologies": ["Unity", "C#", "NavMesh"],
  
  "features": [
    "Característica 1 en español",
    "Característica 2 en español"
  ],
  "features_en": [
    "Feature 1 in English",
    "Feature 2 in English"
  ],
  
  "image": "assets/projects/mi-juego.png",
  "github": "https://github.com/tuusuario/mi-juego",
  "demo": "https://tuusuario.itch.io/mi-juego"
}
```

### Campos del Proyecto:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | String | Título en español |
| `title_en` | String | Título en inglés (opcional) |
| `description` | String | Descripción corta en español |
| `description_en` | String | Descripción corta en inglés (opcional) |
| `full_description` | String | Descripción completa para el modal (español) |
| `full_description_en` | String | Descripción completa para el modal (inglés) |
| `category` | String | `"unity"`, `"web"`, `"tools"` o `"all"` |
| `technologies` | Array | Tecnologías usadas |
| `features` | Array | Características principales (español) |
| `features_en` | Array | Características principales (inglés) |
| `image` | String | Ruta a imagen (opcional, deja `""`) |
| `github` | String | Link a GitHub (opcional) |
| `demo` | String | Link a demo jugable (opcional) |

### Categorías Disponibles:

- `unity` - Proyectos de Unity
- `web` - Juegos web (HTML5, WebGL)
- `tools` - Herramientas y sistemas
- `all` - Muestra en todos los filtros

## 🌍 Sistema Bilingüe

El portafolio detecta automáticamente el idioma y permite cambiar entre ES/EN:

1. **Toggle en la navegación** - Click para cambiar idioma
2. **Todo el contenido se traduce** - Proyectos, UI, textos
3. **Sin recargas** - Cambio instantáneo con JavaScript

### Cómo Funciona:

- Los elementos usan atributos `data-es` y `data-en`
- JavaScript actualiza el contenido al cambiar idioma
- Los proyectos muestran título/descripción según idioma activo

## 📖 Modales de Proyectos

Cada proyecto tiene su propia vista modal con:

- ✅ Imagen grande del proyecto
- ✅ Título y descripción completa
- ✅ Lista de características principales
- ✅ Tecnologías utilizadas (tags visuales)
- ✅ Links a GitHub y Demo
- ✅ Diseño profesional y pulido

**Cómo se activa:**
- Click en cualquier parte de la tarjeta del proyecto
- Click en "Ver Detalles"
- Cierra con X, ESC, o click fuera del modal

## 🔍 Filtros de Proyectos

Los usuarios pueden filtrar proyectos por categoría:

- **Todos** - Muestra todos los proyectos
- **Unity** - Solo proyectos de Unity
- **Web Games** - Juegos web
- **Herramientas** - Sistemas y herramientas

Asigna la categoría en `projects.json`:

```json
"category": "unity"  // o "web", "tools"
```

## 🎨 Personalización de Colores

Edita `css/style.css` (líneas 1-40):

```css
:root {
    --accent-cyan: #00fff9;        /* Color primario */
    --accent-magenta: #ff006e;     /* Color secundario */
    --accent-purple: #8338ec;      /* Color acento */
    --accent-blue: #3772ff;        /* Color adicional */
}
```

## 📸 Imágenes de Proyectos

1. Guarda en `assets/projects/mi-proyecto.png`
2. Actualiza en `projects.json`:
   ```json
   "image": "assets/projects/mi-proyecto.png"
   ```
3. **Tamaño recomendado:** 1200x675px (16:9) en PNG o JPG

## 🆕 Nuevas Funcionalidades vs Versión Anterior

| Característica | Anterior | Nueva Versión |
|----------------|----------|---------------|
| Idiomas | Solo español | Español + Inglés |
| Vista de Proyectos | Cards básicas | Cards + Modales detallados |
| Filtros | ❌ No | ✅ Por categoría |
| Animaciones | Básicas | Avanzadas + Partículas |
| Skills | Lista simple | Barras de progreso visuales |
| Diseño | Funcional | Profesional y pulido |
| Contacto | Links simples | Cards interactivas |

## 🐛 Solución de Problemas

### Los proyectos no cambian de idioma

- ✅ Verifica que `title_en` y `description_en` existen en el JSON
- ✅ Si no hay versión en inglés, se mostrará la española

### El modal no se abre

- ✅ Revisa la consola (F12) para errores
- ✅ Verifica que `main.js` está cargado correctamente

### Los filtros no funcionan

- ✅ Asegúrate de que cada proyecto tiene un campo `"category"`
- ✅ Las categorías válidas son: `"unity"`, `"web"`, `"tools"`

## 📚 Estructura del JSON (Ejemplo Completo)

```json
{
  "projects": [
    {
      "title": "Proyecto Ejemplo",
      "title_en": "Example Project",
      "description": "Breve descripción en español",
      "description_en": "Brief description in English",
      "full_description": "Descripción larga y detallada en español para el modal...",
      "full_description_en": "Long and detailed description in English for the modal...",
      "category": "unity",
      "technologies": ["Unity", "C#", "AI"],
      "features": [
        "Característica 1",
        "Característica 2"
      ],
      "features_en": [
        "Feature 1",
        "Feature 2"
      ],
      "image": "assets/projects/example.png",
      "github": "https://github.com/user/project",
      "demo": "https://user.itch.io/project"
    }
  ]
}
```

## 🎓 Tips para un Portafolio Profesional

1. **Describe resultados específicos** - "Optimizado para 60 FPS" en vez de "buen rendimiento"
2. **Muestra proceso y decisiones** - Explica por qué elegiste ciertas tecnologías
3. **Incluye métricas** - Jugadores, descargas, tiempo de desarrollo
4. **Screenshots de calidad** - Imágenes en alta resolución
5. **Demos jugables** - Sube a itch.io para fácil acceso
6. **Mantén actualizado** - Agrega proyectos nuevos regularmente

## 🔗 Recursos Útiles

- **Validar JSON:** https://jsonlint.com/
- **Optimizar imágenes:** https://tinypng.com/
- **Paletas de colores:** https://coolors.co/
- **Fuentes:** https://fonts.google.com/
- **Hosting gratuito:** GitHub Pages (incluido)

## 📄 Licencia

Este proyecto es de código abierto. Úsalo libremente para tu portafolio personal.

---

**¡Hecho con 💜, código limpio y atención al detalle!**

¿Preguntas? Abre un issue o consulta la documentación.
