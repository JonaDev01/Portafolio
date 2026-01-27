// ==========================================
// ENHANCED JAVASCRIPT - Bilingual Portfolio
// Features: Language switching, project modals, filtering, particles
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
// NAVIGATION & SMOOTH SCROLLING
// ==========================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// BILINGUAL SYSTEM (ES/EN)
// ==========================================
let currentLang = 'es'; // Default language

function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const langOptions = document.querySelectorAll('.lang-option');
    
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        switchLanguage(newLang);
    });
    
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update lang options
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-es][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Reload projects with new language
    loadProjects();
}

// ==========================================
// PARTICLE SYSTEM FOR HERO
// ==========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? 'var(--accent-cyan)' : 'var(--accent-magenta)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// ==========================================
// PROJECT LOADING SYSTEM (Enhanced)
// ==========================================
async function loadProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    try {
        const response = await fetch('data/projects.json');
        
        if (!response.ok) {
            throw new Error('No se pudo cargar projects.json');
        }
        
        const data = await response.json();
        const projects = data.projects;
        
        if (projects.length === 0) {
            projectsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem;">
                    <p>${currentLang === 'es' ? 'No hay proyectos disponibles aún. ¡Pronto habrá más!' : 'No projects available yet. More coming soon!'}</p>
                </div>
            `;
            return;
        }
        
        // Clear container
        projectsContainer.innerHTML = '';
        
        // Render projects
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            projectsContainer.appendChild(projectCard);
        });
        
        // Initialize filter functionality
        initProjectFilter();
        
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        projectsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--accent-magenta); padding: 3rem;">
                <p>⚠ ${currentLang === 'es' ? 'Error al cargar proyectos. Verifica que el archivo data/projects.json existe.' : 'Error loading projects. Check that data/projects.json exists.'}</p>
            </div>
        `;
    }
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-category', project.category || 'all');
    
    // Get translated content
    const title = currentLang === 'en' && project.title_en ? project.title_en : project.title;
    const description = currentLang === 'en' && project.description_en ? project.description_en : project.description;
    
    // Create image section
    const imageSection = document.createElement('div');
    imageSection.className = 'project-image';
    
    if (project.image) {
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = title;
        img.loading = 'lazy';
        imageSection.appendChild(img);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'project-placeholder';
        placeholder.textContent = '🎮';
        imageSection.appendChild(placeholder);
    }
    
    // Create content section
    const content = document.createElement('div');
    content.className = 'project-content';
    
    // Category
    if (project.category) {
        const category = document.createElement('div');
        category.className = 'project-category';
        category.textContent = project.category;
        content.appendChild(category);
    }
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'project-title';
    titleEl.textContent = title;
    
    const descriptionEl = document.createElement('p');
    descriptionEl.className = 'project-description';
    descriptionEl.textContent = description;
    
    // Tech tags
    const techContainer = document.createElement('div');
    techContainer.className = 'project-tech';
    
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });
    
    // Links
    const linksContainer = document.createElement('div');
    linksContainer.className = 'project-links';
    
    if (project.github) {
        const githubLink = document.createElement('a');
        githubLink.href = project.github;
        githubLink.className = 'project-link';
        githubLink.target = '_blank';
        githubLink.innerHTML = '⚡ GitHub';
        githubLink.onclick = (e) => e.stopPropagation();
        linksContainer.appendChild(githubLink);
    }
    
    if (project.demo) {
        const demoLink = document.createElement('a');
        demoLink.href = project.demo;
        demoLink.className = 'project-link';
        demoLink.target = '_blank';
        demoLink.innerHTML = '◆ Demo';
        demoLink.onclick = (e) => e.stopPropagation();
        linksContainer.appendChild(demoLink);
    }
    
    // View details button
    const viewDetailsBtn = document.createElement('a');
    viewDetailsBtn.className = 'project-link';
    viewDetailsBtn.href = '#';
    viewDetailsBtn.textContent = currentLang === 'es' ? '📖 Ver Detalles' : '📖 View Details';
    viewDetailsBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openProjectModal(project);
    };
    linksContainer.appendChild(viewDetailsBtn);
    
    // Append all elements
    content.appendChild(titleEl);
    content.appendChild(descriptionEl);
    content.appendChild(techContainer);
    content.appendChild(linksContainer);
    
    card.appendChild(imageSection);
    card.appendChild(content);
    
    // Card click opens modal
    card.addEventListener('click', () => {
        openProjectModal(project);
    });
    
    return card;
}

