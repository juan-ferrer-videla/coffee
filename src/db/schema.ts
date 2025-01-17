import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
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

export const presentialCourseTable = sqliteTable("presential_course", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("").notNull(),
  initialDate: text("initial_date").notNull(),
  instructor: text("instructor").notNull(),
  instructorImg: text("instructor_img").notNull(),
  instructorDescription: text("instructor_description").notNull(),
  schedule: text("schedule").notNull(),
  content: text("content").notNull(),
  vacancies: integer("vacancies").notNull(),
  location: text("location").notNull(),
});

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  img: text("img").notNull(),
  price: integer("price").notNull(),
  delivery: integer("delivery", { mode: "boolean" }).default(true).notNull(),
  isRecommended: integer("is_recommended", { mode: "boolean" })
    .default(true)
    .notNull(),
});

export const eventsTable = sqliteTable("events", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  img: text("img").notNull(),
  description: text("description").notNull(),
});

export const usersToProducts = sqliteTable("users_to_products", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id),
  quantity: integer("quantity").notNull(),
  status: text("status", { enum: ["pending", "dispatched", "delivered"] })
    .notNull()
    .default("pending"),
  purchasedAt: text("purchased_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
export const usersRelations = relations(usersTable, ({ many }) => ({
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
    user: one(usersTable, {
      fields: [usersToProducts.userId],
      references: [usersTable.id],
    }),
  }),
);

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertProduct = typeof productsTable.$inferInsert;
export type SelectProduct = typeof productsTable.$inferSelect;

export type InsertUserToProduct = typeof usersToProducts.$inferInsert;
export type SelectUserToProduct = typeof usersToProducts.$inferSelect;

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;

export type InsertPresencialCourse = typeof presentialCourseTable.$inferInsert;
export type SelectPresencialCourse = typeof presentialCourseTable.$inferSelect;

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
  delivery: z.string(),
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
  publicId: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  location: z.string(),
  initialDate: z.string(),
  schedule: z.string(),
  instructor: z.string(),
  instructorImg: z.instanceof(File).optional(),
  instructorDescription: z.string(),
  content: z.string(),
  vacancies: z.string(),
});
