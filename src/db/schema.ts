import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});

export const coursesTable = sqliteTable("courses", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});

export const usersToCourses = sqliteTable(
  "users_to_courses",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    courseId: integer("course_id")
      .notNull()
      .references(() => coursesTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.courseId] }),
  }),
);
export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToCourses: many(usersToCourses),
}));

export const coursesRelations = relations(coursesTable, ({ many }) => ({
  usersToCourses: many(usersToCourses),
}));

export const usersToCoursesRelations = relations(usersToCourses, ({ one }) => ({
  courses: one(coursesTable, {
    fields: [usersToCourses.courseId],
    references: [coursesTable.id],
  }),
  user: one(usersTable, {
    fields: [usersToCourses.userId],
    references: [usersTable.id],
  }),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertCourse = typeof coursesTable.$inferInsert;
export type SelectCourse = typeof coursesTable.$inferSelect;
