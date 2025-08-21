import { Module } from "@/components/EditableModule";

export interface MainPageSection {
  title: string;
  subheader?: string;
  modules: Module[];
}

export const defaultMainPageContent: {
  title: string;
  subtitle: string;
  sections: MainPageSection[];
} = {
  title: "Chad Mortensen",
  subtitle: "Product design leader with 25+ years turning complex problems into meaningful outcomes",
  sections: [
    {
      title: "About Me",
      subheader: "Product design leader with 25+ years of experience",
      modules: [
        {
          id: "about-background",
          type: "text",
          content: {
            text: "<h3>Background</h3><p>I'm a product design leader with 25+ years of experience turning complex problems into meaningful outcomes — by guiding teams, shaping culture, and building thoughtful, scalable design solutions across eCommerce, health tech, and omnichannel platforms.</p>"
          },
          column: "left"
        },
        {
          id: "about-passion",
          type: "text",
          content: {
            text: "<h3>My Passion</h3><p>I believe great design starts with empathy, scales with systems thinking, and succeeds through collaboration. Whether leading design at Brightside Health, Etsy, or Walmart, I focus on aligning teams around clear goals, supporting individual growth, and delivering thoughtful, high-impact experiences.</p>"
          },
          column: "left"
        },
        {
          id: "about-outside",
          type: "text",
          content: {
            text: "<h3>Outside of Work</h3><p>I'm a dad of two, a fan of quiet weekends on our 20-acre rural property, and married to a pastry chef who runs a local cooking school. Food, friends, and meaningful conversations are my happy place.<br /><br />Also, I have a framed picture of Yoda in a three-piece suit hanging in my office. Interpret that however you'd like.</p>"
          },
          column: "right"
        }
      ]
    },
    {
      title: "Experience",
      subheader: "25+ years of design leadership across health tech, eCommerce, and retail",
      modules: [
        {
          id: "experience-intro",
          type: "text",
          content: {
            text: "<p>25+ years of design leadership across health tech, eCommerce, and retail, driving meaningful outcomes through human-centered design.</p>"
          },
          column: "full"
        }
      ]
    },
    {
      title: "My Leadership Style",
      subheader: "Creating environments where people can thrive, grow, and do their best work",
      modules: [
        {
          id: "leadership-intro",
          type: "text",
          content: {
            text: "<p>Leading design teams is about more than setting direction — it's about creating an environment where people can thrive, grow, and do their best work. Here's what I believe makes that possible:</p>"
          },
          column: "full"
        },
        {
          id: "leadership-principles",
          type: "bullets",
          content: {
            title: "Leadership Principles",
            items: [
              "Transparency builds trust - I lead with honesty and clarity — sharing context, being direct, and creating space for open conversations. Trust starts with being someone your team can count on.",
              "Celebrate progress, not just outcomes - Design is demanding — it's easy to skip the moments that matter. I make time to recognize great work, reflect on what we've learned, and keep morale high.",
              "Diverse perspectives make better products - I believe the best teams reflect a range of backgrounds and experiences. Diversity makes our work stronger, more inclusive, and more relevant.",
              "Craft matters - I set a high bar for quality, while supporting accountability and growth. Our work should be effective, thoughtful — and something we're proud to stand behind."
            ]
          },
          column: "full"
        }
      ]
    },
    {
      title: "Value I Bring",
      subheader: "Focus on the work that drives clarity, alignment, and impact",
      modules: [
        {
          id: "value-intro",
          type: "text",
          content: {
            text: "<p>As a product design leader, I wear many hats — and I focus on the work that drives clarity, alignment, and impact across the organization.</p>"
          },
          column: "full"
        },
        {
          id: "value-props",
          type: "bullets",
          content: {
            title: "Key Value Areas",
            items: [
              "Build trusted cross-functional partnerships - Strong collaboration with product, engineering, analytics, and research is foundational. I invest early and consistently in these relationships to ensure design is part of strategic decision-making — not an afterthought.",
              "Connect design to company strategy - I help design teams zoom out. By aligning day-to-day efforts with broader business goals, I ensure we're focusing on what matters most — advocating for the right resourcing and investing in high-leverage work.",
              "Grow people and careers - Coaching is core to my leadership. I guide performance with empathy and clarity, give honest and useful feedback, and create opportunities for career progression. I strive to make growth conversations feel supportive, not evaluative.",
              "Design for team health and effectiveness - I keep a pulse on team morale and operational clarity — listening for signals and adjusting processes, rituals, or roles to support long-term health, cohesion, and effectiveness.",
              "Contribute to org-wide design culture - Beyond my direct team, I contribute to the broader design organization — leading or sponsoring initiatives around hiring, recognition, design thinking, and internal education that make the culture stronger and more inclusive."
            ]
          },
          column: "full"
        }
      ]
    },
    {
      title: "Additional projects",
      subheader: "Walmart eCommerce",
      modules: [
        {
          id: "additional-projects-description",
          type: "text",
          content: {
            text: "<p>Here are some past examples of my influence in driving product strategy through design leadership</p>"
          },
          column: "full"
        }
      ]
    },
    {
      title: "Let's Connect",
      subheader: "Ready to chat about opportunities and challenges",
      modules: [
        {
          id: "contact-info",
          type: "text",
          content: {
            text: "<p>Ready to chat? I'd love to hear about your challenges and explore potential opportunities.</p><ul><li>Email: chadmor@gmail.com</li><li>LinkedIn: linkedin.com/in/chadmortensen</li><li>Phone: (503) 347-0199</li><li>Location: Portland, Oregon</li></ul>"
          },
          column: "full"
        }
      ]
    }
  ]
};