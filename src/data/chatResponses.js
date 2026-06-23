import { looksLikeTypo } from '../utils/gibberishDetection';

const TYPO_RESPONSE =
  'This seems like a typo. Try asking something about me.';

const responses = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! Welcome to my cosmic portfolio. I'm Lirisha, a frontend developer who loves building immersive web experiences. What would you like to know?",
  },
  {
    keywords: ['skill', 'technology', 'tech', 'stack', 'tools'],
    response: "My core stack includes React.js, JavaScript (ES6+), HTML5, CSS3, Next.js, and Tailwind CSS. I also work with REST APIs, WordPress, ClickFunnels, Git/GitHub/Bitbucket, Jira, and AI tools like Cursor and GitHub Copilot. Check the Skills section for the full breakdown!",
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'background'],
    response: "I have 4.5+ years of frontend development experience. Currently Frontend Developer II at Z1 Tech (Delhi), previously Programmer Analyst Trainee at Cognizant. Scroll to the Experience section for the full timeline!",
  },
  {
    keywords: ['education', 'degree', 'college', 'university', 'school', 'study', 'btech'],
    response: "I hold a B.Tech in Electronics and Communication Engineering from Bharati Vidyapeeth College of Engineering, Delhi (2019–2022). Check the Education section for details!",
  },
  {
    keywords: ['project', 'portfolio', 'built', 'created'],
    response: "I've built everything from design systems to 3D e-commerce platforms. This portfolio itself showcases my skills — try the Mini Game Zone, Animation Lab, or API Explorer in the Projects section!",
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'available'],
    response: "I'd love to connect! You can reach me at tayallirisha@gmail.com or call +91 8851409127. Use the Contact section to send a message — I'm open to exciting frontend opportunities!",
  },
  {
    keywords: ['3d', 'three', 'webgl', 'r3f', 'fiber'],
    response: "3D web is my passion! I use React Three Fiber and Drei to create performant WebGL experiences. This portfolio's space environment, skill planets, and holographic cards are all built with R3F.",
  },
  {
    keywords: ['animation', 'gsap', 'motion', 'framer'],
    response: "Animations bring interfaces to life! I use GSAP for complex timeline animations and Framer Motion for React-native gestures and transitions. Check the Animation Lab to see them in action!",
  },
  {
    keywords: ['design', 'ui', 'ux', 'figma'],
    response: "I believe great code starts with great design. I work closely with design systems, ensuring pixel-perfect implementation with attention to spacing, typography, and micro-interactions.",
  },
  {
    keywords: ['name', 'who are you', 'about you', 'introduce'],
    response: "I'm Lirisha Tayal, a passionate Frontend Developer who crafts beautiful, performant, and interactive web experiences with React, Next.js, and Three.js. Based in Delhi, India.",
  },
  {
    keywords: ['easter', 'egg', 'secret', 'hidden'],
    response: "You found a secret! Try the Konami code (↑↑↓↓←→←→BA) in the footer for a coffee-powered surprise — or explore the floating shapes in the hero section.",
  },
];

const defaultResponses = [
  "That's an interesting question! I specialize in React, Three.js, and creating immersive web experiences. Try asking about my skills, projects, or experience!",
  "I'm not sure about that specific topic, but I'd love to tell you about my work! Ask me about my tech stack, projects, or how to get in touch.",
  "Great question! As a frontend developer, I focus on performance, accessibility, and stunning visuals. What aspect of my work interests you most?",
];

export function getChatResponse(input) {
  const normalized = input.toLowerCase().trim();
  if (!normalized) return "Type something and I'll do my best to help!";

  for (const item of responses) {
    if (item.keywords.some((kw) => normalized.includes(kw))) {
      return item.response;
    }
  }

  if (looksLikeTypo(normalized)) {
    return TYPO_RESPONSE;
  }

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
