import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  dni: integer("dni").unique(),
  phone: text("phone"),
  street: text("street"),
  streetNumber: integer("street_number"),
  postalCode: text("postal_code"),
  city: text("city"),
  state: text("state"),
  indications: text("indications"),
});

export const adminsTable = sqliteTable("admins", {
  id: integer("id").primaryKey(),
  email: text("email").unique().notNull(),
});

export const presentialCoursesTable = sqliteTable("presential_courses", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  img: text("img").notNull(),
  introVideoURL: text("intro_video_url").notNull(),
  initialDate: text("initial_date").notNull(),
  instructor: text("instructor").notNull(),
  instructorImg: text("instructor_img").notNull(),
  instructorDescription: text("instructor_description").notNull(),
  schedule: text("schedule").notNull(),
  content: text("content").notNull(),
  vacancies: integer("vacancies").notNull(),
  location: text("location").notNull(),
});

export const remoteCoursesTable = sqliteTable("remote_courses", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  img: text("img").notNull(),
  introVideoURL: text("intro_video_url").notNull(),
  instructor: text("instructor").notNull(),
  instructorImg: text("instructor_img").notNull(),
  instructorDescription: text("instructor_description").notNull(),
  content: text("content").notNull(),
});

export const remoteModulesTable = sqliteTable("remote_modules", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  remoteCourseId: integer("remote_course_id")
    .notNull()
    .references(() => remoteCoursesTable.id, { onDelete: "cascade" }),
});

export const remoteModuleFilesTable = sqliteTable("remote_module_files", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  file: text("file").notNull(),
  url: text("url").notNull(),
  remoteModuleId: integer("remote_module_id")
    .notNull()
    .references(() => remoteModulesTable.id, { onDelete: "cascade" }),
});

export const remoteModuleVideosTable = sqliteTable("remote_module_videos", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  remoteModuleId: integer("remote_module_id")
    .notNull()
    .references(() => remoteModulesTable.id, { onDelete: "cascade" }),
});

export const moduleQuestionsTable = sqliteTable("module_questions", {
  id: integer("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  remoteModuleId: integer("remote_module_id")
    .notNull()
    .references(() => remoteModulesTable.id, { onDelete: "cascade" }),
});

export const moduleQuestionChoicesTable = sqliteTable(
  "module_question_choices",
  {
    id: integer("id").primaryKey(),
    choice: text("choice").notNull(),
    moduleQuestionId: integer("module_question_id")
      .notNull()
      .references(() => moduleQuestionsTable.id, { onDelete: "cascade" }),
  },
);

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  img: text("img").notNull(),
  price: integer("price").notNull(),
  isRecommended: integer("is_recommended", { mode: "boolean" })
    .default(true)
    .notNull(),
});

export const eventsTable = sqliteTable("events", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  date: integer("date").notNull(),
  img: text("img").notNull(),
  description: text("description").notNull(),
});

