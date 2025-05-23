"use server";

import { Preference } from "mercadopago";
import type { Items } from "mercadopago/dist/clients/commonTypes";
import { redirect } from "next/navigation";
import { client } from "@/mercadopago";
import {
  getPresentialCourses,
  getPresentialCoursesVacancies,
  getProducts,
  getRemoteCourses,
} from "./actions";

const preference = new Preference(client);

export const createPreference = async (
  store: [string, number][],
  email: string,
  delivery: boolean,
) => {
  const products = await getProducts();
  let total = 0;
  const items = store.reduce<Items[]>((acc, [id, quantity]) => {
    const product = products.find((product) => product.id === parseInt(id));
    if (product && quantity > 0) {
      total += product.price * quantity;
      acc.push({
        id,
        quantity,
        title: product.title,
        unit_price: product.price,
      });
    }
    return acc;
  }, []);
  if (delivery && total < 80000)
    items.push({
      id: "delivery",
      quantity: 1,
      title: "delivery",
      unit_price: 10000,
    });

  const preferenceResponse = await preference.create({
    body: {
      items,
      metadata: { email, delivery },
    },
  });
  const initPoint = preferenceResponse.init_point;

  if (initPoint) {
    redirect(initPoint);
  }
};

export const createCoursePreference = async (
  presentialCourseId: number,
  userId: number,
) => {
  const [courses, courseCount] = await Promise.all([
    getPresentialCourses(),
    getPresentialCoursesVacancies(),
  ]);

  const course = courses.find((course) => course.id === presentialCourseId);
  if (!course || course.vacancies <= courseCount) return;
  const items: Items[] = [
    {
      id: course.id.toString(),
      title: course.title,
      quantity: 1,
      unit_price: course.price,
    },
  ];

  const preferenceResponse = await preference.create({
    body: {
      items,
      metadata: { userId, presentialCourseId },
    },
  });

  const initPoint = preferenceResponse.init_point;

  if (initPoint) {
    redirect(initPoint);
  }
};

export const createRemoteCoursePreference = async (
  remoteCourseId: number,
  userId: number,
) => {
  const courses = await getRemoteCourses();

  const course = courses.find((course) => course.id === remoteCourseId);
  if (!course) return;

  const items: Items[] = [
    {
      id: course.id.toString(),
      title: course.title,
      quantity: 1,
      unit_price: course.price,
    },
  ];

  const preferenceResponse = await preference.create({
    body: {
      items,
      metadata: { userId, remoteCourseId },
    },
  });

  const initPoint = preferenceResponse.init_point;

  if (initPoint) {
    redirect(initPoint);
  }
};
