import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const getParsedDate = (number: number) => {
  const timestamp = Math.floor(Number(number))
  const dateObj = new Date(timestamp);

  return `${dateObj.getDate()} de ${MONTHS[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
};
