/**
 * Navigation helper
 * Centralizes router.push calls so components import functions instead of
 * duplicating route objects. Import like:
 *   import { goToTopic } from '@/router/navigation'
 *   goToTopic('PeriodName', 1, 'TopicName', 'topic-id', 'category')
 */
import router from "./index";

// Inlined slugify helper for organization. Keeps slugs cosmetic — the app
// should continue to load pages by numeric IDs while slugs improve SEO.
function slugify(text) {
  if (!text && text !== 0) return "";
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function goToHome() {
  return router.push({ name: "Home" });
}

export function goToUnits() {
  return router.push({ name: "All_Periods" });
}

export function goToPeriod(periodName, period) {
  const periodSlug = slugify(periodName || String(period || ""));
  return router.push({
    name: "Period",
    params: { periodName: periodSlug, period }
  });
}

export function goToTopic(
  periodName,
  period,
  topicName,
  topic,
  category,
  itemTitle // optional: used to generate cosmetic slug for SEO
) {
  const periodSlug = slugify(periodName || String(period || ""));
  const topicSlug = slugify(topicName || String(topic || ""));
  const categorySlug = slugify(category || "");
  const itemSlug = slugify(itemTitle || topicName || "");
  return router.push({
    name: "Topic",
    params: {
      periodName: periodSlug,
      period,
      topicName: topicSlug,
      topic,
      category: categorySlug,
      itemSlug
    }
  });
}

export function goToEvent(
  periodName,
  period,
  topicName,
  topic,
  category,
  event,
  itemTitle // optional: used to generate cosmetic slug for SEO
) {
  const periodSlug = slugify(periodName || String(period || ""));
  const topicSlug = slugify(topicName || String(topic || ""));
  const categorySlug = slugify(category || "");
  const itemSlug = slugify(itemTitle || String(event || ""));
  return router.push({
    name: "Event",
    params: {
      periodName: periodSlug,
      period,
      topicName: topicSlug,
      topic,
      category: categorySlug,
      event,
      itemSlug
    }
  });
}

export function goToPerson(
  periodName,
  period,
  topicName,
  topic,
  category,
  person,
  itemTitle // optional: used to generate cosmetic slug for SEO
) {
  const periodSlug = slugify(periodName || String(period || ""));
  const topicSlug = slugify(topicName || String(topic || ""));
  const categorySlug = slugify(category || "");
  const itemSlug = slugify(itemTitle || String(person || ""));
  return router.push({
    name: "Person",
    params: {
      periodName: periodSlug,
      period,
      topicName: topicSlug,
      topic,
      category: categorySlug,
      person,
      itemSlug
    }
  });
}

export function goToQuiz() {
  return router.push({ name: "Quiz" });
}

export function goToQuizUnit1() {
  return router.push({ name: "QuizUnit1" });
}

// Essay / writing flow routes (use the route names already declared)
export function goToSelectModule() {
  return router.push({ name: "001" });
}

export function goToChoosePrompt(module) {
  return router.push({ name: "002", params: { module } });
}

export function goToLEQEssay(id, module) {
  return router.push({ name: "003", params: { id, module } });
}

export function goToFeedback(id) {
  return router.push({ name: "004", params: { id } });
}

export function goToLabelSection() {
  return router.push({ name: "005" });
}

// Generic helper when caller wants to push by name
export function pushRoute(name, params = {}, query = {}) {
  return router.push({ name, params, query });
}

export default {
  goToHome,
  goToUnits,
  goToPeriod,
  goToTopic,
  goToEvent,
  goToPerson,
  goToQuiz,
  goToQuizUnit1,
  goToSelectModule,
  goToChoosePrompt,
  goToLEQEssay,
  goToFeedback,
  goToLabelSection,
  pushRoute
};
