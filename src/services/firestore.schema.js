// Converted schema with runtime validators using Zod
// Provides JSDoc typedefs for editors and Zod schemas for runtime validation.
import { z } from "zod";

/**
 * Topic
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} title
 * @property {string} unit
 * @property {number} timePeriod
 * @property {string=} timespan
 * @property {boolean=} enabled
 * @property {Array=} introMD - rich text delta array for intro
 * @property {string=} intro_thumbFile
 * @property {string=} intro_thumbURL
 * @property {string[]=} searchArray
 * @property {string=} topic_thumbFile
 * @property {string=} topic_thumbURL
 */
export const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  unit: z.string(),
  timePeriod: z.number(),
  timespan: z.string().optional(),
  enabled: z.boolean().optional(),
  introMD: z.array(z.any()).optional(),
  intro_thumbFile: z.string().optional(),
  intro_thumbURL: z.string().optional(),
  searchArray: z.array(z.string()).optional(),
  topic_thumbFile: z.string().optional(),
  topic_thumbURL: z.string().optional()
});

/**
 * Event
 * @typedef {Object} Event
 * @property {string} id
 * @property {string[]=} topicID
 * @property {string} title
 * @property {string=} descriptionMD - markdown/plain text description
 * @property {Array=} mainMD - rich text delta array (keeps Quill/Delta structure)
 * @property {{date: string, era: boolean}=} startDate
 * @property {{date: string, era: boolean}=} endDate
 * @property {string[]=} searchArray
 * @property {string[]=} theme
 * @property {string=} thumbFile
 * @property {string=} thumbURL
 * @property {string=} imageData
 * @property {{[region:string]: {lat: number, lon: number}[]}=} coordinates - map of region/country keys to arrays of {lat, lon}
 */
export const EventSchema = z.object({
  id: z.string(),
  topicID: z.array(z.string()).optional(),
  title: z.string(),
  descriptionMD: z.string().optional(),
  mainMD: z.array(z.any()).optional(),
  startDate: z
    .object({ date: z.string(), era: z.boolean().optional() })
    .optional(),
  endDate: z
    .object({ date: z.string(), era: z.boolean().optional() })
    .optional(),
  searchArray: z.array(z.string()).optional(),
  theme: z.array(z.string()).optional(),
  thumbFile: z.string().optional(),
  thumbURL: z.string().optional(),
  imageData: z.string().optional(),
  // coordinates: map of region/country keys to an array of { lat, lon } objects
  // example: { France: [ { lat: 48.55, lon: -4.80 } ] }
  coordinates: z
    .record(z.array(z.object({ lat: z.number(), lon: z.number() })))
    .optional()
});

/**
 * Trend
 * @typedef {Object} Trend
 * @property {string} id
 * @property {string[]=} topicID
 * @property {string} trend - Full descriptive text of the trend
 * @property {string} trendName - short name/category (e.g. "change")
 * @property {string} type - trend type (e.g. "technology")
 */
export const TrendSchema = z.object({
  id: z.string(),
  topicID: z.array(z.string()).optional(),
  trend: z.string().optional(),
  trendName: z.string().optional(),
  type: z.string().optional()
});

/**
 * Person
 * @typedef {Object} Person
 * @property {string} id
 * @property {string[]=} topicID
 * @property {string} name
 * @property {{date: string, era: boolean}=} dateOfBirth
 * @property {{date: string, era: boolean}=} dateOfPassing
 * @property {string=} mainMD
 * @property {string[]=} searchArray
 * @property {string=} thumbFile
 * @property {string=} thumbURL
 */
export const PersonSchema = z.object({
  id: z.string(),
  topicID: z.array(z.string()).optional(),
  name: z.string(),
  dateOfBirth: z
    .object({ date: z.string(), era: z.boolean().optional() })
    .optional(),
  dateOfPassing: z
    .object({ date: z.string(), era: z.boolean().optional() })
    .optional(),
  mainMD: z.string().optional(),
  searchArray: z.array(z.string()).optional(),
  thumbFile: z.string().optional(),
  thumbURL: z.string().optional()
});

/**
 * Work
 * @typedef {Object} Work
 * @property {string} id
 * @property {string[]=} topicID
 * @property {string} title
 * @property {string=} caption
 * @property {string[]=} searchArray
 * @property {string=} thumbFile
 * @property {string=} thumbURL
 */
export const WorkSchema = z.object({
  id: z.string(),
  topicID: z.array(z.string()).optional(),
  title: z.string(),
  caption: z.string().optional(),
  searchArray: z.array(z.string()).optional(),
  thumbFile: z.string().optional(),
  thumbURL: z.string().optional()
});

/**
 * Term
 * @typedef {Object} Term
 * @property {string} id
 * @property {string[]=} topicID
 * @property {string} term
 * @property {string=} def - definition or description
 * @property {string[]=} searchArray
 * @property {string=} thumbFile
 * @property {string=} thumbURL
 */
export const TermSchema = z.object({
  id: z.string(),
  topicID: z.array(z.string()).optional(),
  term: z.string(),
  def: z.string().optional(),
  searchArray: z.array(z.string()).optional(),
  thumbFile: z.string().optional(),
  thumbURL: z.string().optional()
});

/**
 * Resource
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string[]=} topicID
 * @property {('topic'|'people'|'event')=} parentType
 * @property {string=} parentID
 * @property {string=} resourceType
 * @property {string[]=} searchArray
 * @property {string=} title
 * @property {string=} url
 */
export const ResourceSchema = z.object({
  id: z.string(),
  topicID: z.array(z.string()).optional(),
  parentType: z
    .union([z.literal("topic"), z.literal("people"), z.literal("event")])
    .optional(),
  parentID: z.string().optional(),
  resourceType: z.string().optional(),
  searchArray: z.array(z.string()).optional(),
  title: z.string().optional(),
  url: z.string().optional()
});

export default {
  TopicSchema,
  EventSchema,
  TrendSchema,
  PersonSchema,
  WorkSchema,
  TermSchema,
  ResourceSchema
};
