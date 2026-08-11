/**
 * MONOCHROME HERITAGE PORTFOLIO LOGIC
 * Dynamic renders, Lenis smooth scrolling, GSAP ScrollTrigger animations, modals, and micro-interactions.
 */

function initApp() {

    // --- 1. ICONS & CORE ---
    if (window.lucide) window.lucide.createIcons();
    document.body.classList.remove("loading");

    // --- 1.a Apply configurable site data (logo, brand, title, email) ---
    try {
        if (window.PORTFOLIO_DATA) {
            // Page title
            if (PORTFOLIO_DATA.site && PORTFOLIO_DATA.site.title) document.title = PORTFOLIO_DATA.site.title;
            // Logo images (header and preloader)
            const logoPath = PORTFOLIO_DATA.assets && PORTFOLIO_DATA.assets.logo ? PORTFOLIO_DATA.assets.logo : null;
            if (logoPath) {
                document.querySelectorAll('.site-logo, .preloader-logo').forEach(img => { if (img) img.src = logoPath; });
            }
            // Header brand text
            const brandEl = document.querySelector('.logo-text');
            if (brandEl && PORTFOLIO_DATA.site && PORTFOLIO_DATA.site.brand) brandEl.textContent = PORTFOLIO_DATA.site.brand;
            // Email copy
            const emailAddr = document.getElementById('email-addr');
            if (emailAddr && PORTFOLIO_DATA.personal && PORTFOLIO_DATA.personal.email) emailAddr.textContent = PORTFOLIO_DATA.personal.email;
        }
    } catch (e) { console.warn('Applying site data failed', e); }

    // --- 2. LENIS SMOOTH SCROLL ---
    const lenis = new Lenis({
        duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical', gestureDirection: 'vertical',
        smooth: true, mouseMultiplier: 1, smoothTouch: false, touchMultiplier: 2, infinite: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    const header = document.querySelector(".main-header");
    window.addEventListener("scroll", () => {
        header.style.padding = window.scrollY > 50 ? "1.2rem 0" : "2.4rem 0";
        header.style.backgroundColor = window.scrollY > 50 ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.8)";
    });
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id !== '#') { const t = document.querySelector(id); if (t) lenis.scrollTo(t, { offset: -80, duration: 1.2 }); }
        });
    });

    // --- 2.1 INTERACTIVE AMBIENT ACCENT ---
    (function initInteractiveLotus() {
        const lotus = document.getElementById('lotus-background');
        const starfield = document.getElementById('interactive-stars');
        if (!lotus || !starfield) return;

        starfield.innerHTML = Array.from({ length: 62 }, (_, index) => {
            const left = (index * 37 + 11) % 97;
            const top = (index * 61 + 7) % 94;
            const size = 1 + (index % 3) * 0.55;
            const alpha = 0.16 + (index % 5) * 0.045;
            return `<span class="interactive-star" style="left:${left}%;top:${top}%;--star-size:${size}px;--star-alpha:${alpha}"></span>`;
        }).join('');

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let fallingStarTimer = 0;

        function createFallingStar() {
            if (document.hidden || starfield.querySelectorAll('.falling-star').length >= 3) return;

            const star = document.createElement('span');
            star.className = 'falling-star';
            const startLeft = 8 + Math.random() * 78;
            const startTop = 4 + Math.random() * 56;
            const travelX = 120 + Math.random() * 260;
            const travelY = 90 + Math.random() * 210;
            const duration = 1.6 + Math.random() * 1.4;
            const angle = Math.atan2(travelY, travelX) * 180 / Math.PI;

            star.style.setProperty('--fall-left', `${startLeft.toFixed(1)}%`);
            star.style.setProperty('--fall-top', `${startTop.toFixed(1)}%`);
            star.style.setProperty('--fall-x', `${travelX.toFixed(0)}px`);
            star.style.setProperty('--fall-y', `${travelY.toFixed(0)}px`);
            star.style.setProperty('--fall-duration', `${duration.toFixed(2)}s`);
            star.style.setProperty('--tail-length', `${(35 + Math.random() * 55).toFixed(0)}px`);
            star.style.setProperty('--tail-angle', `${angle.toFixed(1)}deg`);
            starfield.appendChild(star);
            star.addEventListener('animationend', () => star.remove(), { once: true });
        }

        function scheduleFallingStar() {
            window.clearTimeout(fallingStarTimer);
            fallingStarTimer = window.setTimeout(() => {
                const burstCount = Math.random() < 0.5 ? 2 : 3;
                for (let index = 0; index < burstCount; index++) {
                    window.setTimeout(createFallingStar, index * (140 + Math.random() * 140));
                }
                scheduleFallingStar();
            }, 3500 + Math.random() * 5500);
        }

        scheduleFallingStar();
        window.addEventListener('pagehide', () => window.clearTimeout(fallingStarTimer), { once: true });

        let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
        let targetRotate = 0, currentRotate = 0;
        let targetScale = 1.04, currentScale = 1.04;
        let targetLight = 1, currentLight = 1;
        let initialPinchDistance = 0, initialPinchScale = 1.04;

        const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
        const touchDistance = touches => Math.hypot(
            touches[0].clientX - touches[1].clientX,
            touches[0].clientY - touches[1].clientY
        );

        window.addEventListener('pointermove', event => {
            if (event.pointerType === 'touch') return;
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            targetX = nx * -28;
            targetY = ny * -18;
            targetRotate = nx * 0.22;
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
            targetX = 0;
            targetY = 0;
            targetRotate = 0;
            targetScale = 1.04;
            targetLight = 1;
        }, { passive: true });

        window.addEventListener('touchstart', event => {
            if (event.touches.length === 2) {
                initialPinchDistance = touchDistance(event.touches);
                initialPinchScale = targetScale;
            }
        }, { passive: true });

        window.addEventListener('touchmove', event => {
            if (event.touches.length === 1) {
                const touch = event.touches[0];
                const nx = touch.clientX / window.innerWidth - 0.5;
                const ny = touch.clientY / window.innerHeight - 0.5;
                targetX = clamp(nx * -30, -18, 18);
                targetY = clamp(ny * -22, -13, 13);
                targetRotate = nx * 0.28;
            } else if (event.touches.length === 2 && initialPinchDistance) {
                const pinchRatio = touchDistance(event.touches) / initialPinchDistance;
                targetScale = clamp(initialPinchScale * pinchRatio, 1.01, 1.12);
            }
        }, { passive: true });

        window.addEventListener('touchend', event => {
            if (event.touches.length < 2) initialPinchDistance = 0;
            if (event.touches.length === 0) {
                targetX = 0;
                targetY = 0;
                targetRotate = 0;
                targetScale = 1.04;
                targetLight = 1;
            }
        }, { passive: true });

        window.setTimeout(() => lotus.classList.add('is-bloomed'), 260);

        function animateLotus() {
            currentX += (targetX - currentX) * 0.055;
            currentY += (targetY - currentY) * 0.055;
            currentRotate += (targetRotate - currentRotate) * 0.05;
            currentScale += (targetScale - currentScale) * 0.06;
            currentLight += (targetLight - currentLight) * 0.05;
            starfield.style.setProperty('--star-x', `${currentX.toFixed(2)}px`);
            starfield.style.setProperty('--star-y', `${currentY.toFixed(2)}px`);
            starfield.style.setProperty('--star-rotate', `${currentRotate.toFixed(3)}deg`);
            requestAnimationFrame(animateLotus);
        }

        requestAnimationFrame(animateLotus);
    }());

    // --- 2.5 ABOUT LENSES ---
    const lensesContainer = document.getElementById("about-lenses-container");
    if (lensesContainer && PORTFOLIO_DATA.about && PORTFOLIO_DATA.about.lenses) {
        lensesContainer.innerHTML = PORTFOLIO_DATA.about.lenses.map(lens => `
            <div class="about-lens">
                <h4 class="about-lens-title font-syne">${lens.title}</h4>
                <p class="about-lens-desc">${lens.description}</p>
            </div>
        `).join('');
    }

    // --- 3. SKILLS ---
    const skillsContainer = document.getElementById("skills-container");
    if (skillsContainer) skillsContainer.innerHTML = PORTFOLIO_DATA.skills.map(s => `
        <div class="skill-card" data-skill-id="${s.id}">
            <div class="skill-icon-box"><i data-lucide="${s.icon}" style="width:32px;height:32px;"></i></div>
            <h3 class="skill-card-title font-syne">${s.title}</h3>
            <p class="skill-card-desc">${s.description}</p>
            <ul class="skill-focus-list">${s.focus.map(f => `<li class="skill-focus-item"><span class="skill-focus-dot"></span><span>${f}</span></li>`).join('')}</ul>
        </div>`).join('');

    // --- 4. TOOLS ---
    const CUSTOM_TOOL_ICONS = {
        "figma": `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;color:var(--text-muted);"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/></svg>`,
        "premierepro": `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;color:var(--text-muted);"><path d="M10.15 8.42a2.93 2.93 0 00-1.18-.2 13.9 13.9 0 00-1.09.02v3.36l.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03a1.45 1.45 0 00-.93-1.46zM19.75.3H4.25A4.25 4.25 0 000 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.09 11.65c-.4.56-.96.98-1.61 1.22-.68.25-1.43.34-2.25.34l-.5-.01-.43-.01v3.21a.12.12 0 01-.11.14H5.82c-.08 0-.12-.04-.12-.13V6.42c0-.07.03-.11.1-.11l.56-.01.76-.02.87-.02.91-.01c.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.15.42.23.85.23 1.3 0 .86-.2 1.57-.6 2.13zm6.82-3.15v1.95c0 .08-.05.11-.16.11a4.35 4.35 0 00-1.92.37c-.19.09-.37.21-.51.37v5.1c0 .1-.04.14-.13.14h-1.97a.14.14 0 01-.16-.12v-5.58l-.01-.75-.02-.78c0-.23-.02-.45-.04-.68a.1.1 0 01.07-.11h1.78c.1 0 .18.07.2.16a3.03 3.03 0 01.13.92c.3-.35.67-.64 1.08-.86a3.1 3.1 0 011.52-.39c.07-.01.13.04.14.11v.04z"/></svg>`,
        "davinci": `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;color:var(--text-muted);"><path d="M17.621 0 5.977.004c-1.37 0-2.756.345-3.762 1.11a4.925 4.925 0 0 0-1.61 2.003C.233 3.93 0 5.02 0 5.951l.012 12.2c.002 1.604.479 3.057 1.461 4.112.984 1.056 2.462 1.683 4.331 1.691L16.856 24c1.26.005 3.095-.036 4.303-.714 1.075-.605 2.025-1.556 2.497-2.984.278-.84.345-2.084.344-3.147l-.021-11.13c-.002-.888-.15-2.023-.547-2.934-.425-.976-1.181-1.815-2.322-2.425C20.353.26 19.123 0 17.622 0zm0 .93c1.378 0 2.538.295 3.04.565.977.523 1.544 1.166 1.889 1.96.315.721.47 1.793.473 2.572l.018 11.13c.002 1.013-.097 2.257-.298 2.86-.396 1.202-1.146 1.946-2.063 2.462-.814.457-2.612.593-3.82.588l-11.05-.044c-1.657-.007-2.832-.534-3.626-1.386-.792-.851-1.212-2.06-1.212-3.485L.999 5.95c0-.829.196-1.827.474-2.437.345-.757.75-1.207 1.365-1.674C3.585 1.27 4.868.97 6.08.97zm-5.66 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864zm4.172 7.922a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001zm-8.432.038a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z"/></svg>`,
        "lightroom": `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;color:var(--text-muted);"><path d="M19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-6.99 16.389c0 .051-.029.09-.06.121-.03.02-.06.029-.101.029H6.26c-.11 0-.16-.061-.16-.18V6.44c-.01-.07.04-.13.11-.14h2c.05-.01.11.03.11.08v8.43h4.62c.101 0 .131.049.11.14l-.29 1.739zm6.25-7.859v1.95c0 .08-.05.11-.16.11-.649-.04-1.3.08-1.89.34-.2.09-.39.21-.54.37v5.1c0 .1-.04.14-.13.14h-1.95c-.08.01-.15-.04-.16-.119V11.14c0-.24 0-.49-.01-.75s-.01-.52-.02-.78c-.01-.22-.03-.44-.061-.66-.01-.05.02-.1.07-.11.01-.01.02-.01.04 0h1.75c.1 0 .18.07.21.16.04.07.07.15.08.23.02.1.039.21.05.31.01.11.021.23.021.36.299-.35.66-.64 1.069-.86.46-.25.97-.37 1.49-.36.069-.01.13.04.14.11.001.01.001.02.001.04z"/></svg>`,
        "photoshop": `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;color:var(--text-muted);"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 18V6h3.5a3 3 0 010 6H7"/><path d="M18.5 12.5c-.5-.5-1-.5-2-.5-1 0-1.5.5-1.5 1 0 1 3 1 3 2 0 1-.5 2-1.5 2-1 0-2-.5-2-1"/></svg>`,
        "aftereffects": `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;vertical-align:middle;color:var(--text-muted);"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M5 18l4-12 4 12m-1.5-4h-5"/><path d="M18.5 16.5c-.5 1-1.5 1.5-2.5 1.5-2 0-3-1.5-3-3s1-3 3-3 3 1.5 3 3H13"/></svg>`
    };

    const toolsContainer = document.getElementById("tools-container");
    if (toolsContainer) {
        toolsContainer.innerHTML = PORTFOLIO_DATA.tools.map(t => `
            <div class="tool-item">
                <div class="tool-info"><span class="tool-name">${CUSTOM_TOOL_ICONS[t.icon] || `<i data-lucide="${t.icon}" style="width:16px;height:16px;margin-right:8px;vertical-align:middle;color:var(--text-muted);"></i>`}${t.name}</span><span class="tool-percent">${t.level}%</span></div>
                <div class="tool-progress-bg"><div class="tool-progress-fill" data-percent="${t.level}"></div></div>
            </div>`).join('');
        if (window.lucide) window.lucide.createIcons();
        gsap.utils.toArray(".tool-progress-fill").forEach(f =>
            gsap.to(f, {
                scaleX: f.getAttribute("data-percent") / 100,
                scrollTrigger: { trigger: f, start: "top 95%", toggleActions: "play none none none" }
            }));
    }

    // --- 5. TIMELINE ---
    const timelineEvents = document.getElementById("timeline-events");
    if (timelineEvents) {
        timelineEvents.innerHTML = PORTFOLIO_DATA.timeline.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return `<div class="timeline-item ${isLeft ? 'left-align' : 'right-align'}">
                <div class="timeline-marker"></div>
                    <div class="${isLeft ? 'timeline-left' : 'timeline-right'}">
                        <span class="timeline-year font-syne">${ev.year}</span>
                        <h3 class="timeline-title font-syne">${ev.title}</h3>
                        <div class="timeline-institution">${ev.institution}</div>
                        <p class="timeline-desc">${ev.description}</p>
                    </div>
                </div>
            `;
        }).join('');

        // GSAP Timeline animation
        gsap.to(".timeline-line-fill", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 60%",
                end: "bottom 60%",
                scrub: true
            }
        });
        gsap.utils.toArray(".timeline-item").forEach(item => ScrollTrigger.create({
            trigger: item, start: "top 60%", end: "bottom 60%",
            onEnter: () => item.classList.add("active"), onLeaveBack: () => item.classList.remove("active"),
            onEnterBack: () => item.classList.add("active"), onLeave: () => item.classList.remove("active")
        }));
    }

    // --- 6. PROJECTS ---
    const projectsContainer = document.getElementById("projects-container");
    const modal = document.getElementById("project-modal");
    const modalContent = document.getElementById("modal-content-body");
    const modalClose = document.querySelector(".modal-close");

    function renderProjects(filter = "all") {
        if (!projectsContainer) return;
        const list = filter === "all" ? PORTFOLIO_DATA.projects : PORTFOLIO_DATA.projects.filter(p => p.category === filter);
        projectsContainer.innerHTML = list.map(p => `
            <div class="project-card" data-project-id="${p.id}" tabindex="0" role="button" aria-label="View project details: ${p.title}">
                <div class="project-image-box"><img src="${p.image}" alt="${p.title}" class="project-image" loading="lazy"></div>
                <div class="project-info">
                    <div class="project-meta">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
                    <h3 class="project-card-title font-syne">${p.title}</h3>
                    <p class="project-card-desc">${p.description}</p>
                </div></div>`).join('');
        gsap.fromTo(".project-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
        document.querySelectorAll(".project-card").forEach(card => {
            const id = parseInt(card.getAttribute("data-project-id"));
            card.addEventListener("click", () => openProjectDetails(id));
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openProjectDetails(id);
                }
            });
        });
    }
    renderProjects();
    document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        renderProjects(this.getAttribute("data-filter"));
    }));

    function openProjectDetails(id) {
        const p = PORTFOLIO_DATA.projects.find(x => x.id === id);
        if (!p || !modal || !modalContent) return;
        const catMap = { uiux: "UI/UX Design", graphic: "Graphic Design", video: "Video Editing", photography: "Photography", software: "Software Engineering", cybersecurity: "Cybersecurity & Networking" };
        modalContent.innerHTML = `
            <span class="modal-project-cat font-syne">${catMap[p.category] || ''}</span>
            <h2 class="modal-project-title font-syne">${p.title}</h2>
            <div class="modal-image-wrapper"><img src="${p.image}" alt="${p.title}" class="modal-image"></div>
            <div class="modal-section-grid">
                <div class="modal-block"><span class="modal-label">The Problem</span><p class="modal-body-text">${p.details.problem}</p></div>
                <div class="modal-block"><span class="modal-label">User Needs &amp; Constraints</span><p class="modal-body-text">${p.details.requirements}</p></div>
            </div>
            <div class="modal-section-grid">
                <div class="modal-block"><span class="modal-label">Design Strategy &amp; Creative Process</span><p class="modal-body-text">${p.details.approach}</p></div>
                <div class="modal-block"><span class="modal-label">Final Outcome</span><p class="modal-body-text">${p.details.outcome}</p></div>
            </div>
            <div class="modal-footer">${p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}</div>`;
        modal.classList.add("active"); modal.setAttribute("aria-hidden", "false"); lenis.stop();
    }
    function closeModal() { if (!modal) return; modal.classList.remove("active"); modal.setAttribute("aria-hidden", "true"); lenis.start(); }
    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && modal?.classList.contains("active")) closeModal(); });

    // --- 6.5 CODE & REPOSITORIES ---
    const reposContainer = document.getElementById("repos-container");
    if (reposContainer && PORTFOLIO_DATA.repos) {
        reposContainer.innerHTML = PORTFOLIO_DATA.repos.map(repo => `
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-card">
                <div class="repo-card-header">
                    <i data-lucide="folder-git-2" style="width:24px;height:24px;" class="repo-icon"></i>
                    <i data-lucide="arrow-up-right" style="width:16px;height:16px;" class="repo-arrow"></i>
                </div>
                <h3 class="repo-card-title font-syne">${repo.title}</h3>
                <p class="repo-card-desc">${repo.description}</p>
                <span class="repo-link-text font-syne">View on GitHub →</span>
            </a>
        `).join('');
        if (window.lucide) window.lucide.createIcons();
    }

    // --- 7. (Hero motif is now integrated into full-site blooming background) ---

    // --- 8. COPY EMAIL ---
    const emailBox = document.getElementById("email-click-box"), emailAddr = document.getElementById("email-addr"), copyStatus = document.getElementById("copy-status");
    const handleEmailCopy = () => {
        navigator.clipboard.writeText(emailAddr.innerText).then(() => {
            copyStatus.innerText = "COPIED!"; emailBox.style.borderColor = "var(--text-primary)";
            const ic = emailBox.querySelector(".copy-icon");
            if (ic && window.lucide) { ic.setAttribute("data-lucide", "check"); window.lucide.createIcons(); }
            setTimeout(() => {
                copyStatus.innerText = "CLICK TO COPY"; emailBox.style.borderColor = "var(--border-subtle)";
                if (ic && window.lucide) { ic.setAttribute("data-lucide", "copy"); window.lucide.createIcons(); }
            }, 2000);
        }).catch(e => console.error(e));
    };

    if (emailBox && emailAddr && copyStatus) {
        emailBox.addEventListener("click", handleEmailCopy);
        emailBox.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleEmailCopy();
            }
        });
    }

    // --- 9. SOCIAL LINKS ---
    const SI = {
        instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
        briefcase: `<i data-lucide="briefcase" style="width:18px;height:18px;"></i>`,
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
        youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>`,
        github: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`
    };
    const slg = document.getElementById("social-links-grid");
    if (slg) { slg.innerHTML = PORTFOLIO_DATA.personal.socials.map(s => `<a href="${s.url}" class="social-item font-syne" target="_blank" rel="noopener noreferrer">${SI[s.icon] || `<i data-lucide="${s.icon}" style="width:18px;height:18px;"></i>`}<span>${s.name}</span></a>`).join(''); if (window.lucide) window.lucide.createIcons(); }

    // --- 10. MOBILE NAV ---
    const toggleBtn = document.querySelector(".mobile-nav-toggle"), mobileOverlay = document.querySelector(".mobile-nav-overlay"), mobileLinks = document.querySelectorAll(".mobile-link");
    function toggleMobileNav() { toggleBtn.classList.toggle("active"); mobileOverlay.classList.toggle("active"); mobileOverlay.classList.contains("active") ? lenis.stop() : lenis.start(); }
    if (toggleBtn && mobileOverlay) {
        toggleBtn.addEventListener("click", toggleMobileNav);
        mobileLinks.forEach(link => link.addEventListener("click", () => { const id = link.getAttribute("href"); toggleMobileNav(); setTimeout(() => { const t = document.querySelector(id); if (t) lenis.scrollTo(t, { offset: -80, duration: 1.2 }); }, 300); }));
    }

    // --- 11. SCROLL REVEALS ---
    gsap.utils.toArray(".scroll-reveal").forEach(el => gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }));
    gsap.utils.toArray(".section-title,.section-subtitle,.section-desc").forEach(el => gsap.fromTo(el, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }));

    // --- 11.5 ABOUT LENSES SCROLL REVEAL ---
    gsap.utils.toArray(".about-lens").forEach((el, i) => gsap.fromTo(el, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, delay: i * 0.15, scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }));

    // --- 11.6 REPO CARDS SCROLL REVEAL ---
    gsap.utils.toArray(".repo-card").forEach((el, i) => gsap.fromTo(el, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } }));


    // ═══════════════════════════════════════════════════════════════════════════
    //  12. FULL-SITE BLOOMING LOTUS & LIYAWELA PATTERN ENGINE (SILVER / WHITE)
    //
    //  Procedurally generates and animates traditional Sri Lankan Lotus & Liyawela
    //  blooming patterns across the entire website background. Includes scroll
    //  parallax, dynamic petal unfurling, cursor spotlight awakening, and
    //  interactive sprouting floret trails.
    // ═══════════════════════════════════════════════════════════════════════════
    (function initBloomingBackground() {

        const canvas = document.getElementById('canvas-bg');
        if (!canvas) return;
        if (window.getComputedStyle(canvas).display === 'none') return;
        const ctx = canvas.getContext('2d');

        const useRefinedAmbient = false;
        if (useRefinedAmbient) {
        // Refined ambient background: a calm, non-repeating light field that
        // supports the content instead of competing with it.
        (function setupAmbientField() {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let width = 0;
            let height = 0;
            let pixelRatio = 1;
            let pointerX = 0;
            let pointerY = 0;
            let softX = 0;
            let softY = 0;
            let frameId = 0;

            const lights = Array.from({ length: 22 }, (_, index) => ({
                x: ((index * 47) % 101) / 100,
                y: ((index * 71 + 13) % 103) / 102,
                radius: 0.45 + ((index * 19) % 55) / 100,
                alpha: 0.05 + ((index * 11) % 12) / 100,
                drift: 0.00005 + ((index * 7) % 8) / 100000,
                phase: index * 0.83
            }));

            function fitCanvas() {
                width = window.innerWidth;
                height = window.innerHeight;
                pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width = Math.round(width * pixelRatio);
                canvas.height = Math.round(height * pixelRatio);
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                if (!pointerX && !pointerY) {
                    pointerX = softX = width * 0.72;
                    pointerY = softY = height * 0.28;
                }
            }

            function paint(time = 0) {
                const seconds = time * 0.001;
                softX += (pointerX - softX) * 0.025;
                softY += (pointerY - softY) * 0.025;

                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#030303';
                ctx.fillRect(0, 0, width, height);

                const topGlow = ctx.createRadialGradient(
                    width * 0.78, height * 0.12, 0,
                    width * 0.78, height * 0.12, Math.max(width, height) * 0.72
                );
                topGlow.addColorStop(0, 'rgba(255,255,255,0.075)');
                topGlow.addColorStop(0.38, 'rgba(160,166,176,0.025)');
                topGlow.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = topGlow;
                ctx.fillRect(0, 0, width, height);

                const pointerGlow = ctx.createRadialGradient(
                    softX, softY, 0, softX, softY, Math.min(width, height) * 0.42
                );
                pointerGlow.addColorStop(0, 'rgba(255,255,255,0.035)');
                pointerGlow.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = pointerGlow;
                ctx.fillRect(0, 0, width, height);

                lights.forEach((light) => {
                    const driftX = reduceMotion ? 0 : Math.sin(seconds * 0.12 + light.phase) * 16;
                    const driftY = reduceMotion ? 0 : Math.cos(seconds * 0.09 + light.phase) * 12;
                    const shimmer = reduceMotion ? 0.7 : 0.55 + Math.sin(seconds * 0.35 + light.phase) * 0.2;
                    ctx.beginPath();
                    ctx.arc(light.x * width + driftX, light.y * height + driftY, light.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255,255,255,${light.alpha * shimmer})`;
                    ctx.fill();
                });

                const vignette = ctx.createRadialGradient(
                    width * 0.5, height * 0.45, Math.min(width, height) * 0.12,
                    width * 0.5, height * 0.45, Math.max(width, height) * 0.72
                );
                vignette.addColorStop(0, 'rgba(0,0,0,0)');
                vignette.addColorStop(0.7, 'rgba(0,0,0,0.18)');
                vignette.addColorStop(1, 'rgba(0,0,0,0.72)');
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, width, height);

                if (!reduceMotion) frameId = requestAnimationFrame(paint);
            }

            window.addEventListener('resize', fitCanvas, { passive: true });
            window.addEventListener('pointermove', (event) => {
                pointerX = event.clientX;
                pointerY = event.clientY;
            }, { passive: true });

            fitCanvas();
            paint();

            window.addEventListener('pagehide', () => cancelAnimationFrame(frameId), { once: true });
        }());

        return;
        }

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let W = 0, H = 0, dpr = 1;
        let mouseX = -9999, mouseY = -9999;
        let easedMX = null, easedMY = null;
        let scrollY = 0;
        let lastSpawnTime = 0;

        // Interactive sprouting micro-blooms
        const spawnedBlooms = [];
        // Floating ambient starlight spores
        const spores = [];

        // ── Major Section Bloom Anchors across the entire site ──────────────────
        const majorBlooms = [
            // Hero Top-Right Primary Lotus (Where the old hero motif was, now part of the living cosmos)
            { relX: 0.78, relY: 0.32, radius: 340, rot: 0, rotSpeed: 0.0006, scrollSpeed: 0.08, baseBloom: 0.95, phase: 0.0, currentBloom: 0.95 },
            // Hero Top-Left Ambient Motif
            { relX: 0.12, relY: 0.18, radius: 210, rot: 0.8, rotSpeed: -0.0005, scrollSpeed: 0.12, baseBloom: 0.85, phase: 1.2, currentBloom: 0.85 },
            // Story / About Section Bloom
            { relX: 0.16, relY: 0.52, radius: 290, rot: 1.5, rotSpeed: 0.0005, scrollSpeed: 0.15, baseBloom: 0.88, phase: 2.1, currentBloom: 0.88 },
            // Expertise / Skills Section Bloom
            { relX: 0.84, relY: 0.68, radius: 260, rot: 2.2, rotSpeed: -0.0007, scrollSpeed: 0.18, baseBloom: 0.85, phase: 3.4, currentBloom: 0.85 },
            // Timeline / Experience Ambient Bloom
            { relX: 0.50, relY: 0.85, radius: 320, rot: 0.4, rotSpeed: 0.0004, scrollSpeed: 0.22, baseBloom: 0.90, phase: 4.5, currentBloom: 0.90 },
            // Projects Section Bloom
            { relX: 0.14, relY: 0.38, radius: 270, rot: 2.8, rotSpeed: 0.0006, scrollSpeed: 0.25, baseBloom: 0.88, phase: 5.2, currentBloom: 0.88 },
            // Code & Contact Section Bloom
            { relX: 0.82, relY: 0.76, radius: 300, rot: 1.1, rotSpeed: -0.0005, scrollSpeed: 0.28, baseBloom: 0.92, phase: 6.0, currentBloom: 0.92 }
        ];

        // Initialize 36 ambient floating spores
        for (let i = 0; i < 36; i++) {
            spores.push({
                x: Math.random(),
                y: Math.random(),
                size: Math.random() * 1.6 + 0.8,
                speedX: (Math.random() - 0.5) * 0.0003,
                speedY: (Math.random() - 0.5) * 0.0003,
                phase: Math.random() * Math.PI * 2,
                baseAlpha: Math.random() * 0.35 + 0.15
            });
        }

        // ── Parametric Lotus / Liyawela Bloom Vector Renderer ──────────────────
        function drawBloomMotif(ctx, cx, cy, radius, progress, rotation, baseAlpha, glowMult = 0) {
            if (progress <= 0.01 || baseAlpha <= 0.003) return;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rotation);

            const r = radius;
            const p = Math.min(1, Math.max(0, progress));
            const alpha = Math.min(1, baseAlpha * (0.35 + 0.65 * p));

            // Soft radial silver glow aura behind active / hovered blooms
            if (glowMult > 0.03) {
                const glowR = r * (0.75 + 0.45 * p);
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
                grad.addColorStop(0.0, `rgba(255, 255, 255, ${0.14 * glowMult})`);
                grad.addColorStop(0.35, `rgba(255, 255, 255, ${0.06 * glowMult})`);
                grad.addColorStop(0.75, `rgba(255, 255, 255, ${0.015 * glowMult})`);
                grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, glowR, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.035})`;
            ctx.lineWidth = Math.max(0.75, 1.25 * (r / 220));
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // 1. Center Core Seed Ring
            const coreR = r * 0.0625 * Math.min(1, p * 3);
            if (coreR > 0.4) {
                ctx.beginPath();
                ctx.arc(0, 0, coreR, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fill();

                // Core starlight center pip
                ctx.beginPath();
                ctx.arc(0, 0, coreR * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
                ctx.fill();
            }

            // 2. Inner Mandala Ring
            if (p > 0.08) {
                const pRing1 = Math.min(1, (p - 0.08) / 0.28);
                const r1 = r * 0.20 * pRing1;
                ctx.beginPath();
                ctx.arc(0, 0, r1, 0, Math.PI * 2);
                ctx.stroke();
            }

            // 3. Middle Ring with 16 Sacred Geometry Notches
            if (p > 0.18) {
                const pRing2 = Math.min(1, (p - 0.18) / 0.3);
                const r2 = r * 0.30 * pRing2;
                ctx.beginPath();
                ctx.arc(0, 0, r2, 0, Math.PI * 2);
                ctx.stroke();

                if (p > 0.32) {
                    const dotAlpha = alpha * Math.min(1, (p - 0.32) / 0.25);
                    ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
                    for (let i = 0; i < 16; i++) {
                        const ang = (i * Math.PI * 2) / 16;
                        ctx.beginPath();
                        ctx.arc(Math.cos(ang) * r2, Math.sin(ang) * r2, Math.max(0.8, 1.2 * (r / 250)), 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // 4. Primary Lotus Petals (8 symmetrical unfolding petals)
            if (p > 0.14) {
                const pPetal1 = Math.min(1, (p - 0.14) / 0.45);
                const petalTip = r * 0.33 * pPetal1;
                const petalWidth = r * 0.085 * pPetal1;

                for (let i = 0; i < 8; i++) {
                    const ang = (i * Math.PI * 2) / 8;
                    ctx.save();
                    ctx.rotate(ang);

                    ctx.beginPath();
                    ctx.moveTo(0, -coreR);
                    ctx.bezierCurveTo(petalWidth * 1.25, -petalTip * 0.38, petalWidth * 0.95, -petalTip * 0.82, 0, -petalTip);
                    ctx.bezierCurveTo(-petalWidth * 0.95, -petalTip * 0.82, -petalWidth * 1.25, -petalTip * 0.38, 0, -coreR);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.03})`;
                    ctx.fill();
                    ctx.stroke();

                    // Central petal rib / spine
                    if (pPetal1 > 0.4) {
                        ctx.beginPath();
                        ctx.moveTo(0, -coreR * 1.3);
                        ctx.lineTo(0, -petalTip * 0.85);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
                        ctx.stroke();
                    }

                    ctx.restore();
                }
            }

            // 5. Secondary Outer Lotus Petals (Offset by 22.5 deg)
            if (p > 0.28) {
                const pPetal2 = Math.min(1, (p - 0.28) / 0.46);
                const outerTip = r * 0.49 * pPetal2;
                const outerW = r * 0.125 * pPetal2;
                const baseR = r * 0.20;

                for (let i = 0; i < 8; i++) {
                    const ang = (i * Math.PI * 2) / 8 + Math.PI / 8;
                    ctx.save();
                    ctx.rotate(ang);

                    ctx.beginPath();
                    ctx.moveTo(0, -baseR);
                    ctx.bezierCurveTo(outerW * 1.45, -baseR - outerTip * 0.28, outerW * 0.85, -outerTip * 0.86, 0, -outerTip);
                    ctx.bezierCurveTo(-outerW * 0.85, -outerTip * 0.86, -outerW * 1.45, -baseR - outerTip * 0.28, 0, -baseR);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.025})`;
                    ctx.fill();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
                    ctx.stroke();

                    // Side curl lobes on outer petals
                    if (pPetal2 > 0.5) {
                        ctx.beginPath();
                        ctx.moveTo(outerW * 0.55, -baseR - outerTip * 0.35);
                        ctx.quadraticCurveTo(outerW * 1.15, -baseR - outerTip * 0.48, outerW * 0.35, -outerTip * 0.72);
                        ctx.moveTo(-outerW * 0.55, -baseR - outerTip * 0.35);
                        ctx.quadraticCurveTo(-outerW * 1.15, -baseR - outerTip * 0.48, -outerW * 0.35, -outerTip * 0.72);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.35})`;
                        ctx.stroke();
                    }

                    ctx.restore();
                }
            }

            // 6. Traditional Sri Lankan Liyawela Spiraling Vines (4 Quadrants)
            if (p > 0.42) {
                const pVine = Math.min(1, (p - 0.42) / 0.58);

                for (let i = 0; i < 4; i++) {
                    const ang = (i * Math.PI * 2) / 4;
                    ctx.save();
                    ctx.rotate(ang);

                    const y0 = -r * 0.30;
                    ctx.beginPath();
                    ctx.moveTo(0, y0);

                    const cp1x = r * 0.20 * pVine, cp1y = (-r * 0.35) * pVine + y0 * (1 - pVine);
                    const cp2x = r * 0.30 * pVine, cp2y = -r * 0.55 * pVine;
                    const p1x = r * 0.25 * pVine,  p1y = -r * 0.70 * pVine;
                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p1x, p1y);

                    if (pVine > 0.35) {
                        const cp3x = r * 0.20 * pVine,  cp3y = -r * 0.85 * pVine;
                        const cp4x = 0,                cp4y = -r * 0.85 * pVine;
                        const p2x = -r * 0.05 * pVine, p2y = -r * 0.70 * pVine;
                        ctx.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, p2x, p2y);

                        if (pVine > 0.65) {
                            const cp5x = -r * 0.10 * pVine, cp5y = -r * 0.55 * pVine;
                            const cp6x = r * 0.05 * pVine,  cp6y = -r * 0.45 * pVine;
                            const p3x = r * 0.125 * pVine,  p3y = -r * 0.45 * pVine;
                            ctx.bezierCurveTo(cp5x, cp5y, cp6x, cp6y, p3x, p3y);

                            const cp7x = r * 0.175 * pVine, cp7y = -r * 0.45 * pVine;
                            const cp8x = r * 0.225 * pVine, cp8y = -r * 0.525 * pVine;
                            const p4x = r * 0.20 * pVine,   p4y = -r * 0.60 * pVine;
                            ctx.bezierCurveTo(cp7x, cp7y, cp8x, cp8y, p4x, p4y);
                        }
                    }
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
                    ctx.stroke();

                    // Decorative vine sprout leaves
                    if (pVine > 0.55) {
                        const leafAlpha = alpha * Math.min(1, (pVine - 0.55) / 0.45);
                        ctx.beginPath();
                        ctx.moveTo(r * 0.14 * pVine, -r * 0.44 * pVine);
                        ctx.quadraticCurveTo(r * 0.27 * pVine, -r * 0.41 * pVine, r * 0.24 * pVine, -r * 0.51 * pVine);
                        ctx.quadraticCurveTo(r * 0.17 * pVine, -r * 0.49 * pVine, r * 0.14 * pVine, -r * 0.44 * pVine);
                        ctx.fillStyle = `rgba(255, 255, 255, ${leafAlpha * 0.04})`;
                        ctx.fill();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${leafAlpha * 0.75})`;
                        ctx.stroke();
                    }

                    ctx.restore();
                }
            }

            // 7. Celestial Accent Bursts & Star Rays
            if (p > 0.68) {
                const pBurst = Math.min(1, (p - 0.68) / 0.32);
                const burstLen = r * 0.09 * pBurst;
                const bAlpha = alpha * pBurst;

                for (let i = 0; i < 8; i++) {
                    const ang = (i * Math.PI * 2) / 8;
                    const startR = r * (0.86 + 0.05 * (i % 2));
                    ctx.save();
                    ctx.rotate(ang);
                    ctx.beginPath();
                    ctx.moveTo(0, -startR);
                    ctx.lineTo(0, -startR - burstLen);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${bAlpha * 0.8})`;
                    ctx.stroke();

                    if (pBurst > 0.65) {
                        ctx.beginPath();
                        ctx.arc(0, -startR - burstLen - 2, 1.4, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${bAlpha})`;
                        ctx.fill();
                    }

                    ctx.restore();
                }
            }

            ctx.restore();
        }

        // ── Resize Canvas ──────────────────────────────────────────────────────
        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            if (ctx.setTransform) {
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            } else {
                ctx.scale(dpr, dpr);
            }
        }

        window.addEventListener('resize', resize);
        window.addEventListener('scroll', () => { scrollY = window.scrollY || 0; }, { passive: true });

        // Mouse tracking
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Sprout delicate floret trails on cursor movement
            const now = performance.now();
            if (now - lastSpawnTime > 90) {
                lastSpawnTime = now;
                if (spawnedBlooms.length < 24) {
                    spawnedBlooms.push({
                        x: mouseX,
                        y: mouseY,
                        radius: Math.random() * 28 + 22,
                        rot: Math.random() * Math.PI * 2,
                        rotSpeed: (Math.random() - 0.5) * 0.015,
                        birthTime: now,
                        lifeDuration: 2200
                    });
                }
            }
        }, { passive: true });

        window.addEventListener('touchmove', e => {
            if (e.touches?.[0]) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        }, { passive: true });

        // Click / Tap shockwave bloom
        window.addEventListener('click', e => {
            const now = performance.now();
            spawnedBlooms.push({
                x: e.clientX,
                y: e.clientY,
                radius: Math.random() * 45 + 75,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.02,
                birthTime: now,
                lifeDuration: 3200,
                isMajor: true
            });
        });

        // ── Main Render Frame Loop ─────────────────────────────────────────────
        function draw(timestamp) {
            // Pure rich black canvas
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, W, H);

            const time = timestamp * 0.001;

            // Ease cursor coordinates for smooth cinematic spotlight
            const targetX = mouseX < -1000 ? W / 2 : mouseX;
            const targetY = mouseY < -1000 ? H / 2 : mouseY;

            if (easedMX === null) {
                easedMX = targetX;
                easedMY = targetY;
            }
            easedMX += (targetX - easedMX) * 0.08;
            easedMY += (targetY - easedMY) * 0.08;

            // ── 1. Subtle Background Tapestry Mesh across the whole site ────────
            const gridSpacingX = 260;
            const gridSpacingY = 240;
            const cols = Math.ceil(W / gridSpacingX) + 2;
            const rows = Math.ceil(H / gridSpacingY) + 2;

            for (let r = -1; r < rows; r++) {
                for (let c = -1; c < cols; c++) {
                    const gx = c * gridSpacingX + ((r % 2) * (gridSpacingX / 2));
                    const gy = r * gridSpacingY - (scrollY * 0.04 % gridSpacingY);

                    const dx = gx - easedMX;
                    const dy = gy - easedMY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const proximityGlow = Math.max(0, 1 - dist / 320);

                    const baseAlpha = 0.035 + proximityGlow * 0.18;
                    const floretBloom = 0.65 + 0.35 * Math.sin(time * 0.8 + c * 1.5 + r * 2.0);
                    const rot = time * 0.05 + c + r;

                    drawBloomMotif(ctx, gx, gy, 48 + proximityGlow * 16, floretBloom, rot, baseAlpha, proximityGlow);

                    // Delicate connecting geometric lines between nearby grid florets
                    if (c < cols - 1 && proximityGlow > 0.05) {
                        const nextGx = (c + 1) * gridSpacingX + (((r) % 2) * (gridSpacingX / 2));
                        ctx.beginPath();
                        ctx.moveTo(gx, gy);
                        ctx.lineTo(nextGx, gy);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + proximityGlow * 0.08})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // ── 2. Floating Ambient Starlight Spores ────────────────────────────
            for (let i = 0; i < spores.length; i++) {
                const s = spores[i];
                if (!prefersReduced) {
                    s.x = (s.x + s.speedX + 1) % 1;
                    s.y = (s.y + s.speedY + 1) % 1;
                }
                const sx = s.x * W;
                const sy = (s.y * H - (scrollY * 0.06)) % H;
                const actualY = sy < 0 ? sy + H : sy;

                const shimmer = Math.sin(time * 1.5 + s.phase) * 0.5 + 0.5;
                const sporeAlpha = s.baseAlpha * shimmer;

                ctx.beginPath();
                ctx.arc(sx, actualY, s.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${sporeAlpha})`;
                ctx.fill();
            }

            // ── 3. Major Blooming Nodes across Whole Site ───────────────────────
            for (let i = 0; i < majorBlooms.length; i++) {
                const b = majorBlooms[i];
                const bx = b.relX * W;
                // Vertical position with parallax scroll offset
                const rawY = b.relY * H - (scrollY * b.scrollSpeed);
                const by = ((rawY % (H * 2)) + (H * 2)) % (H * 1.2) - (H * 0.1);

                if (!prefersReduced) {
                    b.rot += b.rotSpeed;
                }

                // Breathing oscillation
                const breathe = Math.sin(time * 0.7 + b.phase) * 0.04;
                const targetBloom = Math.min(1, b.baseBloom + breathe);
                b.currentBloom += (targetBloom - b.currentBloom) * 0.05;

                // Cursor proximity awakening
                const distToCursor = Math.hypot(bx - easedMX, by - easedMY);
                const spotlight = Math.max(0, 1 - distToCursor / 420);
                const activeAlpha = 0.12 + spotlight * 0.65;
                const activeGlow = spotlight * 1.5;

                drawBloomMotif(ctx, bx, by, b.radius * (1 + spotlight * 0.08), b.currentBloom, b.rot, activeAlpha, activeGlow);
            }

            // ── 4. Interactive Sprouting Floret Trail ───────────────────────────
            const now = performance.now();
            for (let i = spawnedBlooms.length - 1; i >= 0; i--) {
                const sb = spawnedBlooms[i];
                const age = now - sb.birthTime;
                if (age > sb.lifeDuration) {
                    spawnedBlooms.splice(i, 1);
                    continue;
                }

                const progress = age / sb.lifeDuration;
                // Unfurl bloom quickly in first 30%, hold, then gently fade
                const bloomProgress = Math.min(1, progress * 3.2);
                const fadeAlpha = progress < 0.25 ? progress / 0.25 : (1 - progress) / 0.75;
                const sbAlpha = (sb.isMajor ? 0.75 : 0.45) * fadeAlpha;

                sb.rot += sb.rotSpeed;
                drawBloomMotif(ctx, sb.x, sb.y, sb.radius, bloomProgress, sb.rot, sbAlpha, sb.isMajor ? 1.2 : 0.6);
            }
        }

        function loop(timestamp) {
            draw(timestamp);
            requestAnimationFrame(loop);
        }

        // Bootstrap
        resize();
        requestAnimationFrame(loop);

    }());
    // ─── end blooming lotus background ────────────────────────────────────────
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// Ensure preloader is removed once all resources are loaded
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => { try { preloader.remove(); } catch (e) { /* ignore */ } }, 700);
    }
});