export const usersToProducts = sqliteTable("users_to_products", {
  id: integer("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  delivery: integer("delivery", { mode: "boolean" }).default(true).notNull(),
  status: text("status", { enum: ["pending", "dispatched", "delivered"] })
    .notNull()
    .default("pending"),
  purchasedAt: text("purchased_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const usersToPresentialCourses = sqliteTable(
  "users_to_presential_courses",
  {
    id: integer("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    presentialCourseId: integer("presential_course_id")
      .notNull()
      .references(() => presentialCoursesTable.id, { onDelete: "cascade" }),
    purchasedAt: text("purchased_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
);

export const usersToRemoteCourses = sqliteTable("users_to_remote_courses", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  remoteCourseId: integer("remote_course_id")
    .notNull()
    .references(() => remoteCoursesTable.id, { onDelete: "cascade" }),
  purchasedAt: text("purchased_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const usersRelations = relations(user, ({ many }) => ({
  usersToProducts: many(usersToProducts),
}));

export const productsRelations = relations(productsTable, ({ many }) => ({
  usersToProducts: many(usersToProducts),
}));

export const usersToProductsRelations = relations(
  usersToProducts,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [usersToProducts.productId],
      references: [productsTable.id],
    }),
    user: one(user, {
      fields: [usersToProducts.userId],
      references: [user.id],
    }),
  }),
);

export const usersToPresentialCoursesRelations = relations(
  usersToPresentialCourses,
  ({ one }) => ({
    presentialCourses: one(presentialCoursesTable, {
      fields: [usersToPresentialCourses.presentialCourseId],
      references: [presentialCoursesTable.id],
    }),
    user: one(user, {
      fields: [usersToPresentialCourses.userId],
      references: [user.id],
    }),
  }),
);

export const usersToRemoteCoursesRelations = relations(
  usersToRemoteCourses,
  ({ one }) => ({
    remoteCourses: one(remoteCoursesTable, {
      fields: [usersToRemoteCourses.remoteCourseId],
      references: [remoteCoursesTable.id],
    }),
    user: one(user, {
      fields: [usersToRemoteCourses.userId],
      references: [user.id],
    }),
  }),
);

export const remoteCourseRelations = relations(
  remoteCoursesTable,
  ({ many }) => ({
    modules: many(remoteModulesTable),
  }),
);

export const remoteModuleRelations = relations(
  remoteModulesTable,
  ({ one, many }) => ({
    module: one(remoteCoursesTable, {
      fields: [remoteModulesTable.remoteCourseId],
      references: [remoteCoursesTable.id],
    }),
    questions: many(moduleQuestionsTable),
    files: many(remoteModuleFilesTable),
    videos: many(remoteModuleVideosTable),
  }),
);

export const remoteModuleVideoRelations = relations(
  remoteModuleVideosTable,
  ({ one }) => ({
    module: one(remoteModulesTable, {
      fields: [remoteModuleVideosTable.remoteModuleId],
      references: [remoteModulesTable.id],
    }),
  }),
);

export const remoteModuleFileRelations = relations(
  remoteModuleFilesTable,
  ({ one }) => ({
    module: one(remoteModulesTable, {
      fields: [remoteModuleFilesTable.remoteModuleId],
      references: [remoteModulesTable.id],
    }),
  }),
);

export const moduleQuestionRelations = relations(
  moduleQuestionsTable,
  ({ one, many }) => ({
    module: one(remoteModulesTable, {
      fields: [moduleQuestionsTable.remoteModuleId],
      references: [remoteModulesTable.id],
    }),
    items: many(moduleQuestionChoicesTable),
  }),
);

export const moduleQuestionChoiceRelations = relations(
  moduleQuestionChoicesTable,
  ({ one }) => ({
    module: one(moduleQuestionsTable, {
      fields: [moduleQuestionChoicesTable.moduleQuestionId],
      references: [moduleQuestionsTable.id],
    }),
  }),
);

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;

export type InsertUserToProduct = typeof usersToProducts.$inferInsert;
export type SelectUserToProduct = typeof usersToProducts.$inferSelect;

export type InsertUserToPresentialCourse =
  typeof usersToPresentialCourses.$inferInsert;
export type SelectUserToPresentialCourse =
  typeof usersToPresentialCourses.$inferSelect;

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;

export type InsertPresencialCourse = typeof presentialCoursesTable.$inferInsert;
export type SelectPresencialCourse = typeof presentialCoursesTable.$inferSelect;

export type InsertRemoteCourse = typeof remoteCoursesTable.$inferInsert;
export type SelectRemoteCourse = typeof remoteCoursesTable.$inferSelect;

export type InsertRemoteModule = typeof remoteModulesTable.$inferInsert;
export type SelectRemoteModule = typeof remoteModulesTable.$inferSelect;

export const statusSchema = z.union([
  z.literal("pending"),
  z.literal("dispatched"),
  z.literal("delivered"),
]);

export const productSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.string(),
  img: z.instanceof(File),
  isRecommended: z.string().optional(),
});

export const editProductSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.string(),
  img: z.instanceof(File).optional(),
  publicId: z.string(),
  id: z.string(),
  isRecommended: z.string().optional(),
});

export const eventSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  img: z.instanceof(File),
});

export const editEventSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  img: z.instanceof(File).optional(),
  id: z.string(),
  publicId: z.string(),
});

export const presentialCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  introVideoURL: z.string(),
  img: z.instanceof(File),
  location: z.string(),
  initialDate: z.string(),
  schedule: z.string(),
  instructor: z.string(),
  instructorImg: z.instanceof(File),
  instructorDescription: z.string(),
  content: z.string(),
  vacancies: z.string(),
});

export const editPresentialCourseSchema = z.object({
  id: z.string(),
  imgPublicId: z.string(),
  publicId: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  img: z.instanceof(File),
  location: z.string(),
  initialDate: z.string(),
  schedule: z.string(),
  instructor: z.string(),
  instructorImg: z.instanceof(File).optional(),
  instructorDescription: z.string(),
  content: z.string(),
  vacancies: z.string(),
});

export const remoteCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  introVideoURL: z.string(),
  img: z.instanceof(File),
  instructor: z.string(),
  instructorImg: z.instanceof(File),
  instructorDescription: z.string(),
  content: z.string(),
});

export const editRemoteCourseSchema = z.object({
  id: z.string(),
  imgPublicId: z.string(),
  publicId: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  img: z.instanceof(File),
  instructor: z.string(),
  instructorImg: z.instanceof(File).optional(),
  instructorDescription: z.string(),
  content: z.string(),
});

export const createModuleSchema = z.object({
  title: z.string(),
  remoteCourseId: z.string(),
});

export const createModuleVideoSchema = z.object({
  title: z.string(),
  remoteModuleId: z.string(),
  url: z.string(),
});

export const createModuleFileSchema = z.object({
  title: z.string(),
  remoteModuleId: z.string(),
  file: z.instanceof(File),
});

export const createModuleQuestionSchema = z.object({
  question: z.string(),
  remoteModuleId: z.string(),
  answer: z.string(),
});

export const createModuleQuestionChoiceSchema = z.object({
  choice: z.string(),
  moduleQuestionId: z.string(),
});
