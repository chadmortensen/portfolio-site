export type LanguageCode = "en" | "es" | "fr";

export const LANGUAGE_STORAGE_KEY = "site-language";

export const languageOptions = [
  { code: "en" as const, label: "EN", name: "English" },
  { code: "es" as const, label: "ES", name: "Español" },
  { code: "fr" as const, label: "FR", name: "Français" },
];

const english = {
  navigation: {
    items: {
      home: "Home",
      about: "About",
      experience: "Experience",
      leadership: "Leadership",
      value: "Value",
      caseStudies: "Case Studies",
      contact: "Contact",
    },
    caseStudyLinks: [
      { title: "Brightside Growth Vision", route: "/case-study-3" },
      { title: "Etsy Fulfillment Vision", route: "/case-study-2" },
      { title: "Walmart Registry Revamp", route: "/case-study-1" },
      { title: "Additional work examples", route: "/case-study-4" },
    ],
    viewAllCaseStudies: "View All Case Studies",
    languageMenuLabel: "Language",
    languageSelectorAriaLabel: "Select site language",
    openMenuLabel: "Open navigation menu",
    closeMenuLabel: "Close navigation menu",
  },
  hero: {
    name: "Chad Mortensen",
    tagline:
      "My work blends human-centered craft with strategic clarity to move people and products forward.",
    primaryCta: "Learn About Me",
    secondaryCta: "View My Work",
    primaryCtaAria: "Learn more about Chad Mortensen's background and experience",
    secondaryCtaAria: "View Chad Mortensen's case studies and design work",
    scrollAria: "Scroll down to learn more about Chad Mortensen",
  },
  about: {
    title: "About Me",
    intro:
      "A career in design, a love of people, and a belief that the best solutions start with empathy (and sometimes pie).",
    columns: [
      {
        title: "Background",
        body:
          "I'm a product design leader with 25+ years of experience turning complex problems into meaningful outcomes by guiding teams, shaping culture, and building thoughtful, scalable design solutions across eCommerce, health tech, and omnichannel platforms.",
      },
      {
        title: "My Super Power",
        body:
          "I do my best work when things get complex and the stakes are high. When pressure rises, I stay steady. I quickly assess what matters most, create clarity, and move with urgency without adding noise or unnecessary stress. I've been told I have a way of lowering the temperature in heated discussions and helping teams shift from tension to traction. Diplomatic but honest, calm but decisive, I create the conditions for thoughtful decisions and meaningful forward progress.",
      },
      {
        title: "Outside of Work",
        body:
          "I'm a dad of two, a fan of quiet weekends on our 20-acre rural property, and married to a pastry chef who runs a local cooking school. Food, friends, and meaningful conversations are my happy place.\n\nAlso, I have a framed picture of Yoda in a three-piece suit hanging in my office. Interpret that however you'd like.",
      },
    ],
  },
  experience: {
    title: "Experience",
    intro:
      "25+ years of design leadership across health tech, eCommerce, and retail, driving meaningful outcomes through human-centered design.",
    showLabel: "View Experience",
    hideLabel: "Hide Experience",
    showAria: "Show experience details",
    hideAria: "Hide experience details",
    achievementsLabel: "Key Achievements",
    entries: [
      {
        title: "Head of Product Design",
        company: "Brightside Health",
        period: "Aug 2023 - June 2025",
        location: "Portland, OR",
        description:
          "Led product design for a fast-scaling mental health platform, defining strategy and processes for both member and clinician experiences in a regulated, high-complexity domain.",
        achievements: [
          "Introduced AI-assisted tools into clinical and design workflows, improving clinician efficiency and unlocking new opportunities for personalized care delivery",
          "Partnered cross-functionally with product, engineering, and clinical leadership to align design strategy with care quality and business goals, contributing to funnel optimization and improved engagement metrics",
          "Fostered a data-informed, human-centered design culture, integrating experimentation, outcomes tracking, and systems thinking to guide scalable design decisions",
          "Managed and mentored a team of senior designers, clarifying growth paths, elevating design leadership within squads, and creating opportunities for impact beyond delivery",
        ],
      },
      {
        title: "Director of Product Design - Fulfillment, Search & Ads",
        company: "Etsy",
        period: "May 2021 - March 2023",
        location: "Portland, OR",
        description:
          "Led a team of 3 senior managers and 13 designers across three mission-critical product groups, including Fulfillment, Search, and Ads — shaping experiences for millions of buyers and sellers.",
        achievements: [
          "Defined and drove long-term design strategies aligned to company OKRs, directly contributing to improvements in seller performance, buyer satisfaction, and marketplace trust on the Fulfillment team",
          "Helped squads exceed GMV and revenue goals by aligning design outcomes with key business metrics and collaborating deeply with product and engineering leadership",
          "Built and scaled design leadership, hiring senior talent, coaching managers, and implementing performance and growth frameworks to support team development and retention",
          "Owned team budget and cultural initiatives, advocating for investment in travel, collaboration, and recognition to strengthen distributed team cohesion and cross-functional alignment",
        ],
      },
      {
        title: "Senior Manager II",
        company: "Walmart eCommerce",
        period: "Oct 2016 - April 2021",
        location: "Portland, OR",
        description:
          "Led product design across multiple verticals including fulfillment, grocery delivery, consumables, and fashion experiences.",
        roles: [
          {
            title: "Fulfillment & Grocery Delivery",
            period: "Feb 2020 - April 2021",
            description:
              "Led product design for Walmart's fulfillment experiences across web and mobile, including grocery and general merchandise delivery and pickup.",
            achievements: [
              "Responded swiftly to COVID-era challenges, rapidly redesigning critical customer and store-facing workflows",
              "Spearheaded the re-platforming of the grocery pickup and delivery experience, improving usability and alignment with company strategy",
              "Partnered with product and business leads on roadmap prioritization, resourcing, and long-term strategy",
            ],
          },
          {
            title: "Routine Consumables",
            period: "Oct 2016 - Feb 2020",
            description:
              "Led a cross-functional design team focused on high-frequency consumables and registry experiences.",
            achievements: [
              "Conducted data-driven discovery and executed a complete rebuild of Walmart's baby registry product, resulting in increased engagement and improved UX",
              "Balanced rapid iteration with long-term vision to drive customer satisfaction and business growth",
            ],
          },
          {
            title: "Fashion",
            period: "Oct 2016 - Feb 2020",
            description:
              "Directed design strategy for Walmart.com's fashion vertical, transforming how customers discover and shop for apparel.",
            achievements: [
              "Operated as a lean startup within Walmart, using customer insights, rapid experimentation, and iterative design to shape a modern fashion experience",
              "Aligned user mental models with innovative design approaches to increase relevance and conversion",
            ],
          },
        ],
      },
      {
        title: "Sr. Manager - Mobile Apps",
        company: "Sam's Club",
        period: "Oct 2013 - Oct 2016",
        location: "Portland, OR",
        description:
          "Managed UX for Sam's Club iOS/Android apps, in-store digital tools, and B2B features.",
        achievements: [
          "Built and scaled a multidisciplinary team of visual, UX, and content designers",
          "Drove service design initiatives connecting physical retail with digital experiences across multiple channels",
          "Advocated for and applied behavioral science, research, and design thinking methods to improve member experiences",
        ],
      },
    ],
  },
  leadership: {
    title: "My Leadership Style",
    intro:
      "Leading design teams is about more than setting direction, it's about creating an environment where people can thrive, grow, and do their best work. Here's what I believe makes that possible:",
    principles: [
      {
        title: "Transparency builds trust",
        description:
          "I lead with honesty and clarity, sharing context, being direct, and creating space for open conversations. Trust starts with being someone your team can count on.",
      },
      {
        title: "Celebrate progress, not just outcomes",
        description:
          "Design is demanding. It's easy to skip the moments that matter. I make time to recognize great work, reflect on what we've learned, and keep morale high.",
      },
      {
        title: "Diverse perspectives make better products",
        description:
          "I believe the best teams reflect a range of backgrounds and experiences. Diversity makes our work stronger, more inclusive, and more relevant.",
      },
      {
        title: "Craft matters",
        description:
          "I hold a high bar for quality and help teams rise to it through thoughtful critique, collaboration, and shared pride in the work. Great design should not only be effective but also something we're genuinely proud to put into the world.",
      },
    ],
  },
  value: {
    title: "Value I Bring",
    intro:
      "As a product design leader, I wear many hats and I focus on the work that drives clarity, alignment, and impact across the organization.",
    items: [
      {
        title: "Build trusted cross-functional partnerships",
        description:
          "Strong collaboration with product, engineering, analytics, and research is foundational. I invest early and consistently in these relationships to ensure design is part of strategic decision-making, not an afterthought.",
      },
      {
        title: "Connect design to company strategy",
        description:
          "I help design teams zoom out. By aligning day-to-day efforts with broader business goals, I ensure we're focusing on what matters most, advocating for the right resourcing and investing in high-leverage work.",
      },
      {
        title: "Grow people and careers",
        description:
          "Coaching is core to my leadership. I guide performance with empathy and clarity, give honest and useful feedback, and create opportunities for career progression. I strive to make growth conversations feel supportive, not evaluative.",
      },
      {
        title: "Design for team health and effectiveness",
        description:
          "I keep a pulse on team morale and operational clarity, listening for signals and adjusting processes, rituals, or roles to support long-term health, cohesion, and effectiveness.",
      },
      {
        title: "Contribute to org-wide design culture",
        description:
          "Beyond my direct team, I contribute to the broader design organization, leading or sponsoring initiatives around hiring, recognition, design thinking, and internal education that make the culture stronger and more inclusive.",
      },
      {
        title: "Elevate design quality",
        description:
          "I raise the bar by championing user-centered practices, setting clear principles, and facilitate constructive feedback that sharpens outcomes. Through open collaboration and knowledge sharing, I help teams grow their craft while encouraging experimentation, new technologies, and fresh approaches to keep our design practice innovative and relevant.",
      },
    ],
  },
  caseStudies: {
    title: "Case Studies",
    intro:
      "Real challenges, strategic solutions, and measurable outcomes that demonstrate the impact of effective leadership at Fortune 1 companies as well as growing startups.",
    goalsLabel: "Goals & Success Metrics",
    cards: [
      {
        id: 1,
        title: "Design Vision for Growth team at Brightside Health",
        company: "Brightside Health",
        image: "/img/Brightside-vision-main.png?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Brightside Health case study showing design process and outcomes",
        challenge:
          "The Growth team needed a clear product vision to align cross-functional efforts and guide strategic decisions for scaling mental health services to underserved communities.",
        route: "/case-study-3",
        ctaLabel: "Read Full Case Study",
      },
      {
        id: 2,
        title: "Long term vision for Fulfillment at Etsy",
        company: "Etsy",
        image: "/img/etsy-vision-cover.png?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Etsy fulfillment vision case study showing design process and outcomes",
        challenge:
          "Teams had near term targets and roadmaps but they were missing something to help guide their decisions and align them to where the business was headed.",
        route: "/case-study-2",
        ctaLabel: "Read Full Case Study",
      },
      {
        id: 3,
        title: "A rapid revamp to the Walmart registry",
        company: "Walmart",
        image: "/img/baby-registry-walmart.png?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Walmart registry case study showing design process and outcomes",
        challenge:
          "In 1 quarter; design, develop and launch an improved baby registry experience addressing shortcomings of the previous registry tool.",
        goals: [
          "Increase quality registry creations (creations that lead to a first curation action)",
          "Increase curation by 10%",
          "Increase sharing by 20%",
          "Increase purchase conversion by 25%",
          "Helping new parents with this major moment in life",
        ],
        route: "/case-study-1",
        ctaLabel: "Read Full Case Study",
      },
      {
        id: 4,
        title: "Additional projects",
        company: "Walmart eCommerce",
        image: "/img/other-main.jpg?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Additional work examples showing product strategy and design leadership",
        challenge:
          "Here are some past examples of my influence in driving product strategy through design leadership",
        route: "/case-study-4",
        ctaLabel: "View Projects",
      },
    ],
  },
  contact: {
    title: "Let's Connect",
    intro:
      "Ready to chat? I'd love to hear about your challenges and explore potential opportunities.",
    location: "Portland, Oregon",
  },
  uxTips: {
    title: "UX Tips",
    intro: "Oh, you came here for some tips? Here you go!",
    buttonLabel: "Get a UX Tip",
    tips: [
      "Design with accessibility in mind from the start, not as an afterthought.",
      "Use clear visual hierarchy to guide users through key tasks.",
      "Prioritize content over decoration—clarity beats cleverness.",
      "Write microcopy that's human, helpful, and context-aware.",
      "Ensure sufficient color contrast for readability and accessibility.",
      "Provide immediate and clear feedback for user actions.",
      "Keep navigation simple and predictable to reduce cognitive load.",
      "Don't overwhelm users with choices—simplify paths to action.",
      "Use progressive disclosure to reveal complexity only when needed.",
      "Test designs with real users early and often to uncover blind spots.",
      "Design responsive interfaces that adapt smoothly across devices.",
      "Leverage whitespace to create breathing room and focus attention.",
      "Error messages should guide, not scold—offer solutions, not blame.",
      "Use consistent design patterns to build familiarity and trust.",
      "Align UI text with the brand's voice and tone consistently.",
      "Prioritize performance—slow experiences are poor experiences.",
      "Design AI interactions to be transparent about what's happening.",
      "When using AI, give users control to accept, reject, or edit outputs.",
      "AI recommendations should explain why they're being suggested.",
      "Avoid dark patterns—build trust by respecting user intent.",
      "Use data responsibly—make privacy a design consideration, not just a policy.",
      "Personalization should enhance, not creep—respect boundaries.",
      "Support keyboard navigation and screen readers for inclusivity.",
      "Test designs in real-world conditions, not just ideal lab setups.",
      "Mobile-first design ensures experiences scale up rather than break down.",
      "Use familiar iconography, but add labels when clarity is at risk.",
      "Minimize required input with smart defaults and autofill.",
      "Chunk information into digestible sections to improve comprehension.",
      "Show loading states—uncertainty is worse than waiting.",
      "Use empty states as opportunities to guide or educate users.",
      "Always design with edge cases in mind, not just the happy path.",
      "Balance aesthetics and function—pretty is useless if it confuses.",
      "Avoid jargon; speak the user's language.",
      "Design forms to be short, clear, and forgiving of mistakes.",
      "Use AI to automate repetitive tasks, not critical decision-making.",
      "AI chatbots should gracefully hand off to humans when needed.",
      "When integrating AI, set expectations—don't overpromise intelligence.",
      "Provide undo options to give users confidence in exploration.",
      "Design onboarding as an experience, not a tutorial dump.",
      "Respect user time—default to fewer notifications, not more.",
      "Always prioritize critical content above the fold.",
      "AI-powered predictions should improve efficiency, not dictate behavior.",
      "Visual cues like color and motion should support meaning, not distract.",
      "Don't bury key actions—make primary buttons distinct and clear.",
      "Use analytics to track user behavior, but validate with qualitative insights.",
      "Accessibility improvements often benefit all users, not just some.",
      "Consistency across platforms reduces learning friction.",
      "Design error prevention into flows, not just error handling.",
      "When possible, let users preview before committing (e.g., edits, purchases).",
      "AI features should respect cultural nuances and inclusivity.",
      "Use progressive loading for large content like images or data sets.",
      "Guide users with step-by-step flows for complex tasks.",
      "When users succeed, celebrate their progress subtly.",
      "Don't hide costs or requirements—be upfront to build trust.",
      "Favor clarity over cleverness in navigation labels.",
      "Make search a first-class feature, not an afterthought.",
      "Support undo/redo functionality wherever possible.",
      "AI voice interfaces should confirm understanding before taking action.",
      "Avoid forcing account creation too early—let users explore first.",
      "Prioritize learnability for new users and efficiency for experts.",
      "Use animations sparingly to reinforce transitions or state changes.",
      "Show users where they are with breadcrumbs or progress indicators.",
      "Errors should feel like recoverable bumps, not dead ends.",
      "AI should adapt to users' mental models, not force new ones.",
      "Don't require perfect inputs—design forgiving search and form fields.",
      "Provide tooltips or inline help for complex features.",
      "AI should surface recommendations, but let users make final decisions.",
      "Be mindful of accessibility when using motion or parallax effects.",
      "Highlight system status changes in real time (e.g., saving drafts).",
      "Support multiple pathways to accomplish a task.",
      "Leverage patterns from users' everyday experiences.",
      "Inclusive design benefits everyone—assume diversity, not sameness.",
      "Allow users to customize experiences without overwhelming them.",
      "Don't default to notifications—make them opt-in or value-driven.",
      "Design AI suggestions with confidence scores where possible.",
      "Consider offline states and degraded functionality gracefully.",
      "Use surveys and feedback loops to close the user-research cycle.",
      "Prioritize scannability—users don't read, they scan.",
      "Provide clear calls-to-action with strong verbs.",
      "AI text generators should allow user edits to refine outputs.",
      "Avoid feature bloat—design for needs, not possibilities.",
      "Use color to support function, not just decoration.",
      "Allow personalization of accessibility preferences (e.g., font size).",
      "Respect cognitive load—don't overload dashboards with data.",
      "Support multi-device continuity—let users pick up where they left off.",
      "AI summaries should highlight key details, not obscure context.",
      "Design for trust—visual stability, consistency, and clear intent matter.",
      "Avoid ambiguous gestures; ensure touch targets are large enough.",
      "Consider cultural differences in color, symbols, and phrasing.",
      "Design skeleton screens to ease perception of loading time.",
      "Prioritize transparency when collecting user data.",
      "Don't assume AI outputs are always correct—let users validate.",
      "Design exit paths—never trap users in a loop.",
      "Keep typography legible—don't sacrifice readability for style.",
      "Balance qualitative research with quantitative metrics.",
      "Good UX scales—design for today but plan for tomorrow.",
      "Make AI features assistive, not intrusive.",
      "Always design with empathy—understand, don't assume.",
    ],
  },
  footer: {
    copyright: "© 2024 Chad Mortensen. All rights reserved.",
  },
  notFound: {
    title: "Oops! Page not found",
    cta: "Return to Home",
  },
};

