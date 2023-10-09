"use client";

import { Children, ReactNode, createContext, useState } from "react";

interface pokeContext {
  // get all data from GetUserPokeData
  userPokeData: Poke;
  setUserPokeData: (value: Poke) => void;
}

export interface Poke {
  name: string;
  pokemon_id: number;
}

export const PokeContext = createContext<pokeContext>({
  userPokeData: { name: "", pokemon_id: 0 },
  setUserPokeData: (value: Poke) => undefined,
});

export const PokeProvider: any = ({ children }: { children: ReactNode }) => {
  const [userPokeData, setUserPokeData] = useState<Poke>({
    name: "",
    pokemon_id: 0,
  });
  return (
    <PokeContext.Provider value={{ userPokeData, setUserPokeData }}>
      {children}
    </PokeContext.Provider>
  );
};
