# 🚀 GUÍA RÁPIDA - Portafolio Bilingüe v2.0

## ⚡ Inicio Rápido (5 minutos)

### 1. Sube a GitHub Pages
```bash
git init
git add .
git commit -m "Portfolio v2.0 - Bilingual"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-USUARIO.github.io.git
git push -u origin main
```

### 2. Activa GitHub Pages
- GitHub > Tu repositorio > Settings > Pages
- Source: "main" branch, carpeta: / (root)
- ¡Tu sitio estará en: `https://TU-USUARIO.github.io`

---

## 🆕 NUEVAS CARACTERÍSTICAS

### ✅ Sistema Bilingüe (ES/EN)
- Toggle en la navegación superior derecha
- Cambio instantáneo sin recargas
- Todo el contenido se traduce automáticamente

### ✅ Modales de Proyectos
- Click en cualquier proyecto para ver detalles completos
- Vista profesional con descripción extendida
- Características, tecnologías y links destacados

### ✅ Filtros de Proyectos
- Filtra por: Todos, Unity, Web Games, Herramientas
- Búsqueda visual instantánea

### ✅ Diseño Mejorado
- Visual más profesional y pulido
- Animaciones avanzadas con partículas
- Skills con barras de progreso
- Cards de contacto interactivas

---

## ✏️ PERSONALIZACIÓN BÁSICA

### Cambiar Tu Información

**index.html:**
```html
<!-- Línea 7 -->
<title>TU NOMBRE | Game Developer</title>

<!-- Línea 82-90 - Stats del Hero -->
<span class="stat-number">15+</span> <!-- Tus números -->

<!-- Líneas 95-110 - Sobre Mí -->
<p class="about-intro" data-es="Tu bio en español" data-en="Your bio in English">

<!-- Líneas 230-260 - Ajusta porcentajes de skills -->
<div class="skill-progress" style="width: 90%"></div>

<!-- Líneas 270-295 - Links de contacto -->
<a href="mailto:TUEMAIL@example.com">
```

---

## 🎮 AGREGAR PROYECTOS (BILINGÜE)

### Solo edita: `data/projects.json`

**Ejemplo de Proyecto Completo:**

```json
{
  "title": "Mi Proyecto",
  "title_en": "My Project",
  
  "description": "Descripción corta en español",
  "description_en": "Short description in English",
  
  "full_description": "Descripción completa para el modal en español. Aquí puedes explicar en detalle las mecánicas, tecnologías, y logros del proyecto.",
  "full_description_en": "Full description for the modal in English. Here you can explain in detail the mechanics, technologies, and achievements of the project.",
  
  "category": "unity",
  
  "technologies": ["Unity", "C#", "Photon"],
  
  "features": [
    "Característica 1 en español",
    "Característica 2 en español",
    "Característica 3 en español"
  ],
  "features_en": [
    "Feature 1 in English",
    "Feature 2 in English",
    "Feature 3 in English"
  ],
  
  "image": "assets/projects/mi-proyecto.png",
  "github": "https://github.com/tuusuario/proyecto",
  "demo": "https://tuusuario.itch.io/proyecto"
}
```

### Campos Obligatorios:
- ✅ `title` - Título en español
- ✅ `description` - Descripción corta en español
- ✅ `category` - `"unity"`, `"web"`, o `"tools"`
- ✅ `technologies` - Array de tecnologías

### Campos Opcionales:
- ⚙️ `title_en` - Título en inglés
- ⚙️ `description_en` - Descripción en inglés
- ⚙️ `full_description` - Descripción larga (español)
- ⚙️ `full_description_en` - Descripción larga (inglés)
- ⚙️ `features` / `features_en` - Lista de características
- ⚙️ `image` - Ruta de imagen
- ⚙️ `github` / `demo` - Links externos

**Si no pones versión en inglés (`_en`), se mostrará la española**

---

## 🎨 CAMBIAR COLORES

**css/style.css** (primeras líneas):

```css
:root {
    --accent-cyan: #00fff9;        /* Color principal */
    --accent-magenta: #ff006e;     /* Color secundario */
    --accent-purple: #8338ec;      /* Acento */
    --accent-blue: #3772ff;        /* Adicional */
}
```

---

## 📋 CHECKLIST ANTES DE PUBLICAR

