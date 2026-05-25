# David Aragon — Game Dev Portfolio

Portafolio web personal de desarrollo de videojuegos, alojado en GitHub Pages.  
**Live:** https://JonaDev01.github.io/Portafolio

---

## Estructura

```
Portafolio/
├── index.html          # Página principal
├── css/style.css       # Estilos (tema cyberpunk)
├── js/main.js          # Lógica: carga de proyectos, modal, filtros, skills
├── data/
│   └── projects.json   # ← único archivo a editar para agregar juegos
└── assets/
    └── games/
        └── <id-juego>/
            ├── thumbnail.jpg
            └── screenshots/
```

---

## Agregar un nuevo juego

Edita **`data/projects.json`** y agrega un objeto al array `"projects"`:

```json
{
  "id": "nombre-unico-del-juego",
  "title": "Título en español",
  "title_en": "Title in English",

  "description": "Descripción corta para la tarjeta (1-2 líneas).",
  "description_en": "Short description for the card (1-2 lines).",

  "full_description": "Descripción larga para el modal — contexto, mecánicas, objetivo.",
  "full_description_en": "Long description for the modal.",

  "development_notes": "Desafíos técnicos, algoritmos usados, decisiones de diseño. Aquí demuestras tus habilidades reales.",
  "development_notes_en": "Technical challenges, algorithms used, design decisions.",

  "category": "unity",
  "status": "completed",
  "year": 2026,
  "duration": "3 meses",
  "duration_en": "3 months",
  "role": "Desarrollador Principal",
  "role_en": "Lead Developer",
  "platform": ["PC", "WebGL"],

  "technologies": ["Unity", "C#", "NavMesh"],

  "features": ["Feature 1", "Feature 2"],
  "features_en": ["Feature 1", "Feature 2"],

  "thumbnail": "assets/games/nombre-juego/thumbnail.jpg",
  "images": [
    "assets/games/nombre-juego/screen1.jpg",
    "assets/games/nombre-juego/screen2.jpg"
  ],
  "video_url": "https://www.youtube.com/embed/VIDEO_ID",

  "github": "https://github.com/JonaDev01/nombre-juego",
  "demo": "https://jonadev01.itch.io/nombre-juego",
  "download": ""
}
```

### Valores de `category`

| Valor | Filtro en el sitio |
|---|---|
| `unity` | Unity |
| `godot` | Godot |
| `web` | Web Games |
| `tools` | Herramientas |
| `jam` | Game Jam |

### Valores de `status`

| Valor | Badge en la tarjeta |
|---|---|
| `completed` | ✓ Completado (verde) |
| `jam` | ⚡ Game Jam (amarillo) |
| `prototype` | ◈ Prototipo (morado) |
| `wip` | … En Desarrollo (magenta) |

### Campos opcionales

Todos los campos son opcionales excepto `title`, `description`, `category` y `technologies`.  
Si no tienes imagen o video, deja el campo como `""` o `[]` — el sitio muestra un placeholder automáticamente.

---

## Características del sitio

- **Modal por juego** — galería con carrusel de imágenes, embed de YouTube, badge de estado, meta info (año · duración · rol · plataformas), descripción completa, notas de desarrollo y links
- **Skills auto-generados** — la sección de habilidades técnicas se construye automáticamente a partir de los `technologies` de todos los proyectos, agrupados por categoría y con contador de cuántos juegos usan cada una
- **Filtros** — por categoría de juego
- **Bilingüe ES/EN** — toggle en la navegación
- **Sin dependencias** — HTML, CSS y JS puro; no requiere npm ni build

---

## Imágenes

- Formato recomendado: **JPG o WebP**
- Resolución: **1280×720 px** (16:9)
- Peso: **< 300 KB** por imagen (usa [tinypng.com](https://tinypng.com) si es necesario)
- Carpeta: `assets/games/<id-juego>/`

---

## Colores (CSS variables)

```css
/* css/style.css — primeras líneas */
--accent-cyan:    #00fff9;   /* color principal */
--accent-magenta: #ff006e;   /* color secundario */
--accent-purple:  #8338ec;   /* acento */
--accent-yellow:  #ffbe0b;   /* badge Game Jam */
--accent-green:   #00ff64;   /* badge Completed */
```

---

## Deploy

El sitio se actualiza automáticamente en GitHub Pages con cada push a `main`.

```bash
git add data/projects.json assets/
git commit -m "Agrego juego: Nombre del Juego"
git push
```
