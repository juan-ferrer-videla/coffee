import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});

export const adminsTable = sqliteTable("admins", {
  id: integer("id").primaryKey(),
  email: text("email").unique().notNull(),
});

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  img: text("img").notNull(),
  price: integer("price").notNull(),
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
