// ==========================================
// GAME DEV PORTFOLIO — Main Script
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLanguageToggle();
    loadProjects();
    initParticles();
    initAnimations();
    initModal();
});

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu   = document.querySelector('.nav-menu');
    const navLinks  = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

// ==========================================
// BILINGUAL SYSTEM (ES / EN)
// ==========================================
let currentLang = 'es';

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const langOptions = document.querySelectorAll('.lang-option');

    langToggle.addEventListener('click', () => switchLanguage(currentLang === 'es' ? 'en' : 'es'));
    langOptions.forEach(opt => {
        opt.addEventListener('click', e => {
            e.stopPropagation();
            switchLanguage(opt.getAttribute('data-lang'));
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });
    document.documentElement.lang = lang;
    loadProjects();
}

function t(project, key) {
    const enKey = `${key}_en`;
    return (currentLang === 'en' && project[enKey]) ? project[enKey] : (project[key] || '');
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            position:absolute;
            width:${size}px; height:${size}px;
            background:${Math.random() > 0.5 ? 'var(--accent-cyan)' : 'var(--accent-magenta)'};
            border-radius:50%;
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            opacity:${Math.random() * 0.5 + 0.2};
            animation:float ${Math.random() * 20 + 10}s ${Math.random() * 5}s infinite ease-in-out;
        `;
        container.appendChild(p);
    }
}

// ==========================================
// LOAD PROJECTS FROM JSON
// ==========================================
async function loadProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    try {
        const res = await fetch('data/projects.json');
        if (!res.ok) throw new Error('Could not load projects.json');
        const data = await res.json();
        const projects = data.projects;

        if (!projects.length) {
            container.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-secondary);padding:3rem;">
                <p>${currentLang === 'es' ? 'No hay proyectos disponibles aún.' : 'No projects available yet.'}</p>
            </div>`;
            return;
        }

        container.innerHTML = '';
        projects.forEach((project, i) => container.appendChild(createProjectCard(project, i)));
        initProjectFilter();
        renderSkills(projects);

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--accent-magenta);padding:3rem;">
            <p>⚠ ${currentLang === 'es' ? 'Error al cargar proyectos. Verifica que data/projects.json existe.' : 'Error loading projects. Check that data/projects.json exists.'}</p>
        </div>`;
    }
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-category', project.category || 'all');

    const title       = t(project, 'title');
    const description = t(project, 'description');
    const thumbnail   = project.thumbnail || (project.images && project.images[0]) || '';

    // Image / thumbnail
    const imageSection = document.createElement('div');
    imageSection.className = 'project-image';

    if (thumbnail) {
        const img = document.createElement('img');
        img.src = thumbnail;
        img.alt = title;
        img.loading = 'lazy';
        imageSection.appendChild(img);
    } else {
        const ph = document.createElement('div');
        ph.className = 'project-placeholder';
        ph.textContent = categoryIcon(project.category);
        imageSection.appendChild(ph);
    }

    // Status badge on image
    if (project.status) {
        const badge = document.createElement('span');
        badge.className = `card-status-badge badge-${project.status}`;
        badge.textContent = statusLabel(project.status);
        imageSection.appendChild(badge);
    }

    // Content
    const content = document.createElement('div');
    content.className = 'project-content';

    const catRow = document.createElement('div');
    catRow.className = 'project-category';
    catRow.innerHTML = `${project.category || ''}${project.year ? `<span class="project-year">· ${project.year}</span>` : ''}`;

    const titleEl = document.createElement('h3');
    titleEl.className = 'project-title';
    titleEl.textContent = title;

    const desc = document.createElement('p');
    desc.className = 'project-description';
    desc.textContent = description;

    const techContainer = document.createElement('div');
    techContainer.className = 'project-tech';
    (project.technologies || []).slice(0, 4).forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });

    const links = document.createElement('div');
    links.className = 'project-links';

    if (project.github) {
        links.appendChild(makeLink('⚡ GitHub', project.github));
    }
    if (project.demo) {
        links.appendChild(makeLink('◆ Demo', project.demo));
    }
    if (project.download) {
        links.appendChild(makeLink('▼ Download', project.download));
    }

    const detailBtn = document.createElement('a');
    detailBtn.className = 'project-link';
    detailBtn.href = '#';
    detailBtn.textContent = currentLang === 'es' ? '📖 Ver Detalles' : '📖 View Details';
    detailBtn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openProjectModal(project); });
    links.appendChild(detailBtn);

    content.append(catRow, titleEl, desc, techContainer, links);
    card.append(imageSection, content);
    card.addEventListener('click', () => openProjectModal(project));
    return card;
}

function makeLink(label, href) {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'project-link';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = label;
    a.addEventListener('click', e => e.stopPropagation());
    return a;
}

function categoryIcon(cat) {
    const icons = { unity: '🎮', godot: '🎮', web: '🌐', tools: '🛠️', jam: '⚡' };
    return icons[cat] || '🎮';
}

function statusLabel(status) {
    const labels = {
        es: { completed: 'Completado', jam: 'Game Jam', prototype: 'Prototipo', wip: 'En Desarrollo' },
        en: { completed: 'Completed',  jam: 'Game Jam', prototype: 'Prototype',  wip: 'In Progress' }
    };
    return (labels[currentLang] || labels.es)[status] || status;
}

// ==========================================
// PROJECT FILTER
// ==========================================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            projectCards.forEach(card => {
                const show = filter === 'all' || card.getAttribute('data-category') === filter;
                card.style.display = show ? 'block' : 'none';
                if (show) card.style.animation = 'fadeIn 0.5s ease both';
            });
        });
    });
}

// ==========================================
// PROJECT MODAL
// ==========================================
function initModal() {
    const modal = document.getElementById('projectModal');
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

function openProjectModal(project) {
    const modal    = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');

    // Collect all media items: video first, then images
    const media = [];
    if (project.video_url) {
        media.push({ type: 'video', url: project.video_url, label: currentLang === 'es' ? 'Trailer' : 'Trailer' });
    }
    (project.images || []).forEach((url, i) => {
        if (url) media.push({ type: 'image', url, label: `Screenshot ${i + 1}` });
    });
    if (!media.length && project.thumbnail) {
        media.push({ type: 'image', url: project.thumbnail, label: 'Main' });
    }

    const title       = t(project, 'title');
    const description = t(project, 'description');
    const fullDesc    = t(project, 'full_description');
    const devNotes    = t(project, 'development_notes');
    const features    = (currentLang === 'en' && project.features_en) ? project.features_en : (project.features || []);
    const duration    = t(project, 'duration');
    const role        = t(project, 'role');

    modalBody.innerHTML = buildModalHTML({ project, title, description, fullDesc, devNotes, features, duration, role, media });

    // Attach gallery logic after HTML is set
    if (media.length) {
        initGallery(media);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function buildModalHTML({ project, title, description, fullDesc, devNotes, features, duration, role, media }) {
    const L = currentLang;

    // Gallery HTML
    const galleryHTML = media.length ? `
        <div class="modal-gallery">
            <div class="gallery-main">
                <div class="gallery-main-media" id="galleryMainMedia">
                    ${mediaItemHTML(media[0])}
                </div>
                ${media.length > 1 ? `
                    <button class="gallery-nav gallery-nav-prev" id="galleryPrev">&#9664;</button>
                    <button class="gallery-nav gallery-nav-next" id="galleryNext">&#9654;</button>
                    <div class="gallery-counter" id="galleryCounter">1 / ${media.length}</div>
                ` : ''}
            </div>
            ${media.length > 1 ? `
                <div class="gallery-thumbs" id="galleryThumbs">
                    ${media.map((item, i) => `
                        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
                            ${item.type === 'video'
                                ? '<div class="gallery-thumb-icon">▶</div>'
                                : `<img src="${item.url}" alt="${item.label}" loading="lazy">`
                            }
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    ` : `
        <div class="modal-gallery">
            <div class="gallery-main">
                <div class="gallery-main-media">
                    <div class="gallery-placeholder-large">🎮</div>
                </div>
            </div>
        </div>
    `;

    // Meta row
    const metaItems = [];
    if (project.year)     metaItems.push(metaItem(L === 'es' ? 'Año' : 'Year', project.year));
    if (duration)         metaItems.push(metaItem(L === 'es' ? 'Duración' : 'Duration', duration));
    if (role)             metaItems.push(metaItem(L === 'es' ? 'Rol' : 'Role', role));
    if (project.platform?.length) {
        metaItems.push(`
            <div class="meta-item">
                <span class="meta-label">${L === 'es' ? 'Plataforma' : 'Platform'}</span>
                <div class="platform-tags">
                    ${project.platform.map(p => `<span class="platform-tag">${p}</span>`).join('')}
                </div>
            </div>
        `);
    }

    return `
        ${galleryHTML}
        <div class="modal-info">

            <div class="modal-header">
                <div class="modal-header-left">
                    <div class="modal-category">${project.category || ''}</div>
                    <h2 class="modal-title">${title}</h2>
                    ${project.status ? `<span class="status-badge ${project.status}">${statusLabelDirect(project.status)}</span>` : ''}
                </div>
            </div>

            ${metaItems.length ? `<div class="project-meta">${metaItems.join('')}</div>` : ''}

            <p class="modal-description">${description}</p>

            ${fullDesc ? `
                <div class="modal-section">
                    <div class="modal-section-title cyan">${L === 'es' ? 'Descripción Completa' : 'Full Description'}</div>
                    <div class="full-desc-box"><p class="modal-text">${fullDesc}</p></div>
                </div>
            ` : ''}

            ${devNotes ? `
                <div class="modal-section">
                    <div class="modal-section-title purple">${L === 'es' ? 'Notas de Desarrollo' : 'Development Notes'}</div>
                    <div class="dev-notes-box"><p class="modal-text">${devNotes}</p></div>
                </div>
            ` : ''}

            ${project.technologies?.length ? `
                <div class="modal-section">
                    <div class="modal-section-title cyan">${L === 'es' ? 'Tecnologías Utilizadas' : 'Technologies Used'}</div>
                    <div class="modal-tech-tags">
                        ${project.technologies.map(t => `<span class="modal-tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${features?.length ? `
                <div class="modal-section">
                    <div class="modal-section-title yellow">${L === 'es' ? 'Características Principales' : 'Key Features'}</div>
                    <ul class="features-list">
                        ${features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div class="modal-links">
                ${project.github   ? `<a href="${project.github}"   target="_blank" rel="noopener" class="modal-link-btn github">⚡ ${L === 'es' ? 'Ver en GitHub' : 'View on GitHub'}</a>` : ''}
                ${project.demo     ? `<a href="${project.demo}"     target="_blank" rel="noopener" class="modal-link-btn demo">◆ ${L === 'es' ? 'Jugar Demo' : 'Play Demo'}</a>` : ''}
                ${project.download ? `<a href="${project.download}" target="_blank" rel="noopener" class="modal-link-btn download">▼ ${L === 'es' ? 'Descargar' : 'Download'}</a>` : ''}
            </div>

        </div>
    `;
}

function metaItem(label, value) {
    return `<div class="meta-item"><span class="meta-label">${label}</span><span class="meta-value">${value}</span></div>`;
}

function mediaItemHTML(item) {
    if (!item) return '<div class="gallery-placeholder-large">🎮</div>';
    if (item.type === 'video') {
        return `<iframe src="${item.url}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
    }
    return `<img src="${item.url}" alt="${item.label || 'Screenshot'}">`;
}

function statusLabelDirect(status) {
    const labels = {
        es: { completed: '✓ Completado', jam: '⚡ Game Jam', prototype: '◈ Prototipo', wip: '… En Desarrollo' },
        en: { completed: '✓ Completed',  jam: '⚡ Game Jam', prototype: '◈ Prototype',  wip: '… In Progress' }
    };
    return (labels[currentLang] || labels.es)[status] || status;
}

// ==========================================
// GALLERY CAROUSEL
// ==========================================
function initGallery(media) {
    let current = 0;

    function show(index) {
        current = ((index % media.length) + media.length) % media.length;

        const mainMedia = document.getElementById('galleryMainMedia');
        const counter   = document.getElementById('galleryCounter');
        const thumbs    = document.querySelectorAll('.gallery-thumb');

        if (mainMedia) mainMedia.innerHTML = mediaItemHTML(media[current]);
        if (counter)   counter.textContent = `${current + 1} / ${media.length}`;
        thumbs.forEach((th, i) => th.classList.toggle('active', i === current));
    }

    document.getElementById('galleryPrev')?.addEventListener('click', () => show(current - 1));
    document.getElementById('galleryNext')?.addEventListener('click', () => show(current + 1));

    document.querySelectorAll('.gallery-thumb').forEach((th, i) => {
        th.addEventListener('click', () => show(i));
    });
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// SKILLS — auto-aggregated from project data
// ==========================================

const SKILL_GROUPS = [
    {
        label_es: 'Motores de Juego', label_en: 'Game Engines',
        techs: ['Unity', 'Godot', 'Unreal Engine', 'GameMaker Studio', 'Cocos2d', 'Defold']
    },
    {
        label_es: 'Lenguajes', label_en: 'Languages',
        techs: ['C#', 'C++', 'Python', 'JavaScript', 'TypeScript', 'GDScript', 'Lua', 'Java', 'Rust']
    },
    {
        label_es: 'Sistemas de Juego', label_en: 'Game Systems',
        techs: [
            'Physics2D', '2D Physics', 'NavMesh', 'A* Pathfinding', 'State Machines',
            'Behavior Trees', 'Procedural Generation', 'Raycasting', 'Object Pooling',
            'Particle System', 'Particle Systems', 'Cinemachine', 'FMOD',
            'FFT Audio Analysis', 'Audio Analysis', 'Level Design', 'AI'
        ]
    },
    {
        label_es: 'Herramientas & Assets', label_en: 'Tools & Assets',
        techs: [
            'Git', 'GitHub', 'Blender', 'Photoshop', 'Aseprite', 'Figma',
            'Tilemap', 'UI Toolkit', 'ScriptableObjects', 'JSON',
            'Mobile Optimization', 'WebGL', 'Shader Graph'
        ]
    },
];

function renderSkills(projects) {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    // Count how many projects use each technology
    const techCount = {};
    projects.forEach(p => {
        (p.technologies || []).forEach(tech => {
            techCount[tech] = (techCount[tech] || 0) + 1;
        });
    });

    if (!Object.keys(techCount).length) {
        container.innerHTML = `<p class="skills-empty">${currentLang === 'es' ? 'Agrega proyectos en data/projects.json para ver las habilidades.' : 'Add projects in data/projects.json to see skills.'}</p>`;
        return;
    }

    const usedTechs = new Set(Object.keys(techCount));
    const categorized = new Set();
    const groups = [];

    SKILL_GROUPS.forEach(group => {
        const matched = group.techs.filter(t => usedTechs.has(t));
        if (!matched.length) return;
        matched.forEach(t => categorized.add(t));
        groups.push({
            label: currentLang === 'en' ? group.label_en : group.label_es,
            skills: matched.map(t => ({ tech: t, count: techCount[t] }))
                          .sort((a, b) => b.count - a.count)
        });
    });

    // Techs not in any group go to "Otros"
    const others = [...usedTechs]
        .filter(t => !categorized.has(t))
        .map(t => ({ tech: t, count: techCount[t] }))
        .sort((a, b) => b.count - a.count);

    if (others.length) {
        groups.push({ label: currentLang === 'en' ? 'Other' : 'Otros', skills: others });
    }

    const projectWord = currentLang === 'es' ? 'proyecto' : 'project';

    container.innerHTML = groups.map(g => `
        <div class="skill-group">
            <h3 class="skill-group-title">${g.label}</h3>
            <div class="skill-tags">
                ${g.skills.map(({ tech, count }) => `
                    <div class="skill-tag" title="${count} ${projectWord}${count !== 1 ? 's' : ''}">
                        <span class="skill-tag-name">${tech}</span>
                        <span class="skill-tag-count">${count}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ==========================================
// ANIMATIONS (Intersection Observer)
// ==========================================
function initAnimations() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        }),
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('section').forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(30px)';
        s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(s);
    });

    const skillObserver = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) e.target.style.animation = 'progressLoad 1.5s ease-out forwards';
        }),
        { threshold: 0.5 }
    );
    document.querySelectorAll('.skill-progress').forEach(b => skillObserver.observe(b));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Console easter egg
console.log('%c¡Hola Developer! 👾', 'color:#00fff9;font-size:24px;font-weight:bold;');
console.log('%cSi estás leyendo esto, apreciamos el buen código. ¡Conectemos! 🚀', 'color:#ff006e;font-size:14px;');