export type SiteContent = typeof english;

export const siteContent: Record<LanguageCode, SiteContent> = {
  en: english,
  es: {
    navigation: {
      items: {
        home: "Inicio",
        about: "Acerca de",
        experience: "Experiencia",
        leadership: "Liderazgo",
        value: "Valor",
        caseStudies: "Casos de estudio",
        contact: "Contacto",
      },
      caseStudyLinks: [
        { title: "Visión de crecimiento de Brightside", route: "/case-study-3" },
        { title: "Visión de fulfillment en Etsy", route: "/case-study-2" },
        { title: "Renovación del registro de Walmart", route: "/case-study-1" },
        { title: "Ejemplos adicionales de trabajo", route: "/case-study-4" },
      ],
      viewAllCaseStudies: "Ver todos los casos de estudio",
      languageMenuLabel: "Idioma",
      languageSelectorAriaLabel: "Seleccionar idioma del sitio",
      openMenuLabel: "Abrir menú de navegación",
      closeMenuLabel: "Cerrar menú de navegación",
    },
    hero: {
      name: "Chad Mortensen",
      tagline:
        "Mi trabajo combina una ejecución centrada en las personas con una claridad estratégica para impulsar a las personas y a los productos hacia adelante.",
      primaryCta: "Conoce más sobre mí",
      secondaryCta: "Ver mi trabajo",
      primaryCtaAria: "Conoce más sobre la trayectoria y experiencia de Chad Mortensen",
      secondaryCtaAria: "Ver los casos de estudio y el trabajo de diseño de Chad Mortensen",
      scrollAria: "Desplázate hacia abajo para conocer más sobre Chad Mortensen",
    },
    about: {
      title: "Sobre mí",
      intro:
        "Una carrera en diseño, amor por las personas y la convicción de que las mejores soluciones comienzan con empatía (y a veces con pie).",
      columns: [
        {
          title: "Trayectoria",
          body:
            "Soy líder de diseño de producto con más de 25 años de experiencia convirtiendo problemas complejos en resultados significativos al guiar equipos, dar forma a la cultura y crear soluciones de diseño reflexivas y escalables en eCommerce, health tech y plataformas omnicanal.",
        },
        {
          title: "Mi superpoder",
          body:
            "Hago mi mejor trabajo cuando las cosas se vuelven complejas y hay mucho en juego. Cuando aumenta la presión, me mantengo sereno. Evalúo rápido lo que más importa, creo claridad y avanzo con urgencia sin añadir ruido ni estrés innecesario. Me han dicho que tengo la capacidad de bajar la temperatura en conversaciones tensas y ayudar a los equipos a pasar de la fricción al avance. Diplomático pero honesto, tranquilo pero decidido, creo las condiciones para tomar decisiones reflexivas y generar un progreso real.",
        },
        {
          title: "Fuera del trabajo",
          body:
            "Soy papá de dos hijos, disfruto los fines de semana tranquilos en nuestra propiedad rural de 20 acres y estoy casado con una pastelera que dirige una escuela local de cocina. La comida, los amigos y las conversaciones con sentido son mi lugar feliz.\n\nAdemás, tengo en mi oficina una foto enmarcada de Yoda con un traje de tres piezas. Interprétalo como quieras.",
        },
      ],
    },
    experience: {
      title: "Experiencia",
      intro:
        "Más de 25 años liderando diseño en health tech, eCommerce y retail, generando resultados significativos a través de un diseño centrado en las personas.",
      showLabel: "Ver experiencia",
      hideLabel: "Ocultar experiencia",
      showAria: "Mostrar detalles de experiencia",
      hideAria: "Ocultar detalles de experiencia",
      achievementsLabel: "Logros clave",
      entries: [
        {
          title: "Head of Product Design",
          company: "Brightside Health",
          period: "Ago 2023 - Jun 2025",
          location: "Portland, OR",
          description:
            "Lideré diseño de producto para una plataforma de salud mental en rápido crecimiento, definiendo estrategia y procesos tanto para la experiencia de miembros como de profesionales clínicos en un entorno regulado y de alta complejidad.",
          achievements: [
            "Introduje herramientas asistidas por IA en flujos clínicos y de diseño, mejorando la eficiencia de los clínicos y abriendo nuevas oportunidades para una atención personalizada",
            "Colaboré estrechamente con liderazgo de producto, ingeniería y clínico para alinear la estrategia de diseño con la calidad del cuidado y los objetivos del negocio, contribuyendo a optimizar el funnel y mejorar métricas de engagement",
            "Impulsé una cultura de diseño informada por datos y centrada en las personas, integrando experimentación, seguimiento de resultados y pensamiento sistémico para orientar decisiones de diseño escalables",
            "Dirigí y acompañé a un equipo de diseñadores senior, clarificando rutas de crecimiento, elevando el liderazgo de diseño dentro de los squads y creando oportunidades de impacto más allá de la entrega",
          ],
        },
        {
          title: "Director of Product Design - Fulfillment, Search & Ads",
          company: "Etsy",
          period: "May 2021 - Mar 2023",
          location: "Portland, OR",
          description:
            "Lideré un equipo de 3 gerentes senior y 13 diseñadores en tres grupos de producto de misión crítica, incluidos Fulfillment, Search y Ads, dando forma a experiencias para millones de compradores y vendedores.",
          achievements: [
            "Definí e impulsé estrategias de diseño a largo plazo alineadas con los OKR de la empresa, contribuyendo directamente a mejoras en el rendimiento de vendedores, la satisfacción de compradores y la confianza en el marketplace dentro del equipo de Fulfillment",
            "Ayudé a que los equipos superaran objetivos de GMV e ingresos alineando resultados de diseño con métricas clave del negocio y colaborando en profundidad con liderazgo de producto e ingeniería",
            "Construí y escalé liderazgo de diseño, contratando talento senior, acompañando a managers e implementando marcos de desempeño y crecimiento para apoyar el desarrollo y la retención del equipo",
            "Gestioné presupuesto del equipo e iniciativas culturales, defendiendo inversión en viajes, colaboración y reconocimiento para fortalecer la cohesión de equipos distribuidos y la alineación transversal",
          ],
        },
        {
          title: "Senior Manager II",
          company: "Walmart eCommerce",
          period: "Oct 2016 - Abr 2021",
          location: "Portland, OR",
          description:
            "Lideré diseño de producto en múltiples verticales, incluyendo fulfillment, entrega de comestibles, consumibles y experiencias de moda.",
          roles: [
            {
              title: "Fulfillment y entrega de comestibles",
              period: "Feb 2020 - Abr 2021",
              description:
                "Lideré diseño de producto para las experiencias de fulfillment de Walmart en web y móvil, incluyendo entrega y pickup de comestibles y mercancía general.",
              achievements: [
                "Respondí con rapidez a los desafíos de la era COVID, rediseñando de forma acelerada flujos críticos para clientes y tiendas",
                "Impulsé la replatformización de la experiencia de pickup y delivery de comestibles, mejorando usabilidad y alineación con la estrategia de la empresa",
                "Colaboré con líderes de producto y negocio en priorización de roadmap, asignación de recursos y estrategia de largo plazo",
              ],
            },
            {
              title: "Consumibles de rutina",
              period: "Oct 2016 - Feb 2020",
              description:
                "Lideré un equipo de diseño multidisciplinario enfocado en consumibles de alta frecuencia y experiencias de registro.",
              achievements: [
                "Realicé discovery basado en datos y ejecuté una reconstrucción completa del producto de registro para bebés de Walmart, generando mayor engagement y una mejor experiencia de usuario",
                "Equilibré iteración rápida con visión de largo plazo para impulsar satisfacción del cliente y crecimiento del negocio",
              ],
            },
            {
              title: "Moda",
              period: "Oct 2016 - Feb 2020",
              description:
                "Dirigí la estrategia de diseño para la vertical de moda de Walmart.com, transformando la manera en que los clientes descubren y compran ropa.",
              achievements: [
                "Operé como una startup ágil dentro de Walmart, utilizando insights de clientes, experimentación rápida y diseño iterativo para construir una experiencia de moda moderna",
                "Alineé modelos mentales de usuarios con enfoques de diseño innovadores para aumentar relevancia y conversión",
              ],
            },
          ],
        },
        {
          title: "Sr. Manager - Mobile Apps",
          company: "Sam's Club",
          period: "Oct 2013 - Oct 2016",
          location: "Portland, OR",
          description:
            "Gestioné UX para las apps iOS/Android de Sam's Club, herramientas digitales en tienda y funcionalidades B2B.",
          achievements: [
            "Construí y escalé un equipo multidisciplinario de diseño visual, UX y contenido",
            "Impulsé iniciativas de service design que conectaban retail físico con experiencias digitales a través de múltiples canales",
            "Promoví y apliqué ciencia del comportamiento, investigación y métodos de design thinking para mejorar la experiencia de los miembros",
          ],
        },
      ],
    },
    leadership: {
      title: "Mi estilo de liderazgo",
      intro:
        "Liderar equipos de diseño es mucho más que marcar una dirección: se trata de crear un entorno donde las personas puedan prosperar, crecer y dar lo mejor de sí. Esto es lo que creo que lo hace posible:",
      principles: [
        {
          title: "La transparencia genera confianza",
          description:
            "Lidero con honestidad y claridad, compartiendo contexto, siendo directo y creando espacio para conversaciones abiertas. La confianza comienza cuando eres alguien en quien tu equipo puede apoyarse.",
        },
        {
          title: "Celebra el progreso, no solo los resultados",
          description:
            "El diseño es exigente. Es fácil pasar por alto los momentos que importan. Yo hago espacio para reconocer el gran trabajo, reflexionar sobre lo aprendido y mantener alta la moral.",
        },
        {
          title: "Las perspectivas diversas crean mejores productos",
          description:
            "Creo que los mejores equipos reflejan una variedad de trayectorias y experiencias. La diversidad hace nuestro trabajo más fuerte, más inclusivo y más relevante.",
        },
        {
          title: "La calidad importa",
          description:
            "Mantengo un estándar alto de calidad y ayudo a los equipos a alcanzarlo mediante crítica reflexiva, colaboración y orgullo compartido por el trabajo. El gran diseño no solo debe ser efectivo; también debe ser algo que realmente nos enorgullezca poner en el mundo.",
        },
      ],
    },
    value: {
      title: "El valor que aporto",
      intro:
        "Como líder de diseño de producto, llevo muchos sombreros y me concentro en el trabajo que genera claridad, alineación e impacto en toda la organización.",
      items: [
        {
          title: "Construir alianzas transversales de confianza",
          description:
            "La colaboración sólida con producto, ingeniería, analítica e investigación es fundamental. Invierto en estas relaciones desde el principio y de forma constante para asegurar que el diseño forme parte de la toma de decisiones estratégicas y no sea una ocurrencia tardía.",
        },
        {
          title: "Conectar diseño con la estrategia de la empresa",
          description:
            "Ayudo a los equipos de diseño a tomar perspectiva. Al alinear el trabajo del día a día con objetivos de negocio más amplios, me aseguro de que estemos enfocados en lo más importante, defendiendo el resourcing adecuado e invirtiendo en trabajo de alto impacto.",
        },
        {
          title: "Hacer crecer a las personas y sus carreras",
          description:
            "El coaching es central en mi liderazgo. Guío el desempeño con empatía y claridad, doy feedback honesto y útil y creo oportunidades para el crecimiento profesional. Procuro que las conversaciones sobre desarrollo se sientan de apoyo, no de evaluación.",
        },
        {
          title: "Diseñar para la salud y efectividad del equipo",
          description:
            "Mantengo el pulso del ánimo del equipo y de la claridad operativa, escuchando señales y ajustando procesos, rituales o roles para apoyar la salud, cohesión y efectividad a largo plazo.",
        },
        {
          title: "Contribuir a una cultura de diseño a nivel organizacional",
          description:
            "Más allá de mi equipo directo, contribuyo a la organización de diseño en general, liderando o patrocinando iniciativas de contratación, reconocimiento, pensamiento de diseño y educación interna que fortalecen la cultura y la hacen más inclusiva.",
        },
        {
          title: "Elevar la calidad del diseño",
          description:
            "Elevo el estándar defendiendo prácticas centradas en las personas, definiendo principios claros y facilitando feedback constructivo que mejora los resultados. A través de colaboración abierta y compartir conocimiento, ayudo a los equipos a desarrollar su oficio mientras impulso la experimentación, nuevas tecnologías y enfoques frescos para mantener la práctica de diseño innovadora y relevante.",
        },
      ],
    },
    caseStudies: {
      title: "Casos de estudio",
      intro:
        "Desafíos reales, soluciones estratégicas y resultados medibles que demuestran el impacto de un liderazgo efectivo en empresas Fortune 1 y startups en crecimiento.",
      goalsLabel: "Objetivos y métricas de éxito",
      cards: [
        {
          id: 1,
          title: "Visión de diseño para el equipo de Growth en Brightside Health",
          company: "Brightside Health",
          image: "/img/Brightside-vision-main.png?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Caso de estudio de Brightside Health que muestra el proceso de diseño y sus resultados",
          challenge:
            "El equipo de Growth necesitaba una visión de producto clara para alinear el trabajo transversal y guiar decisiones estratégicas para escalar servicios de salud mental hacia comunidades desatendidas.",
          route: "/case-study-3",
          ctaLabel: "Leer caso completo",
        },
        {
          id: 2,
          title: "Visión de largo plazo para Fulfillment en Etsy",
          company: "Etsy",
          image: "/img/etsy-vision-cover.png?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Caso de estudio de la visión de fulfillment en Etsy mostrando proceso y resultados",
          challenge:
            "Los equipos tenían objetivos y roadmaps de corto plazo, pero les faltaba algo que guiara sus decisiones y los alineara con el rumbo del negocio.",
          route: "/case-study-2",
          ctaLabel: "Leer caso completo",
        },
        {
          id: 3,
          title: "Una renovación acelerada del registro de Walmart",
          company: "Walmart",
          image: "/img/baby-registry-walmart.png?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Caso de estudio del registro de Walmart mostrando proceso y resultados de diseño",
          challenge:
            "En un trimestre: diseñar, desarrollar y lanzar una experiencia mejorada de registro para bebés que resolviera las deficiencias de la herramienta anterior.",
          goals: [
            "Aumentar la calidad de las creaciones de registros (registros que llevan a una primera acción de curación)",
            "Incrementar la curación en un 10%",
            "Incrementar el compartir en un 20%",
            "Incrementar la conversión de compra en un 25%",
            "Ayudar a nuevos padres en este momento importante de la vida",
          ],
          route: "/case-study-1",
          ctaLabel: "Leer caso completo",
        },
        {
          id: 4,
          title: "Proyectos adicionales",
          company: "Walmart eCommerce",
          image: "/img/other-main.jpg?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Ejemplos adicionales de trabajo que muestran estrategia de producto y liderazgo de diseño",
          challenge:
            "Aquí hay algunos ejemplos anteriores de mi influencia impulsando estrategia de producto a través del liderazgo de diseño",
          route: "/case-study-4",
          ctaLabel: "Ver proyectos",
        },
      ],
    },
    contact: {
      title: "Conectemos",
      intro:
        "¿Listo para conversar? Me encantaría conocer tus desafíos y explorar posibles oportunidades.",
      location: "Portland, Oregon",
    },
    uxTips: {
      title: "Consejos de UX",
      intro: "¿Viniste por algunos consejos? Aquí tienes.",
      buttonLabel: "Obtener un consejo de UX",
      tips: [
        "Diseña pensando en la accesibilidad desde el inicio, no como una idea de último momento.",
        "Usa una jerarquía visual clara para guiar a las personas en tareas clave.",
        "Prioriza el contenido por encima de la decoración: la claridad supera a lo ingenioso.",
        "Escribe microcopy humano, útil y consciente del contexto.",
        "Asegura un contraste de color suficiente para la legibilidad y la accesibilidad.",
        "Ofrece retroalimentación inmediata y clara para las acciones del usuario.",
        "Mantén la navegación simple y predecible para reducir la carga cognitiva.",
        "No abrumes a las personas con demasiadas opciones: simplifica los caminos hacia la acción.",
        "Usa divulgación progresiva para mostrar complejidad solo cuando sea necesario.",
        "Prueba tus diseños con usuarios reales temprano y con frecuencia para descubrir puntos ciegos.",
        "Diseña interfaces responsivas que se adapten con fluidez a distintos dispositivos.",
        "Aprovecha el espacio en blanco para dar respiro y dirigir la atención.",
        "Los mensajes de error deben orientar, no regañar: ofrece soluciones, no culpas.",
        "Usa patrones de diseño consistentes para generar familiaridad y confianza.",
        "Mantén el texto de la interfaz alineado con la voz y el tono de la marca.",
        "Prioriza el rendimiento: una experiencia lenta es una mala experiencia.",
        "Diseña interacciones con IA de forma transparente sobre lo que está ocurriendo.",
        "Cuando uses IA, da a las personas control para aceptar, rechazar o editar los resultados.",
        "Las recomendaciones de IA deben explicar por qué se están sugiriendo.",
        "Evita los dark patterns: construye confianza respetando la intención de las personas.",
        "Usa los datos de forma responsable: haz de la privacidad una consideración de diseño, no solo una política.",
        "La personalización debe mejorar la experiencia, no invadir: respeta los límites.",
        "Compatibiliza la navegación por teclado y los lectores de pantalla para mayor inclusión.",
        "Prueba los diseños en condiciones del mundo real, no solo en escenarios ideales.",
        "Diseñar mobile-first asegura que las experiencias escalen bien en lugar de romperse.",
        "Usa iconografía familiar, pero agrega etiquetas cuando la claridad esté en riesgo.",
        "Minimiza la información requerida con valores inteligentes por defecto y autocompletado.",
        "Divide la información en secciones digeribles para mejorar la comprensión.",
        "Muestra estados de carga: la incertidumbre es peor que la espera.",
        "Usa estados vacíos como oportunidades para guiar o educar.",
        "Diseña siempre pensando en los casos límite, no solo en el camino ideal.",
        "Equilibra estética y función: lo bonito no sirve si confunde.",
        "Evita la jerga; habla el idioma de tus usuarios.",
        "Diseña formularios breves, claros y tolerantes a los errores.",
        "Usa IA para automatizar tareas repetitivas, no decisiones críticas.",
        "Los chatbots con IA deben transferir la conversación a humanos con naturalidad cuando haga falta.",
        "Al integrar IA, gestiona expectativas: no prometas más inteligencia de la que existe.",
        "Ofrece opciones de deshacer para dar confianza al explorar.",
        "Diseña el onboarding como una experiencia, no como una avalancha de tutoriales.",
        "Respeta el tiempo de las personas: por defecto, menos notificaciones es mejor.",
        "Prioriza siempre el contenido crítico por encima del primer pliegue.",
        "Las predicciones impulsadas por IA deben mejorar la eficiencia, no dictar el comportamiento.",
        "Pistas visuales como color y movimiento deben reforzar el significado, no distraer.",
        "No escondas acciones clave: haz que los botones principales sean claros y distinguibles.",
        "Usa analítica para seguir el comportamiento, pero valida con insights cualitativos.",
        "Las mejoras de accesibilidad suelen beneficiar a todas las personas, no solo a algunas.",
        "La consistencia entre plataformas reduce la fricción de aprendizaje.",
        "Diseña prevención de errores dentro de los flujos, no solo manejo de errores.",
        "Cuando sea posible, permite previsualizar antes de confirmar (por ejemplo, ediciones o compras).",
        "Las funciones de IA deben respetar matices culturales e inclusión.",
        "Usa carga progresiva para contenido pesado como imágenes o grandes conjuntos de datos.",
        "Guía a las personas con flujos paso a paso en tareas complejas.",
        "Cuando las personas tienen éxito, celebra su progreso de forma sutil.",
        "No ocultes costos ni requisitos: sé claro desde el inicio para generar confianza.",
        "Prefiere claridad por encima de ingenio en las etiquetas de navegación.",
        "Haz que la búsqueda sea una funcionalidad principal, no una ocurrencia tardía.",
        "Compatibiliza deshacer y rehacer siempre que sea posible.",
        "Las interfaces de voz con IA deben confirmar comprensión antes de actuar.",
        "Evita forzar la creación de cuentas demasiado pronto: deja que las personas exploren primero.",
        "Prioriza la facilidad de aprendizaje para nuevos usuarios y la eficiencia para expertos.",
        "Usa animaciones con moderación para reforzar transiciones o cambios de estado.",
        "Muestra a las personas dónde están con breadcrumbs o indicadores de progreso.",
        "Los errores deben sentirse como tropiezos recuperables, no como callejones sin salida.",
        "La IA debe adaptarse a los modelos mentales de las personas, no imponer otros nuevos.",
        "No exijas entradas perfectas: diseña búsquedas y formularios tolerantes.",
        "Ofrece tooltips o ayuda inline para funciones complejas.",
        "La IA debe mostrar recomendaciones, pero dejar la decisión final a las personas.",
        "Ten en cuenta la accesibilidad cuando uses movimiento o efectos de paralaje.",
        "Destaca cambios de estado del sistema en tiempo real (por ejemplo, guardado de borradores).",
        "Admite múltiples caminos para lograr una tarea.",
        "Aprovecha patrones de las experiencias cotidianas de las personas.",
        "El diseño inclusivo beneficia a todos: asume diversidad, no uniformidad.",
        "Permite personalizar experiencias sin abrumar a las personas.",
        "No actives notificaciones por defecto: haz que se elijan o aporten valor claro.",
        "Diseña sugerencias de IA con niveles de confianza cuando sea posible.",
        "Considera estados offline y funcionalidad degradada con elegancia.",
        "Usa encuestas y bucles de retroalimentación para cerrar el ciclo de investigación.",
        "Prioriza la capacidad de escaneo: las personas no leen, escanean.",
        "Ofrece llamadas a la acción claras con verbos sólidos.",
        "Los generadores de texto con IA deben permitir edición humana para afinar el resultado.",
        "Evita inflar el producto con funciones innecesarias: diseña para necesidades, no posibilidades.",
        "Usa el color para apoyar la función, no solo la decoración.",
        "Permite personalizar preferencias de accesibilidad (por ejemplo, tamaño de fuente).",
        "Respeta la carga cognitiva: no sobrecargues dashboards con datos.",
        "Admite continuidad entre dispositivos para que las personas retomen donde quedaron.",
        "Los resúmenes de IA deben resaltar detalles clave, no ocultar el contexto.",
        "Diseña para la confianza: importan la estabilidad visual, la consistencia y una intención clara.",
        "Evita gestos ambiguos; asegúrate de que las áreas táctiles sean lo bastante grandes.",
        "Considera diferencias culturales en colores, símbolos y redacción.",
        "Diseña pantallas skeleton para mejorar la percepción del tiempo de carga.",
        "Prioriza la transparencia al recopilar datos de usuarios.",
        "No asumas que la salida de la IA siempre es correcta: deja que las personas la validen.",
        "Diseña rutas de salida: nunca atrapes a las personas en un bucle.",
        "Mantén la tipografía legible: no sacrifiques legibilidad por estilo.",
        "Equilibra investigación cualitativa con métricas cuantitativas.",
        "Una buena UX escala: diseña para hoy, pero con mirada al mañana.",
        "Haz que las funciones con IA asistan, no que invadan.",
        "Diseña siempre con empatía: comprende, no supongas.",
      ],
    },
    footer: {
      copyright: "© 2024 Chad Mortensen. Todos los derechos reservados.",
    },
    notFound: {
      title: "Vaya, no se encontró la página",
      cta: "Volver al inicio",
    },
  },
  fr: {
    navigation: {
      items: {
        home: "Accueil",
        about: "À propos",
        experience: "Expérience",
        leadership: "Leadership",
        value: "Valeur",
        caseStudies: "Études de cas",
        contact: "Contact",
      },
      caseStudyLinks: [
        { title: "Vision de croissance Brightside", route: "/case-study-3" },
        { title: "Vision fulfillment Etsy", route: "/case-study-2" },
        { title: "Refonte du registre Walmart", route: "/case-study-1" },
        { title: "Autres exemples de travail", route: "/case-study-4" },
      ],
      viewAllCaseStudies: "Voir toutes les études de cas",
      languageMenuLabel: "Langue",
      languageSelectorAriaLabel: "Sélectionner la langue du site",
      openMenuLabel: "Ouvrir le menu de navigation",
      closeMenuLabel: "Fermer le menu de navigation",
    },
    hero: {
      name: "Chad Mortensen",
      tagline:
        "Mon travail associe une approche profondément centrée sur l'humain à une clarté stratégique pour faire avancer les personnes et les produits.",
      primaryCta: "En savoir plus sur moi",
      secondaryCta: "Voir mon travail",
      primaryCtaAria: "En savoir plus sur le parcours et l'expérience de Chad Mortensen",
      secondaryCtaAria: "Voir les études de cas et le travail de design de Chad Mortensen",
      scrollAria: "Faites défiler pour en savoir plus sur Chad Mortensen",
    },
    about: {
      title: "À propos de moi",
      intro:
        "Une carrière dans le design, un goût profond pour les relations humaines et la conviction que les meilleures solutions commencent par l'empathie (et parfois par une tarte).",
      columns: [
        {
          title: "Parcours",
          body:
            "Je suis un leader du design produit avec plus de 25 ans d'expérience dans la transformation de problèmes complexes en résultats concrets, en accompagnant les équipes, en façonnant la culture et en créant des solutions de design réfléchies et évolutives dans l'eCommerce, la health tech et les plateformes omnicanales.",
        },
        {
          title: "Mon super pouvoir",
          body:
            "Je donne le meilleur de moi-même lorsque les situations deviennent complexes et que les enjeux sont élevés. Quand la pression monte, je reste stable. J'évalue rapidement ce qui compte le plus, j'apporte de la clarté et j'avance avec urgence sans ajouter de bruit ni de stress inutile. On m'a souvent dit que j'avais la capacité de faire retomber la tension dans les discussions difficiles et d'aider les équipes à passer du blocage à l'élan. Diplomate mais honnête, calme mais décisif, je crée les conditions qui permettent des décisions réfléchies et une progression concrète.",
        },
        {
          title: "En dehors du travail",
          body:
            "Je suis père de deux enfants, amateur de week-ends tranquilles sur notre propriété rurale de 20 acres, et marié à une cheffe pâtissière qui dirige une école de cuisine locale. La nourriture, les amis et les conversations qui ont du sens sont mon endroit préféré.\n\nEt j'ai aussi dans mon bureau une photo encadrée de Yoda en costume trois pièces. Libre à vous d'en tirer vos propres conclusions.",
        },
      ],
    },
    experience: {
      title: "Expérience",
      intro:
        "Plus de 25 ans de leadership design dans la health tech, l'eCommerce et le retail, avec des résultats concrets portés par une approche centrée sur l'humain.",
      showLabel: "Voir l'expérience",
      hideLabel: "Masquer l'expérience",
      showAria: "Afficher les détails de l'expérience",
      hideAria: "Masquer les détails de l'expérience",
      achievementsLabel: "Réalisations clés",
      entries: [
        {
          title: "Head of Product Design",
          company: "Brightside Health",
          period: "Août 2023 - Juin 2025",
          location: "Portland, OR",
          description:
            "J'ai dirigé le design produit d'une plateforme de santé mentale en forte croissance, en définissant la stratégie et les processus pour les expériences des membres comme des cliniciens dans un environnement réglementé et très complexe.",
          achievements: [
            "J'ai introduit des outils assistés par l'IA dans les workflows cliniques et design, améliorant l'efficacité des cliniciens et ouvrant de nouvelles opportunités pour une prise en charge plus personnalisée",
            "J'ai collaboré avec les responsables produit, engineering et clinique afin d'aligner la stratégie design sur la qualité des soins et les objectifs business, contribuant à l'optimisation du funnel et à de meilleures métriques d'engagement",
            "J'ai favorisé une culture design à la fois pilotée par la donnée et centrée sur l'humain, intégrant expérimentation, suivi des résultats et pensée systémique pour guider des décisions de design évolutives",
            "J'ai encadré et accompagné une équipe de designers seniors, clarifié les trajectoires de croissance, renforcé le leadership design au sein des squads et créé des opportunités d'impact au-delà de la livraison",
          ],
        },
        {
          title: "Director of Product Design - Fulfillment, Search & Ads",
          company: "Etsy",
          period: "Mai 2021 - Mars 2023",
          location: "Portland, OR",
          description:
            "J'ai dirigé une équipe de 3 senior managers et 13 designers répartis sur trois groupes produits critiques, dont Fulfillment, Search et Ads, en façonnant des expériences pour des millions d'acheteurs et de vendeurs.",
          achievements: [
            "J'ai défini et porté des stratégies design à long terme alignées sur les OKR de l'entreprise, contribuant directement à l'amélioration de la performance des vendeurs, de la satisfaction des acheteurs et de la confiance dans la marketplace au sein de l'équipe Fulfillment",
            "J'ai aidé les équipes à dépasser leurs objectifs de GMV et de revenus en alignant les résultats design sur les indicateurs business clés et en collaborant étroitement avec les directions produit et engineering",
            "J'ai structuré et développé le leadership design en recrutant des talents seniors, en accompagnant les managers et en mettant en place des cadres de performance et d'évolution pour soutenir le développement et la rétention de l'équipe",
            "J'ai géré le budget de l'équipe et des initiatives culturelles, en défendant des investissements dans les déplacements, la collaboration et la reconnaissance pour renforcer la cohésion des équipes distribuées et l'alignement transverse",
          ],
        },
        {
          title: "Senior Manager II",
          company: "Walmart eCommerce",
          period: "Oct 2016 - Avril 2021",
          location: "Portland, OR",
          description:
            "J'ai piloté le design produit sur plusieurs verticales, notamment le fulfillment, la livraison de courses, les produits de consommation courante et les expériences mode.",
          roles: [
            {
              title: "Fulfillment et livraison de courses",
              period: "Fév 2020 - Avril 2021",
              description:
                "J'ai dirigé le design produit des expériences fulfillment de Walmart sur web et mobile, y compris la livraison et le retrait de courses et de marchandises générales.",
              achievements: [
                "J'ai réagi rapidement aux défis de l'ère COVID en repensant à grande vitesse des workflows critiques côté client et côté magasin",
                "J'ai mené la replatformisation de l'expérience de retrait et de livraison des courses, en améliorant l'utilisabilité et l'alignement avec la stratégie de l'entreprise",
                "J'ai travaillé avec les responsables produit et business sur la priorisation de la roadmap, l'allocation des ressources et la stratégie long terme",
              ],
            },
            {
              title: "Produits de consommation courante",
              period: "Oct 2016 - Fév 2020",
              description:
                "J'ai dirigé une équipe design transverse centrée sur les produits de consommation fréquente et les expériences de registre.",
              achievements: [
                "J'ai mené une phase de discovery pilotée par la donnée et exécuté une refonte complète du produit de registre bébé de Walmart, entraînant une hausse de l'engagement et une meilleure expérience utilisateur",
                "J'ai trouvé un équilibre entre itération rapide et vision à long terme pour soutenir la satisfaction client et la croissance du business",
              ],
            },
            {
              title: "Mode",
              period: "Oct 2016 - Fév 2020",
              description:
                "J'ai dirigé la stratégie design de la verticale mode de Walmart.com, transformant la manière dont les clients découvrent et achètent des vêtements.",
              achievements: [
                "J'ai opéré comme une startup agile au sein de Walmart, en m'appuyant sur les insights clients, l'expérimentation rapide et le design itératif pour construire une expérience mode moderne",
                "J'ai aligné les modèles mentaux des utilisateurs avec des approches design innovantes afin d'améliorer la pertinence et la conversion",
              ],
            },
          ],
        },
        {
          title: "Sr. Manager - Mobile Apps",
          company: "Sam's Club",
          period: "Oct 2013 - Oct 2016",
          location: "Portland, OR",
          description:
            "J'ai supervisé l'UX des applications iOS/Android de Sam's Club, des outils digitaux en magasin et des fonctionnalités B2B.",
          achievements: [
            "J'ai constitué et développé une équipe pluridisciplinaire mêlant design visuel, UX et content design",
            "J'ai porté des initiatives de service design reliant le retail physique aux expériences digitales sur plusieurs canaux",
            "J'ai promu et appliqué les sciences comportementales, la recherche et le design thinking pour améliorer l'expérience des membres",
          ],
        },
      ],
    },
    leadership: {
      title: "Mon style de leadership",
      intro:
        "Diriger des équipes design va bien au-delà du fait de donner une direction : il s'agit de créer un environnement dans lequel chacun peut s'épanouir, progresser et donner le meilleur de lui-même. Voici ce qui, selon moi, rend cela possible :",
      principles: [
        {
          title: "La transparence crée la confiance",
          description:
            "Je dirige avec honnêteté et clarté, en partageant le contexte, en étant direct et en ouvrant l'espace à des conversations franches. La confiance commence quand votre équipe sait qu'elle peut compter sur vous.",
        },
        {
          title: "Célébrer les progrès, pas seulement les résultats",
          description:
            "Le design est exigeant. Il est facile de passer à côté des moments qui comptent. Je prends le temps de reconnaître le bon travail, de revenir sur ce que nous avons appris et de garder une dynamique positive.",
        },
        {
          title: "La diversité des points de vue produit de meilleurs produits",
          description:
            "Je crois que les meilleures équipes reflètent une diversité de parcours et d'expériences. Cette diversité rend notre travail plus solide, plus inclusif et plus pertinent.",
        },
        {
          title: "Le craft compte",
          description:
            "J'entretiens un haut niveau d'exigence sur la qualité et j'aide les équipes à l'atteindre grâce à une critique réfléchie, à la collaboration et à une fierté partagée du travail accompli. Un grand design doit être efficace, bien sûr, mais aussi être quelque chose que nous sommes sincèrement fiers de mettre dans le monde.",
        },
      ],
    },
    value: {
      title: "La valeur que j'apporte",
      intro:
        "En tant que leader du design produit, je porte plusieurs casquettes et je me concentre sur le travail qui apporte clarté, alignement et impact à l'échelle de l'organisation.",
      items: [
        {
          title: "Construire des partenariats transverses de confiance",
          description:
            "Une collaboration forte avec le produit, l'engineering, l'analytics et la recherche est fondamentale. J'investis tôt et de manière continue dans ces relations pour faire du design un acteur de la décision stratégique, et non une considération tardive.",
        },
        {
          title: "Relier le design à la stratégie de l'entreprise",
          description:
            "J'aide les équipes design à prendre du recul. En alignant les efforts du quotidien sur des objectifs business plus larges, je m'assure que nous concentrons notre énergie là où elle a le plus de valeur, avec les bons moyens et sur les sujets les plus porteurs.",
        },
        {
          title: "Faire grandir les personnes et les carrières",
          description:
            "Le coaching est au cœur de mon leadership. J'accompagne la performance avec empathie et clarté, je donne un feedback honnête et utile et je crée des opportunités d'évolution professionnelle. J'essaie de faire en sorte que les conversations de développement soient soutenantes, pas évaluatives.",
        },
        {
          title: "Concevoir pour la santé et l'efficacité de l'équipe",
          description:
            "Je garde un œil attentif sur le moral de l'équipe et la clarté opérationnelle, en repérant les signaux et en ajustant processus, rituels ou rôles pour soutenir durablement la cohésion, l'efficacité et la santé du collectif.",
        },
        {
          title: "Contribuer à la culture design à l'échelle de l'organisation",
          description:
            "Au-delà de mon équipe directe, je contribue à l'organisation design au sens large en menant ou en sponsorisant des initiatives autour du recrutement, de la reconnaissance, du design thinking et de la formation interne afin de renforcer une culture plus solide et plus inclusive.",
        },
        {
          title: "Élever la qualité du design",
          description:
            "J'élève le niveau en défendant des pratiques centrées sur l'humain, en posant des principes clairs et en facilitant un feedback constructif qui affine les résultats. Grâce à une collaboration ouverte et au partage de connaissances, j'aide les équipes à faire progresser leur craft tout en encourageant l'expérimentation, les nouvelles technologies et les approches fraîches pour garder notre pratique du design innovante et pertinente.",
        },
      ],
    },
    caseStudies: {
      title: "Études de cas",
      intro:
        "Des défis concrets, des solutions stratégiques et des résultats mesurables qui montrent l'impact d'un leadership efficace, aussi bien dans des entreprises Fortune 1 que dans des startups en croissance.",
      goalsLabel: "Objectifs et indicateurs de réussite",
      cards: [
        {
          id: 1,
          title: "Vision design pour l'équipe Growth chez Brightside Health",
          company: "Brightside Health",
          image: "/img/Brightside-vision-main.png?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Étude de cas Brightside Health montrant le processus de design et ses résultats",
          challenge:
            "L'équipe Growth avait besoin d'une vision produit claire pour aligner les efforts transverses et guider les décisions stratégiques liées à la montée en échelle des services de santé mentale pour des communautés mal desservies.",
          route: "/case-study-3",
          ctaLabel: "Lire l'étude de cas",
        },
        {
          id: 2,
          title: "Vision long terme pour Fulfillment chez Etsy",
          company: "Etsy",
          image: "/img/etsy-vision-cover.png?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Étude de cas sur la vision fulfillment chez Etsy montrant le processus et les résultats",
          challenge:
            "Les équipes avaient des objectifs à court terme et des roadmaps, mais il leur manquait un cap pour orienter leurs décisions et les aligner avec la direction prise par l'entreprise.",
          route: "/case-study-2",
          ctaLabel: "Lire l'étude de cas",
        },
        {
          id: 3,
          title: "Refonte rapide du registre Walmart",
          company: "Walmart",
          image: "/img/baby-registry-walmart.png?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Étude de cas du registre Walmart montrant le processus de design et ses résultats",
          challenge:
            "En un trimestre : concevoir, développer et lancer une expérience de registre bébé améliorée corrigeant les limites de l'outil précédent.",
          goals: [
            "Augmenter la qualité des créations de registres (créations menant à une première action de curation)",
            "Augmenter la curation de 10 %",
            "Augmenter le partage de 20 %",
            "Augmenter la conversion d'achat de 25 %",
            "Accompagner les nouveaux parents dans cette étape importante de leur vie",
          ],
          route: "/case-study-1",
          ctaLabel: "Lire l'étude de cas",
        },
        {
          id: 4,
          title: "Autres projets",
          company: "Walmart eCommerce",
          image: "/img/other-main.jpg?auto=format&fit=crop&w=800&q=80",
          imageAlt: "Autres exemples de travail montrant la stratégie produit et le leadership design",
          challenge:
            "Voici quelques exemples plus anciens de mon influence dans la conduite de la stratégie produit grâce au leadership design",
          route: "/case-study-4",
          ctaLabel: "Voir les projets",
        },
      ],
    },
    contact: {
      title: "Entrons en contact",
      intro:
        "Envie d'échanger ? Je serais ravi d'entendre vos enjeux et d'explorer de potentielles opportunités.",
      location: "Portland, Oregon",
    },
    uxTips: {
      title: "Conseils UX",
      intro: "Vous êtes venu chercher des conseils ? En voici un.",
      buttonLabel: "Obtenir un conseil UX",
      tips: [
        "Pensez à l'accessibilité dès le départ, pas comme à une étape ajoutée plus tard.",
        "Utilisez une hiérarchie visuelle claire pour guider les personnes à travers les tâches importantes.",
        "Faites passer le contenu avant la décoration : la clarté l'emporte sur l'effet.",
        "Rédigez un microcopy humain, utile et adapté au contexte.",
        "Assurez un contraste suffisant entre les couleurs pour la lisibilité et l'accessibilité.",
        "Fournissez un retour immédiat et clair après chaque action utilisateur.",
        "Gardez la navigation simple et prévisible pour réduire la charge cognitive.",
        "N'écrasez pas les utilisateurs sous trop de choix : simplifiez les chemins vers l'action.",
        "Utilisez la divulgation progressive pour révéler la complexité uniquement quand c'est nécessaire.",
        "Testez vos designs avec de vrais utilisateurs tôt et souvent afin de révéler les angles morts.",
        "Concevez des interfaces responsives qui s'adaptent naturellement à tous les appareils.",
        "Exploitez l'espace blanc pour créer de la respiration et attirer l'attention là où il faut.",
        "Les messages d'erreur doivent guider, pas faire la morale : proposez des solutions, pas des reproches.",
        "Utilisez des patterns de design cohérents pour instaurer familiarité et confiance.",
        "Gardez le texte d'interface aligné avec la voix et le ton de la marque.",
        "Priorisez la performance : une expérience lente est une mauvaise expérience.",
        "Concevez les interactions IA de manière transparente sur ce qui se passe réellement.",
        "Lorsque vous utilisez l'IA, donnez aux utilisateurs le contrôle pour accepter, rejeter ou modifier les résultats.",
        "Les recommandations de l'IA doivent expliquer pourquoi elles sont proposées.",
        "Évitez les dark patterns : la confiance se construit en respectant l'intention des utilisateurs.",
        "Utilisez les données de manière responsable : la confidentialité doit être un choix de design, pas seulement une politique.",
        "La personnalisation doit enrichir l'expérience, pas devenir intrusive : respectez les limites.",
        "Prenez en charge la navigation clavier et les lecteurs d'écran pour une expérience inclusive.",
        "Testez les designs dans des conditions réelles, pas seulement dans des contextes idéaux de laboratoire.",
        "Concevoir en mobile-first permet aux expériences de grandir correctement plutôt que de se casser.",
        "Utilisez une iconographie familière, mais ajoutez des libellés lorsque la clarté est menacée.",
        "Réduisez les saisies nécessaires grâce à des valeurs par défaut intelligentes et à l'autocomplétion.",
        "Découpez l'information en sections digestes pour améliorer la compréhension.",
        "Affichez des états de chargement : l'incertitude est pire que l'attente.",
        "Utilisez les états vides comme des occasions de guider ou d'éduquer.",
        "Concevez toujours en pensant aux cas limites, pas seulement au scénario idéal.",
        "Trouvez l'équilibre entre esthétique et fonction : ce qui est beau ne sert à rien si cela crée de la confusion.",
        "Évitez le jargon ; parlez la langue de vos utilisateurs.",
        "Concevez des formulaires courts, clairs et tolérants aux erreurs.",
        "Utilisez l'IA pour automatiser les tâches répétitives, pas les décisions critiques.",
        "Les chatbots IA doivent pouvoir passer la main à un humain avec naturel lorsque c'est nécessaire.",
        "Quand vous intégrez de l'IA, cadrez les attentes : ne sur-vendez pas son intelligence.",
        "Proposez des actions d'annulation pour donner confiance dans l'exploration.",
        "Pensez l'onboarding comme une expérience, pas comme un déversement de tutoriels.",
        "Respectez le temps des utilisateurs : par défaut, moins de notifications vaut mieux.",
        "Donnez toujours la priorité au contenu critique au-dessus de la ligne de flottaison.",
        "Les prédictions alimentées par l'IA doivent améliorer l'efficacité, pas dicter les comportements.",
        "Les indices visuels comme la couleur et le mouvement doivent soutenir le sens, pas distraire.",
        "Ne cachez pas les actions clés : rendez les boutons principaux distincts et explicites.",
        "Utilisez l'analytics pour suivre les comportements, mais validez-les avec des insights qualitatifs.",
        "Les améliorations d'accessibilité profitent souvent à tout le monde, pas seulement à certains.",
        "La cohérence entre les plateformes réduit la friction d'apprentissage.",
        "Prévenez les erreurs dans les parcours, ne vous contentez pas de les gérer après coup.",
        "Quand c'est possible, laissez les utilisateurs prévisualiser avant de valider (par exemple, des modifications ou des achats).",
        "Les fonctionnalités IA doivent respecter les nuances culturelles et l'inclusion.",
        "Utilisez le chargement progressif pour les contenus lourds comme les images ou les grands ensembles de données.",
        "Guidez les utilisateurs avec des parcours étape par étape pour les tâches complexes.",
        "Quand les utilisateurs réussissent, célébrez leur progression avec subtilité.",
        "Ne cachez ni les coûts ni les exigences : soyez clair dès le départ pour instaurer la confiance.",
        "Privilégiez la clarté à l'originalité dans les libellés de navigation.",
        "Faites de la recherche une fonctionnalité de premier plan, pas une pensée secondaire.",
        "Prenez en charge les fonctions annuler/rétablir partout où c'est pertinent.",
        "Les interfaces vocales pilotées par l'IA doivent confirmer la compréhension avant d'agir.",
        "Évitez de forcer la création d'un compte trop tôt : laissez les utilisateurs explorer d'abord.",
        "Priorisez la facilité d'apprentissage pour les nouveaux venus et l'efficacité pour les experts.",
        "Utilisez les animations avec parcimonie pour renforcer les transitions ou les changements d'état.",
        "Montrez aux utilisateurs où ils se trouvent grâce à des breadcrumbs ou des indicateurs de progression.",
        "Les erreurs doivent ressembler à des accrocs récupérables, pas à des impasses.",
        "L'IA doit s'adapter aux modèles mentaux des utilisateurs, pas leur imposer de nouveaux repères.",
        "N'exigez pas des saisies parfaites : concevez des recherches et formulaires tolérants.",
        "Proposez des info-bulles ou de l'aide inline pour les fonctionnalités complexes.",
        "L'IA doit mettre en avant des recommandations, tout en laissant la décision finale à l'utilisateur.",
        "Soyez attentif à l'accessibilité lorsque vous utilisez du mouvement ou des effets de parallaxe.",
        "Mettez en évidence les changements d'état du système en temps réel (par exemple, la sauvegarde d'un brouillon).",
        "Prévoyez plusieurs façons d'accomplir une même tâche.",
        "Appuyez-vous sur des schémas issus des expériences du quotidien.",
        "Le design inclusif bénéficie à tout le monde : partez du principe que la diversité est la norme.",
        "Permettez aux utilisateurs de personnaliser leur expérience sans les submerger.",
        "N'activez pas les notifications par défaut : elles doivent être choisies ou vraiment utiles.",
        "Concevez les suggestions IA avec des niveaux de confiance quand c'est possible.",
        "Pensez aux situations hors ligne et à une dégradation fonctionnelle élégante.",
        "Utilisez enquêtes et boucles de feedback pour boucler le cycle de recherche utilisateur.",
        "Priorisez la lisibilité en balayage : les utilisateurs ne lisent pas, ils scannent.",
        "Rédigez des appels à l'action clairs avec des verbes forts.",
        "Les générateurs de texte IA doivent permettre une édition humaine pour affiner les résultats.",
        "Évitez l'inflation fonctionnelle : concevez pour des besoins réels, pas pour toutes les possibilités.",
        "Utilisez la couleur pour servir la fonction, pas seulement l'esthétique.",
        "Permettez la personnalisation des préférences d'accessibilité (par exemple, la taille du texte).",
        "Respectez la charge cognitive : n'encombrez pas les dashboards de données inutiles.",
        "Assurez une continuité entre appareils afin que chacun puisse reprendre où il s'était arrêté.",
        "Les résumés IA doivent faire ressortir l'essentiel sans masquer le contexte.",
        "Concevez pour la confiance : stabilité visuelle, cohérence et intention claire comptent énormément.",
        "Évitez les gestes ambigus ; assurez-vous que les zones tactiles sont suffisamment grandes.",
        "Tenez compte des différences culturelles dans les couleurs, les symboles et la formulation.",
        "Concevez des écrans skeleton pour améliorer la perception du temps de chargement.",
        "Faites de la transparence une priorité lorsque vous collectez des données utilisateur.",
        "Ne partez pas du principe que l'IA a toujours raison : laissez les utilisateurs vérifier.",
        "Prévoyez toujours des sorties : n'enfermez jamais les utilisateurs dans une boucle.",
        "Gardez une typographie lisible : ne sacrifiez pas la lecture au style.",
        "Équilibrez recherche qualitative et métriques quantitatives.",
        "Une bonne UX passe à l'échelle : concevez pour aujourd'hui, avec demain en tête.",
        "Faites en sorte que les fonctionnalités IA assistent, sans devenir intrusives.",
        "Concevez toujours avec empathie : comprenez avant de supposer.",
      ],
    },
    footer: {
      copyright: "© 2024 Chad Mortensen. Tous droits réservés.",
    },
    notFound: {
      title: "Oups, page introuvable",
      cta: "Retour à l'accueil",
    },
  },
};