- [ ] Cambié mi nombre y contacto en `index.html`
- [ ] Actualicé "Sobre Mí" (ES + EN)
- [ ] Agregué mis proyectos en `projects.json`
- [ ] Cada proyecto tiene `category` definida
- [ ] Ajusté los porcentajes de skills
- [ ] Probé el cambio de idioma (ES/EN)
- [ ] Probé que los modales se abren correctamente
- [ ] Probé los filtros de proyectos
- [ ] Optimicé las imágenes (< 200KB cada una)
- [ ] Todo funciona en mobile
- [ ] Subí a GitHub y activé Pages

---

## 🆘 AYUDA RÁPIDA

### El idioma no cambia
- Verifica que tienes `data-es` y `data-en` en los elementos
- Si no hay `title_en`, se usa `title` (español por defecto)

### El modal no abre
- Abre consola (F12) y busca errores
- Verifica que `main.js` está cargado

### Los filtros no funcionan
- Asegúrate que cada proyecto tiene `"category"`
- Categorías válidas: `"unity"`, `"web"`, `"tools"`

### Proyectos no se ven
1. Consola (F12) para ver errores
2. Valida JSON: https://jsonlint.com/
3. Verifica que `data/projects.json` existe

---

## 💡 TIPS PRO

### Para el Contenido Bilingüe:
1. **No copies/pegues con traductor** - Adapta el tono
2. **Sé conciso en inglés** - Cultura de lectura rápida
3. **Términos técnicos en inglés** - No traduzcas "gameplay" a "jugabilidad"

### Para Proyectos:
1. **Descripción corta (80-120 chars)** - Para las cards
2. **Descripción larga (200-400 palabras)** - Para modales
3. **3-5 features específicas** - Bullets concretos
4. **Screenshots 1200x675px** - Formato 16:9

### Para Skills:
1. **Sé honesto** - No pongas 90% en tecnologías que apenas conoces
2. **Enfócate en game dev** - Prioriza Unity, C#, etc.
3. **Muestra progresión** - Los juniors tienen 60-80% en promedio

---

## 🎓 EJEMPLO COMPLETO DE PROYECTO

```json
{
  "title": "Endless Runner 3D",
  "title_en": "Endless Runner 3D",
  
  "description": "Runner infinito con generación procedural de obstáculos y power-ups coleccionables",
  "description_en": "Infinite runner with procedural obstacle generation and collectible power-ups",
  
  "full_description": "Juego móvil de endless runner desarrollado en Unity. Implementa generación procedural de niveles usando object pooling para optimización de memoria. El jugador esquiva obstáculos, recolecta monedas y power-ups mientras la dificultad aumenta progresivamente. Incluye sistema de logros, leaderboard local, y monetización con anuncios. Desarrollado en 3 semanas como proyecto personal.",
  "full_description_en": "Mobile endless runner game developed in Unity. Implements procedural level generation using object pooling for memory optimization. Players dodge obstacles, collect coins and power-ups while difficulty progressively increases. Features achievement system, local leaderboard, and ad-based monetization. Developed in 3 weeks as personal project.",
  
  "category": "unity",
  
  "technologies": ["Unity", "C#", "Object Pooling", "Mobile", "AdMob"],
  
  "features": [
    "Generación procedural infinita",
    "Object pooling para 60 FPS constantes",
    "Sistema de power-ups con 5 tipos",
    "Leaderboard local persistente",
    "Monetización con AdMob"
  ],
  "features_en": [
    "Infinite procedural generation",
    "Object pooling for constant 60 FPS",
    "Power-up system with 5 types",
    "Persistent local leaderboard",
    "AdMob monetization"
  ],
  
  "image": "assets/projects/endless-runner.png",
  "github": "https://github.com/usuario/endless-runner",
  "demo": "https://usuario.itch.io/endless-runner"
}
```

---

## 🔗 RECURSOS

- **Validar JSON:** https://jsonlint.com/
- **Optimizar imágenes:** https://tinypng.com/
- **Colores:** https://coolors.co/
- **Fuentes:** https://fonts.google.com/

---

**¿Más dudas?** Lee el README.md completo.

**¡Éxito con tu portafolio profesional bilingüe! 🚀🎮🌍**
