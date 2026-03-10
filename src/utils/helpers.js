import { v4 as uuidv4 } from 'uuid';

export function generateId() {
  return uuidv4();
}

export function calculateProgress(subgoals) {
  if (!subgoals || subgoals.length === 0) return 0;
  const completed = subgoals.filter(sg => sg.completed).length;
  return Math.round((completed / subgoals.length) * 100);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getMotivationalQuote() {
  const quotes = [
    "A goal without a plan is just a wish.",
    "Small steps lead to big changes.",
    "Focus on progress, not perfection.",
    "Your only limit is your mind.",
    "Start where you are. Use what you have.",
    "Every day is a fresh start.",
    "Done is better than perfect.",
    "Make it happen.",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}
