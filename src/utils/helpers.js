export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function lerp(start, end, t) {
  return start + (end - start) * t;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export const componentMap = {
  MiniGameZone: () => import('../components/interactive/MiniGameZone'),
  AnimationLab: () => import('../components/interactive/AnimationLab'),
  ApiApp: () => import('../components/interactive/ApiApp'),
  SkillSimulator: () => import('../components/interactive/SkillSimulator'),
  ChatAssistant: () => import('../components/interactive/ChatAssistant'),
  ThemeCustomizer: () => import('../components/interactive/ThemeCustomizer'),
};
