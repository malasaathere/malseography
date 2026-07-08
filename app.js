/**
 * MONOCHROME HERITAGE PORTFOLIO LOGIC
 * Dynamic renders, Lenis smooth scrolling, GSAP ScrollTrigger animations, modals, and micro-interactions.
 */

function initApp() {

    // --- 1. ICONS & CORE ---
    if (window.lucide) window.lucide.createIcons();
    document.body.classList.remove("loading");

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
    const toolsContainer = document.getElementById("tools-container");
    if (toolsContainer) {
        toolsContainer.innerHTML = PORTFOLIO_DATA.tools.map(t => `
            <div class="tool-item">
                <div class="tool-info"><span class="tool-name">${t.name}</span><span class="tool-percent">${t.level}%</span></div>
                <div class="tool-progress-bg"><div class="tool-progress-fill" data-percent="${t.level}"></div></div>
            </div>`).join('');
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
            const L = i % 2 === 0;
            return `<div class="timeline-item ${L ? 'left-align' : 'right-align'}">
                <div class="timeline-marker"></div>
                    <div class="${isLeft ? 'timeline-left' : 'timeline-right'}">
                        <span class="timeline-year font-syne">${event.year}</span>
                        <h3 class="timeline-title font-syne">${event.title}</h3>
                        <div class="timeline-institution">${event.institution}</div>
                        <p class="timeline-desc">${event.description}</p>
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
            <div class="project-card" data-project-id="${p.id}">
                <div class="project-image-box"><img src="${p.image}" alt="${p.title}" class="project-image" loading="lazy"></div>
                <div class="project-info">
                    <div class="project-meta">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
                    <h3 class="project-card-title font-syne">${p.title}</h3>
                    <p class="project-card-desc">${p.description}</p>
                </div></div>`).join('');
        gsap.fromTo(".project-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
        document.querySelectorAll(".project-card").forEach(card =>
            card.addEventListener("click", () => openProjectDetails(parseInt(card.getAttribute("data-project-id")))));
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
        const catMap = { uiux: "UI/UX Design", graphic: "Graphic Design", video: "Video Editing", photography: "Photography" };
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
    if (emailBox && emailAddr && copyStatus) emailBox.addEventListener("click", () => {
        navigator.clipboard.writeText(emailAddr.innerText).then(() => {
            copyStatus.innerText = "COPIED!"; emailBox.style.borderColor = "var(--text-primary)";
            const ic = emailBox.querySelector(".copy-icon");
            if (ic && window.lucide) { ic.setAttribute("data-lucide", "check"); window.lucide.createIcons(); }
            setTimeout(() => {
                copyStatus.innerText = "CLICK TO COPY"; emailBox.style.borderColor = "var(--border-subtle)";
                if (ic && window.lucide) { ic.setAttribute("data-lucide", "copy"); window.lucide.createIcons(); }
            }, 2000);
        }).catch(e => console.error(e));
    });

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
        let easedMX = -9999, easedMY = -9999;
        let patternReady = false;

        const patCanvas = document.createElement('canvas');
        const patCtx = patCanvas.getContext('2d');
        const bufCanvas = document.createElement('canvas');
        const bufCtx = bufCanvas.getContext('2d');

        // Load background image
        const bgImg = new Image();
        bgImg.src = 'assets/images/background.png';
        bgImg.onload = () => {
            patternReady = true;
            resize();
        };

        function buildPattern() {
            if (!patternReady) return;

            patCanvas.width = W;
            patCanvas.height = H;
            patCtx.clearRect(0, 0, W, H);

            // Render the repeating pattern at its original size (scale = 1.0)
            const scale = 0.2;

            // Create repeating pattern
            const pattern = patCtx.createPattern(bgImg, 'repeat');
            if (pattern) {
                try {
                    const matrix = new DOMMatrix();
                    pattern.setTransform(matrix.scale(scale));
                } catch (e) {
                    console.warn("DOMMatrix setTransform not supported");
                }
            }

            // Draw repeating pattern to patCanvas with grayscale + silver/white color grading
            patCtx.save();
            patCtx.filter = 'grayscale(100%) brightness(1.3) contrast(1.6)';
            patCtx.fillStyle = pattern || '#000';
            patCtx.fillRect(0, 0, W, H);
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
            ctx.scale(dpr, dpr);
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

            // Initialize eased mouse position on first frame or if cursor enters
            if (easedMX < -1000) {
                easedMX = mouseX < -1000 ? W / 2 : mouseX;
                easedMY = mouseY < -1000 ? H / 2 : mouseY;
            }

            // Ease cursor coordinates for ultra-smooth movement
            easedMX += (mouseX - easedMX) * EASE_SPEED;
            easedMY += (mouseY - easedMY) * EASE_SPEED;

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
