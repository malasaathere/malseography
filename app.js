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

    // --- 7. HERO SVG ---
    const heroSvg = document.getElementById("hero-svg");
    if (heroSvg) {
        const paths = [
            { d: "M400,400 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0", class: "center-core" },
            { d: "M400,400 m-80,0 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0", class: "ring-inner" },
            { d: "M400,400 m-120,0 a120,120 0 1,0 240,0 a120,120 0 1,0 -240,0", class: "ring-outer" },
            { d: "M400,320 C420,350 420,380 400,400 C380,380 380,350 400,320 Z", class: "petal" },
            { d: "M400,480 C420,450 420,420 400,400 C380,420 380,450 400,480 Z", class: "petal" },
            { d: "M480,400 C450,420 420,420 400,400 C420,380 450,380 480,400 Z", class: "petal" },
            { d: "M320,400 C350,420 380,420 400,400 C380,380 350,380 320,400 Z", class: "petal" },
            { d: "M456,344 C460,375 440,390 400,400 C410,360 425,340 456,344 Z", class: "petal" },
            { d: "M344,456 C340,425 360,410 400,400 C390,440 375,460 344,456 Z", class: "petal" },
            { d: "M456,456 C425,460 410,440 400,400 C440,410 460,425 456,456 Z", class: "petal" },
            { d: "M344,344 C375,340 390,410 400,400 C360,390 340,375 344,344 Z", class: "petal" },
            { d: "M400,280 C480,260 520,180 500,120 C480,60 400,60 380,120 C360,180 420,220 450,220 C470,220 490,190 480,160 C470,130 440,140 430,160", class: "vine" },
            { d: "M400,520 C320,540 280,620 300,680 C320,740 400,740 420,680 C440,620 380,580 350,580 C330,580 310,610 320,640 C330,670 360,660 370,640", class: "vine" },
            { d: "M520,400 C540,480 620,520 680,500 C740,480 740,400 680,380 C620,360 580,420 580,450 C580,470 610,490 640,480 C670,470 660,440 640,430", class: "vine" },
            { d: "M280,400 C260,320 180,280 120,300 C60,320 60,400 120,420 C180,440 220,380 220,350 C220,330 190,310 160,320 C130,330 140,360 160,370", class: "vine" },
            { d: "M400,40 L400,10", class: "accent-burst" }, { d: "M400,760 L400,790", class: "accent-burst" },
            { d: "M40,400 L10,400", class: "accent-burst" }, { d: "M760,400 L790,400", class: "accent-burst" }
        ];
        heroSvg.innerHTML = paths.map(p => `<path d="${p.d}" class="${p.class}"/>`).join('');
        const sp = heroSvg.querySelectorAll("path");
        sp.forEach(p => { const l = p.getTotalLength(); p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
        gsap.to(sp, {
            strokeDashoffset: 0, duration: 2, stagger: 0.05, ease: "power1.inOut",
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 30%", scrub: 1.2 }
        });
        ScrollTrigger.create({
            trigger: "#hero", start: "top -5%",
            onEnter: () => heroSvg.classList.add("glow"), onLeaveBack: () => heroSvg.classList.remove("glow")
        });
    }

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
    //  12. IMAGE-BASED BOTANICAL BACKGROUND (SILVER/WHITE)
    //
    //  Loads assets/images/background.png directly, desaturates and grades it
    //  to a silver-white color profile, and applies a multi-pass spotlight
    //  glow effect tracking the eased cursor.
    // ═══════════════════════════════════════════════════════════════════════════
    (function initBackground() {

        const canvas = document.getElementById('canvas-bg');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // ── Config ─────────────────────────────────────────────────────────────
        const SPOTLIGHT_R = 360;       // px — cursor spotlight radius
        const BASE_ALPHA = 0.015;      // Ambient pattern brightness (0.015 = nearly invisible at rest)
        const EASE_SPEED = 0.06;      // Cursor lag (lower = smoother cinematic drag)
        // ──────────────────────────────────────────────────────────────────────

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let W = 0, H = 0, dpr = 1;
        let mouseX = -9999, mouseY = -9999;
        let easedMX = null, easedMY = null;
        let patternReady = false;

        const patCanvas = document.createElement('canvas');
        const patCtx = patCanvas.getContext('2d');
        const bufCanvas = document.createElement('canvas');
        const bufCtx = bufCanvas.getContext('2d');

        // Load background image
        const bgImg = new Image();
        bgImg.onload = () => {
            patternReady = true;
            resize();
        };
        bgImg.src = 'assets/images/background.png';

        function buildPattern() {
            if (!patternReady) return;

            patCanvas.width = W;
            patCanvas.height = H;
            patCtx.clearRect(0, 0, W, H);

            // Cover-fit: scale image to fill canvas like CSS background-size: cover
            const imgW = bgImg.naturalWidth;
            const imgH = bgImg.naturalHeight;
            const scale = Math.max(W / imgW, H / imgH);
            const drawW = imgW * scale;
            const drawH = imgH * scale;
            const drawX = (W - drawW) / 2;
            const drawY = (H - drawH) / 2;

            // Draw image to patCanvas with grayscale + silver/white color grading
            patCtx.save();
            patCtx.filter = 'grayscale(100%) brightness(1.3) contrast(1.6)';
            patCtx.drawImage(bgImg, drawX, drawY, drawW, drawH);
            patCtx.restore();
        }

        // ── Resize ────────────────────────────────────────────────────────────
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
            bufCanvas.width = W;
            bufCanvas.height = H;
            buildPattern();
        }

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        window.addEventListener('touchmove', e => {
            if (e.touches?.[0]) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        }, { passive: true });

        window.addEventListener('resize', resize);

        // ── Draw frame ────────────────────────────────────────────────────────
        function draw() {
            // Perfect solid black background
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, W, H);

            if (!patternReady) return;

            if (prefersReduced) {
                // Dim static fallback
                ctx.globalAlpha = BASE_ALPHA;
                ctx.drawImage(patCanvas, 0, 0);
                ctx.globalAlpha = 1;
                return;
            }

            // Ease cursor coordinates for ultra-smooth movement
            let targetX = mouseX < -1000 ? W / 2 : mouseX;
            let targetY = mouseY < -1000 ? H / 2 : mouseY;
            
            if (easedMX === null) {
                easedMX = targetX;
                easedMY = targetY;
            }
            
            easedMX += (targetX - easedMX) * EASE_SPEED;
            easedMY += (targetY - easedMY) * EASE_SPEED;

            // ── Layer A: Dim ambient background (barely visible at rest) ──────────
            if (BASE_ALPHA > 0) {
                ctx.save();
                ctx.globalAlpha = BASE_ALPHA;
                ctx.drawImage(patCanvas, 0, 0);
                ctx.restore();
            }

            // ── Layer B: Spotlight reveal (reveals pattern in silver/white) ──────
            // Step 1: Draw full pattern to buffer
            bufCtx.clearRect(0, 0, W, H);
            bufCtx.drawImage(patCanvas, 0, 0);

            // Step 2: Mask buffer to a soft radial spotlight near the eased cursor
            const mask = bufCtx.createRadialGradient(easedMX, easedMY, 0, easedMX, easedMY, SPOTLIGHT_R);
            mask.addColorStop(0.00, 'rgba(0,0,0,1.00)');
            mask.addColorStop(0.25, 'rgba(0,0,0,0.96)');
            mask.addColorStop(0.55, 'rgba(0,0,0,0.65)');
            mask.addColorStop(0.80, 'rgba(0,0,0,0.18)');
            mask.addColorStop(1.00, 'rgba(0,0,0,0.00)');

            bufCtx.globalCompositeOperation = 'destination-in';
            bufCtx.fillStyle = mask;
            bufCtx.fillRect(0, 0, W, H);
            bufCtx.globalCompositeOperation = 'source-over';

            // Step 3: Draw blurred bloom layer (screen composite for additive glow)
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.filter = 'blur(16px) brightness(1.5)';
            ctx.globalAlpha = 0.55;
            ctx.drawImage(bufCanvas, 0, 0);
            ctx.restore();

            // Step 4: Draw mid-glow layer (for volumetric richness)
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.filter = 'blur(4px) brightness(1.2)';
            ctx.globalAlpha = 0.40;
            ctx.drawImage(bufCanvas, 0, 0);
            ctx.restore();

            // Step 5: Draw sharp, crisp pattern details on top
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.filter = 'none';
            ctx.globalAlpha = 0.95;
            ctx.drawImage(bufCanvas, 0, 0);
            ctx.restore();
        }

        function loop() {
            draw();
            requestAnimationFrame(loop);
        }

        // Bootstrap
        resize();
        loop();

    }());
    // ─── end botanical background ─────────────────────────────────────────────
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
