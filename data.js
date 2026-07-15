/**
 * CENTRALIZED PORTFOLIO DATA STORE (Source of Truth)
 * Edit this file to update details, add projects, modify skills, or adjust timeline events.
 */

const PORTFOLIO_DATA = {
    personal: {
        name: "MALSEOGRAPHY",
        fullName: "MALEESHA RAJASOORIYA",
        title: "Welcome to Maleesha's Universe",
        email: "smrajasooriya@gmail.com",
        tagline: "Obsessed with the process. Destined for the progress.",
        heroSubtitle: "Creating digital experiences through design, motion, and visual storytelling, backed by secure and robust software architecture.",
        socials: [
            { name: "GitHub", url: "https://github.com/malasaathere", icon: "github" },
            { name: "Behance", url: "https://behance.net", icon: "briefcase" },
            { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
            { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
            { name: "YouTube", url: "https://youtube.com", icon: "youtube" }
        ]
    },

    assets: {
        logo: "assets/images/logo.png"
    },

    site: {
        brand: "MALSEOGRAPHY",
        title: "MALSEOGRAPHY | Obsessed with the process. Destined for the progress."
    },

    about: {
        subtitle: "Obsessed with the process. Destined for the progress.",
        lead: "Bridging modern digital design aesthetics with dynamic cinematic motion and secure system architecture.",
        intro: "I am a multidisciplinary professional currently studying in the Department of Industrial Management at the University of Kelaniya. My philosophy is rooted in precision, analytical problem-solving, and clean digital execution. I navigate the digital space through three distinct lenses:",
        lenses: [
            {
                title: "The Designer & Visual Storyteller",
                description: "By stripping away visual clutter and adopting a premium monochrome palette, I let the essence of raw design and structured layouts speak for themselves. Specializing in UI/UX design, graphic design, video editing, and professional photo editing, my goal is to spark emotional connections and deliver timeless, high-fidelity visual results."
            },
            {
                title: "The Software Developer",
                description: "I bridge the gap between creative vision and functional reality. Whether engineering relational databases or building dynamic applications, I focus on object-oriented programming and structured system architecture to bring immersive digital interfaces to life."
            },
            {
                title: "The Cybersecurity Enthusiast",
                description: "Beyond the visual and functional surface, I am deeply invested in the underlying mechanics of digital security. I continuously explore network protocols, data integrity, and secure backend architectures to ensure that the systems I build and conceptualize are as resilient as they are beautiful."
            }
        ]
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
                "Digital Artwork Composition",
                "Monochrome Color Harmonies"
            ]
        },
        {
            id: "software",
            title: "Software Engineering",
            description: "Transforming logical frameworks into robust digital realities through clean code, with experience building complete management systems.",
            icon: "code",
            focus: [
                "Object-Oriented Programming (Java & Swing interfaces)",
                "Node.js Backend Ecosystems",
                "Relational Database Management (MySQL & JDBC integration)",
                "System Integration & API Design",
                "Interactive Front-End Components"
            ]
        },
        {
            id: "cybersecurity",
            title: "Cybersecurity & Networking",
            description: "Driven by a passion for data integrity, secure networks, and analytical problem-solving within IT infrastructures.",
            icon: "shield",
            focus: [
                "Security Fundamentals & Audits",
                "Network Protocols (TCP/IP models)",
                "OSI Layer Architecture",
                "Vulnerability Analysis",
                "Secure Coding Practices"
            ]
        },
        {
            id: "video",
            title: "Video Editing",
            description: "Directing pacing, motion, sound, and color to weave compelling cinematic narratives, utilizing industry-standard tools like Premiere Pro and After Effects.",
            icon: "video",
            focus: [
                "Cinematic Video Editing & Teaser Scripting",
                "Advanced Motion Graphics (Saber effects & .mogrt templates)",
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
                "Fine-Art Portraiture (Sony a7III & Fujifilm X-T30 II)",
                "Cinematic Event Documentation",
                "Landscape & Architectural Composition",
                "Lighting & Studio Setup (Sigma lens optimization)",
                "Professional Photo Editing"
            ]
        }
    ],

    tools: [
        { name: "Figma", level: 95, icon: "figma" },
        { name: "Adobe Premiere Pro", level: 90, icon: "premierepro" },
        { name: "DaVinci Resolve", level: 85, icon: "davinci" },
        { name: "Adobe Lightroom", level: 85, icon: "lightroom" },
        { name: "Studio & Lighting Gear", level: 88, icon: "camera" }
    ],

    timeline: [
        {
            year: "2026 - Present",
            title: "Assistant Media Director",
            institution: "Industrial Management Science Students' Association (IMSSA)",
            description: "Spearheading the overall media strategy, visual identity, and cinematic storytelling for the student body within the Department of Industrial Management. Overseeing digital campaigns, coordinating media teams, and guiding the creative direction for departmental initiatives."
        },
        {
            year: "2025 - 2026",
            title: "UI/UX Designer & Systems Developer",
            institution: "University of Kelaniya - IdeaSprint & Independent Projects",
            description: "Led the UI/UX design and interactive prototyping for the \"CeyLink\" project, securing a finalist position in the IdeaSprint 2025 intra-departmental hackathon. Independently engineered \"Pixel Rent,\" a complete camera renting system built with Java and MySQL, focusing on relational database management and structured inventory tracking."
        },
        {
            year: "2025 - 2026",
            title: "Level 1 Media Coordinator",
            institution: "Industrial Management Science Students' Association (IMSSA)",
            description: "Handled foundational media tasks, digital content creation, and visual communication strategies to support intra-departmental events and ongoing student body initiatives prior to advancing to the Assistant Media Director role."
        },
        {
            year: "2025 - Present",
            title: "Undergraduate Innovator & Technical Contributor",
            institution: "University of Kelaniya",
            description: "Pursuing studies merging industrial management with software development and cybersecurity protocols. Provided technical support for intra-departmental AI meetups and workshop series in collaboration with PyData."
        },
        {
            year: "2024 - Present",
            title: "Freelance Photographer & Videographer",
            institution: "Independent Creative",
            description: "Providing professional photography and cinematic video production services. Specializing in high-contrast fine-art portraiture, event documentation, promotional video campaigns, and advanced color grading using industry-standard equipment."
        }
    ],

    projects: [
        {
            id: 1,
            title: "Ceylon",
            category: "graphic",
            image: "assets/images/project2.png",
            description: "Visual identity and editorial system for a luxury premium brand characterized by sharp, minimalist architecture and structured typography.",
            tags: ["Identity", "Typography", "Editorial"],
            details: {
                problem: "Premium brands often struggle to reflect cultural heritage without looking cluttered, old-fashioned, or visually busy.",
                requirements: "Create a modern, luxury brand system that feels rooted in heritage but appeals to contemporary, global consumers.",
                approach: "Extracted geometric shapes from historical art and merged them with strict minimalist layouts. Used high-contrast serif typography paired with textured charcoal color schemes.",
                outcome: "A premium visual identity including custom packaging, stationery, and editorial books that redefined the brand's perception in high-end international markets."
            }
        },
        {
            id: 2,
            title: "Legacy in Bloom",
            category: "uiux",
            image: "assets/images/project1.png",
            description: "An immersive digital platform showcasing intricate design patterns and monochrome aesthetics through structured UI and UX research.",
            tags: ["Figma", "UX Research", "Design System"],
            details: {
                problem: "Cultural design knowledge is scattered and poorly presented to the modern generation, creating a disconnect from heritage.",
                requirements: "Develop a highly interactive, responsive platform that preserves design patterns digitally, adhering strictly to accessibility standards.",
                approach: "Conducted user research and designed a low-contrast dark-mode interface with subtle glowing elements. Incorporated custom SVG line drawings that reveal information interactively.",
                outcome: "An award-winning platform with high user engagement and praise from design communities for its cinematic, educational interface."
            }
        },
        {
            id: 3,
            title: "HackX 11.0: The Startup Challenge",
            category: "graphic",
            image: "assets/images/project3.png",
            description: "Directed the overarching visual narrative and media assets for an inter-university startup challenge, encompassing 3D mascot design, dynamic flyer layouts, and cinematic teaser scripts.",
            tags: ["3D Design", "Motion Graphics", "Cinematic Trailers"],
            details: {
                problem: "Creating a cohesive visual identity for a large-scale inter-university competition requires blending dynamic energy with professional polish.",
                requirements: "Design a full media package including 3D mascot, promotional flyers, social media kits, and cinematic teaser scripts for the startup challenge.",
                approach: "Developed a bold 3D mascot character as the visual anchor, paired with high-contrast typography and motion graphics. Created cinematic teaser scripts with dynamic pacing and Saber effects.",
                outcome: "The visual campaign generated significant engagement across university channels, establishing HackX 11.0 as a recognized brand in the inter-university startup ecosystem."
            }
        },
        {
            id: 4,
            title: "Pixel Rent",
            category: "software",
            image: "assets/images/project4.png",
            description: "Engineered a comprehensive digital camera renting system from the ground up, highlighting the seamless integration of logical database management with structured user flows for inventory tracking.",
            tags: ["Java", "MySQL", "System Architecture"],
            details: {
                problem: "Camera rental businesses often rely on manual tracking, leading to inventory mismanagement, overbooking, and lost equipment records.",
                requirements: "Build a complete rental management system with user authentication, equipment catalog, booking workflows, and real-time inventory tracking using relational database design.",
                approach: "Developed using Java with Swing for the GUI and MySQL with JDBC integration for backend data management. Implemented object-oriented architecture with clear separation of concerns across data access, business logic, and presentation layers.",
                outcome: "A fully functional desktop application that streamlines the entire rental lifecycle — from equipment registration and customer management to booking confirmations and return processing."
            }
        }
    ],

    repos: [
        {
            title: "Pixel Rent System",
            description: "A robust backend system and digital camera renting application emphasizing database integrity.",
            url: "https://github.com/malasaathere"
        },
        {
            title: "Interactive Design Components",
            description: "Functional, clean-code front-end UI kits and frameworks ready for deployment.",
            url: "https://github.com/malasaathere"
        }
    ],

    githubProfileUrl: "https://github.com/malasaathere"
};
