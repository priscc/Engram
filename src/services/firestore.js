import { db } from "@/main";
import {
  TopicSchema,
  EventSchema,
  TrendSchema,
  PersonSchema,
  WorkSchema,
  TermSchema,
  ResourceSchema
} from "./firestore.schema.js";

// Runtime validator helper (uses Zod schemas in firestore.schema.js)
function validateOrWarn(schema, entry, collectionName, docId) {
  // If schema doesn't provide a safeParse (e.g., fallback), skip validation
  if (!schema || typeof schema.safeParse !== "function") return entry;

  const result = schema.safeParse(entry);
  if (!result.success) {
    // Warn but do not modify the returned data — keep original entry
    console.warn(
      `Validation failed for ${collectionName}/${docId}:`,
      result.error.errors
    );
    return entry;
  }

  // Return original entry (preserve any extra fields Firestore may include)
  return entry;
}

// ------------------------------------------------
// Returns an array of topic objects (with `id` field) for the given timePeriod
// ------------------------------------------------
/** Get Topics for a Time Period. @param {number} timePeriod  @returns {Promise<Topic[]>} (see: Topic in firestore.schema.js) */
export async function fetchTopicsByTimePeriod(timePeriod) {
  const results = [];
  const snapshot = await db
    .collection("topics")
    .where("timePeriod", "==", timePeriod)
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(TopicSchema, entry, "topics", doc.id));
  });
  return results;
}

// ------------------------------------------------
// Generic fetch helpers used by the topic store
// ------------------------------------------------

/** Get Events for a Topic. @param {string} topicId  @returns {Promise<Event[]>} (see: Event in firestore.schema.js) */
export async function fetchEventsByTopic(topicId) {
  const results = [];
  const snapshot = await db
    .collection("events")
    .where("topicID", "array-contains-any", [topicId])
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(EventSchema, entry, "events", doc.id));
  });
  return results;
}

/** Get Trends for a Topic. @param {string} topicId  @returns {Promise<Trend[]>} (see: Trend in firestore.schema.js) */
export async function fetchTrendsByTopic(topicId) {
  const results = [];
  const snapshot = await db
    .collection("trends")
    .where("topicID", "array-contains-any", [topicId])
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(TrendSchema, entry, "trends", doc.id));
  });
  return results;
}

/** Get People for a Topic. @param {string} topicId  @returns {Promise<Person[]>} (see: Person in firestore.schema.js) */
export async function fetchPeopleByTopic(topicId) {
  const results = [];
  const snapshot = await db
    .collection("people")
    .where("topicID", "array-contains-any", [topicId])
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(PersonSchema, entry, "people", doc.id));
  });
  return results;
}

/** Get Works for a Topic. @param {string} topicId  @returns {Promise<Work[]>} (see: Work in firestore.schema.js) */
export async function fetchWorksByTopic(topicId) {
  const results = [];
  const snapshot = await db
    .collection("works")
    .where("topicID", "array-contains-any", [topicId])
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(WorkSchema, entry, "works", doc.id));
  });
  return results;
}

/** Get Terms for a Topic. @param {string} topicId  @returns {Promise<Term[]>} (see: Term in firestore.schema.js) */
export async function fetchTerminologyByTopic(topicId) {
  const results = [];
  const snapshot = await db
    .collection("terminology")
    .where("topicID", "array-contains-any", [topicId])
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(TermSchema, entry, "terminology", doc.id));
  });
  return results;
}

// ------------------------------------------------
// Resources: support fetching by topic + parentType or by parentID
// ------------------------------------------------
/** Get Resources for topic+parentType. @param {string} topicId @param {string} parentType  @returns {Promise<Resource[]>} (see: Resource in firestore.schema.js) */
export async function fetchResourcesByTopicAndParentType(topicId, parentType) {
  const results = [];
  const snapshot = await db
    .collection("resources")
    .where("topicID", "array-contains-any", [topicId])
    .where("parentType", "==", parentType)
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(ResourceSchema, entry, "resources", doc.id));
  });
  return results;
}

/** Get Resources for a parent ID. @param {string} parentId  @returns {Promise<Resource[]>} (see: Resource in firestore.schema.js) */
export async function fetchResourcesByParentId(parentId) {
  const results = [];
  const snapshot = await db
    .collection("resources")
    .where("parentID", "==", String(parentId))
    .get();
  snapshot.forEach(doc => {
    const entry = doc.data();
    entry.id = doc.id;
    results.push(validateOrWarn(ResourceSchema, entry, "resources", doc.id));
  });
  return results;
}

export default {
  fetchTopicsByTimePeriod,
  fetchEventsByTopic,
  fetchTrendsByTopic,
  fetchPeopleByTopic,
  fetchWorksByTopic,
  fetchTerminologyByTopic,
  fetchResourcesByTopicAndParentType,
  fetchResourcesByParentId
};