// ==========================================
// PROJECT FILTERING
// ==========================================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.6s ease both';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================
// PROJECT MODAL SYSTEM
// ==========================================
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal on close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Get translated content
    const title = currentLang === 'en' && project.title_en ? project.title_en : project.title;
    const description = currentLang === 'en' && project.description_en ? project.description_en : project.description;
    const fullDescription = currentLang === 'en' && project.full_description_en ? project.full_description_en : project.full_description;
    
    // Build modal content
    modalBody.innerHTML = `
        <div style="margin-bottom: 2rem;">
            ${project.image ? `
                <img src="${project.image}" alt="${title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--border-radius-md); margin-bottom: 2rem;">
            ` : `
                <div style="width: 100%; height: 400px; background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue)); border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <span style="font-size: 6rem; opacity: 0.3;">🎮</span>
                </div>
            `}
            
            ${project.category ? `<div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 0.5rem;">${project.category}</div>` : ''}
            
            <h2 style="font-family: var(--font-display); font-size: 2.5rem; color: var(--text-primary); margin-bottom: 1rem; font-weight: 900;">${title}</h2>
            
            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem;">${description}</p>
            
            ${fullDescription ? `
                <div style="background: rgba(0, 255, 249, 0.05); border-left: 3px solid var(--accent-cyan); padding: 1.5rem; border-radius: var(--border-radius-sm); margin-bottom: 2rem;">
                    <h3 style="font-family: var(--font-display); color: var(--accent-cyan); margin-bottom: 1rem; font-size: 1.3rem;">${currentLang === 'es' ? 'Descripción Completa' : 'Full Description'}</h3>
                    <p style="color: var(--text-secondary); line-height: 1.8;">${fullDescription}</p>
                </div>
            ` : ''}
            
            <div style="margin-bottom: 2rem;">
                <h3 style="font-family: var(--font-display); color: var(--accent-cyan); margin-bottom: 1rem; font-size: 1.3rem;">${currentLang === 'es' ? 'Tecnologías Utilizadas' : 'Technologies Used'}</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.7rem;">
                    ${project.technologies.map(tech => `
                        <span style="background: rgba(0, 255, 249, 0.1); color: var(--accent-cyan); padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--accent-cyan); font-family: var(--font-mono); font-size: 0.9rem;">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            ${project.features ? `
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-family: var(--font-display); color: var(--accent-cyan); margin-bottom: 1rem; font-size: 1.3rem;">${currentLang === 'es' ? 'Características Principales' : 'Key Features'}</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${project.features.map(feature => {
                            const featureText = currentLang === 'en' && project.features_en ? project.features_en[project.features.indexOf(feature)] : feature;
                            return `<li style="color: var(--text-secondary); padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0; color: var(--accent-cyan);">▸</span>
                                ${featureText}
                            </li>`;
                        }).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 1rem; padding-top: 2rem; border-top: 2px solid rgba(0, 255, 249, 0.2); flex-wrap: wrap;">
                ${project.github ? `
                    <a href="${project.github}" target="_blank" style="padding: 1rem 2rem; background: var(--accent-cyan); color: var(--bg-primary); text-decoration: none; border-radius: var(--border-radius-sm); font-family: var(--font-display); font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; transition: var(--transition-fast);">
                        ⚡ ${currentLang === 'es' ? 'Ver en GitHub' : 'View on GitHub'}
                    </a>
                ` : ''}
                ${project.demo ? `
                    <a href="${project.demo}" target="_blank" style="padding: 1rem 2rem; background: var(--accent-magenta); color: white; text-decoration: none; border-radius: var(--border-radius-sm); font-family: var(--font-display); font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; transition: var(--transition-fast);">
                        ◆ ${currentLang === 'es' ? 'Ver Demo' : 'View Demo'}
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// ANIMATIONS & EFFECTS
// ==========================================
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Skill progress bars animation on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progressLoad 1.5s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c¡Hola Developer! 👾', 'color: #00fff9; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00fff9;');
console.log('%cIf you\'re reading this, you appreciate good code. Let\'s connect! 🚀', 'color: #ff006e; font-size: 14px;');
console.log('%cSi estás leyendo esto, aprecias el buen código. ¡Conectemos! 🚀', 'color: #ff006e; font-size: 14px;');
