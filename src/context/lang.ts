import { TDictionary } from "@/get-dictionary";
import { createContext } from "react";

export const langContext = createContext<null | TDictionary>(null);
