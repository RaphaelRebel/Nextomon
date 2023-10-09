"use client";

import { Children, ReactNode, createContext, useState } from "react";

interface pokeContext {
  // get all data from GetUserPokeData
  userPokeData: Poke;
  setUserPokeData: (value: Poke) => void;
}

export interface Poke {
  id: string;
  name: string;
  pokemon_id: number;
  user_email: string;
}

export const PokeContext = createContext<pokeContext>({
  userPokeData: { id: "", name: "", pokemon_id: 0, user_email: "" },
  setUserPokeData: (value: Poke) => undefined,
});

export const PokeProvider = ({ children }: { children: ReactNode }) => {
  const [userPokeData, setUserPokeData] = useState<Poke>({
    id: "",
    name: "",
    pokemon_id: 0,
    user_email: "",
  });
  return (
    <PokeContext.Provider value={{ userPokeData, setUserPokeData }}>
      {children}
    </PokeContext.Provider>
  );
};
