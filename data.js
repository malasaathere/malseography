/**
 * CENTRALIZED PORTFOLIO DATA STORE (Source of Truth)
 * Edit this file to update details, add projects, modify skills, or adjust timeline events.
 */

const PORTFOLIO_DATA = {
    personal: {
        name: "MALSEOGRAPHY",
        title: "Welcome to Maleesha's Universe",
        email: "smrajasooriya@gmail.com",
        tagline: "Bridging Sri Lankan heritage and modern digital creativity.",
        socials: [
            { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
            { name: "Behance", url: "https://behance.net", icon: "briefcase" },
            { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
            { name: "YouTube", url: "https://youtube.com", icon: "youtube" },
            { name: "GitHub", url: "https://github.com", icon: "github" }
        ]
    },

    assets: {
        logo: "assets/images/logo.png"
    },

    site: {
        brand: "HERITAGE.DIGITAL",
        title: "Creative Portfolio | Traditional Roots, Digital Expression"
    },

    skills: [
        {
            id: "uiux",
            title: "UI/UX Design",
            description: "Designing human-centered digital experiences that merge structural logic with premium visual aesthetics.",
            icon: "layout",
            focus: [
                "User Research & Mapping",
                "Wireframing & Interactive Prototyping",
                "Figma Design Systems",
                "Information Architecture",
                "Usability & Accessibility (a11y) Audits"
            ]
        },
        {
            id: "graphic",
            title: "Graphic Design",
            description: "Crafting bold brand identities, minimalist marketing collateral, and high-impact visual statements, including dynamic event flyers.",
            icon: "pen-tool",
            focus: [
                "Brand Strategy & Logo Design", 
                "Visual Identity Systems",
                "Editorial & Poster Layouts",
                "Digital Artwork & Composition",
                "Monochrome Color Harmonies"
            ]
        },
        {
            id: "video",
            title: "Video Editing",
            description: "Directing pacing, motion, sound, and color to weave compelling cinematic narratives, utilizing industry-standard tools like Premiere Pro and After Effects.",
            icon: "video",
            focus: [
                "Cinematic Video Editing & Teaser Scripting",
                "Motion Graphics",
                "Professional Color Grading",
                "Sound Design & Spatial Audio Mix",
                "Pacing & Story Development"
            ]
        },
        {
            id: "photography",
            title: "Photography",
            description: "Capturing light, structure, and human emotion through a minimalist and high-contrast lens, operating professional Sony and Fujifilm systems.",
            icon: "camera",
            focus: [
                "Fine-Art Portraiture",
                "Cinematic Event Documentation",
                "Landscape & Architectural Composition",
                "Lighting & Studio Setup",
                "Creative Conceptual Photography",
                "Professional Photo Editing"
            ]
        }
    ],

    tools: [
        { name: "Figma", category: "Design", level: 80 },
        { name: "Adobe Photoshop", category: "Design", level: 90 },
        { name: "Adobe Premiere Pro", category: "Video", level: 90 },
        { name: "Adobe After Effects", category: "Video", level: 80 },
        { name: "DaVinci Resolve", category: "Video", level: 60 },
        { name: "Studio Gear & Lighting", category: "Photography", level: 85 },
        { name: "Capture One / Lightroom", category: "Photography", level: 85 }
    ],

    journey: [
        {
            year: "2026 - Present",
            title: "Assistant Media Director",
            institution: "Industrial Management Science Students' Association - University of Kelaniya",
            description: "Spearheading the overall media strategy, visual identity, and cinematic storytelling for the student body within the Department of Industrial Management. Overseeing digital content creation and strategic campaign execution."
        },
        {
            year: "2025 - Present",
            title: "UI/UX Designer & Systems Developer",
            institution: "University of Kelaniya - ideasprint 2025 & Independent Projects",
            description: "Led the UI/UX design and interactive prototyping for the \"CeyLink\" project, securing a finalist position in the IdeaSprint 2025 intra-departmental hackathon. Independently developed multiple design systems and digital tools."
        },
        {
            year: "2025 - 2026",
            title: "Media Coordinator for Level 1",
            institution: "Industrial Management Science Students' Association - University of Kelaniya",
            description: "Handled foundational media tasks, digital content creation, and visual communication strategies to support departmental events and ongoing student body initiatives prior to promotion."
        },
        {
            year: "2025 - Present",
            title: "Undergraduate Innovator & Event Coordinator",
            institution: "Department of Industrial Management - Faculty of Science - University of Kelaniya",
            description: "Pursuing studies merging industrial management with software development and cybersecurity protocols. Provided technical support for intra-departmental AI meetups and workshops."
        }
    ],

    projects: [
        {
            id: 1,
            title: "Heladiva Digital Identity",
            category: "uiux",
            image: "assets/images/project1.png",
            description: "A cultural exploration platform transforming traditional Sri Lankan visual history into an immersive digital archive.",
            tags: ["Figma", "UX Research", "Design System"],
            details: {
                problem: "Traditional cultural historical knowledge is scattered, inaccessible, and poorly presented to the modern generation, creating a disconnect from cultural heritage.",
                requirements: "Develop a highly interactive, responsive mobile and desktop platform that preserves ancient artworks, scriptures, and architecture digitally, adhering strictly to accessibility standards.",
                approach: "Conducted user research and designed a low-contrast dark-mode interface with subtle glowing elements. Incorporated custom SVG line drawings based on traditional wood carving patterns.",
                outcome: "An award-winning platform that saw a 45% increase in user engagement and high praise from regional historical societies. The interface makes exploration feel cinematic and educational."
            }
        },
        {
            id: 2,
            title: "Minimalist Ceylon Branding",
            category: "graphic",
            image: "assets/images/project2.png",
            description: "Visual identity and editorial system for a luxury heritage brand inspired by ancient architecture.",
            tags: ["Identity", "Typography", "Editorial"],
            details: {
                problem: "Premium brands often struggle to reflect cultural heritage without looking cluttered, old-fashioned, or visually busy.",
                requirements: "Create a modern, luxury brand system that feels rooted in ancient heritage but appeals to contemporary, global consumers.",
                approach: "Extracted the geometric shapes from historical Sigiriya wall art and merged them with strict minimalist layouts. Used high-contrast serif typography paired with textured backgrounds.",
                outcome: "A premium visual identity including custom packaging, stationary, and editorial books that redefined the brand's perception in high-end international markets."
            }
        },
        {
            id: 3,
            title: "Strokes of Patience",
            category: "video",
            image: "assets/images/project3.png",
            description: "A short documentary film profiling traditional craftspeople in Sri Lankan villages.",
            tags: ["After Effects", "Color Grading", "Sound Mix"],
            details: {
                problem: "Traditional craftspeople are disappearing, and static imagery fails to capture the immense patience, precision, and human story behind their craftsmanship.",
                requirements: "Document the tactile, sound, and visual environment of rural pottery and wood carving artists, creating an emotional and immersive narrative.",
                approach: "Filmed in high-definition monochrome to emphasize light and texture. Focused on sound design—the scraping of clay, carving of wood, breathing of the artisan—to build rhythm and intimacy.",
                outcome: "Selected for multiple regional short film festivals. Praised for its editing rhythm, deep rich blacks, and poignant, minimalist narrative structure."
            }
        },
        {
            id: 4,
            title: "Shadows of Sigiriya",
            category: "photography",
            image: "assets/images/project4.png",
            description: "A fine-art monochrome photography series capturing the dramatic play of light and stone on historical monuments.",
            tags: ["Fine Art", "Monochrome", "Composition"],
            details: {
                problem: "Famous historical spots are frequently over-photographed, losing their mysterious and emotional aura in typical bright, saturated tourist imagery.",
                requirements: "Reveal the geometric precision, scale, and textures of ancient stone monoliths from an original artistic angle.",
                approach: "Utilized high-contrast black-and-white photography, shoot during twilight hours to harness low-angle shadows. Emphasized clean horizontal lines and cloud textures.",
                outcome: "Exhibited in leading galleries in Colombo. The prints were praised for their extreme detail, dramatic tonal range, and structural visual balance."
            }
        },
        {
            id: 5,
            title: "Liyawela Design Lab App",
            category: "uiux",
            image: "assets/images/project5.png",
            description: "Mobile app workspace for designers to customize and license vectorized heritage vectors.",
            tags: ["iOS Design", "UI Kits", "Prototyping"],
            details: {
                problem: "Designers looking for high-quality, authentic cultural design vectors have to rely on cheap stock imagery that lacks historical precision.",
                requirements: "Build a sleek mobile interface where artists can drag, edit, combine, and license authentic SVG vectors easily.",
                approach: "Created a tactile canvas workspace UI with floating popovers and dark-mode aesthetics. Added vector preview overlays with responsive touch controls.",
                outcome: "Launched a fully functional interactive prototype in Figma that secured pre-seed funding for development, praise for its interface cleanliness and ease of navigation."
            }
        },
        {
            id: 6,
            title: "The Monolith Series Posters",
            category: "graphic",
            image: "assets/images/project6.png",
            description: "A series of high-impact posters combining modernist architecture elements with traditional motifs.",
            tags: ["Poster Art", "Layout", "Heritage"],
            details: {
                problem: "Creating promotional visual assets that bridge ancient stone carving motifs and sleek modern architecture is visually challenging.",
                requirements: "Design three posters for an architectural seminar that visually fuse heritage and modernity without visual noise.",
                approach: "Juxtaposed geometric concrete arches with detailed, hand-carved stone motifs (SVGs). Kept layout text highly structured using monospaced fonts.",
                outcome: "Generated widespread public engagement and became collector items, establishing a distinct visual language for the seminar series."
            }
        }
    ]
};

export default PORTFOLIO_DATA;
