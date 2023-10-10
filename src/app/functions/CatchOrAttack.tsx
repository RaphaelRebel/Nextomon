"use client";
import { PokeInfo } from "../components/GetPokemon";
import { WriteToCloudFirestore } from "../firebaseConfig";
import React from "react";

interface CatchProps {
  //   setCaughtOrRan: React.Dispatch<React.SetStateAction<boolean>> ;
  newRandom: () => void;
  randomId: number;
  pokeHP: number;
  pokeFullHP: number;
  session: any;
  pokeInfo: PokeInfo | string | undefined;
}

interface AttackProps {
  userPokeData: {
    name: string;
    pokemon_id: number;
  };
  pokeInfo: PokeInfo | string | undefined;
  randomId: number;
  setUserPokeData: any;
  pokeHP: number;
  setPokeHP: React.Dispatch<React.SetStateAction<number>>;
  setCaughtOrRan: React.Dispatch<React.SetStateAction<boolean>>;
  newRandom: () => void;
}

export const catchPoke = ({
  newRandom,
  randomId,
  pokeHP,
  pokeFullHP,
  session,
  pokeInfo,
}: CatchProps) => {
  let damagePercentage = 100 - Math.floor((pokeHP / pokeFullHP) * 100);
  let dice = Math.floor(Math.random() * (100 - 1) + 1);
  if (damagePercentage > dice) {
    console.log("caught");
    const sessionEmail: string = session?.user?.email ?? "No email found";
    if (typeof pokeInfo !== "string") {
      WriteToCloudFirestore(pokeInfo.name, randomId, sessionEmail);
    }
  } else {
    console.log(pokeInfo, " escaped");
  }

  newRandom();
};

export const attackPoke = ({
  userPokeData,
  pokeInfo,
  randomId,
  setUserPokeData,
  pokeHP,
  setPokeHP,
  setCaughtOrRan,
  newRandom,
}: AttackProps) => {
  let randomNumber = Math.floor(Math.random() * (21 - 1) + 1);
  if (userPokeData.name !== pokeInfo?.name) {
    setUserPokeData({
      name: pokeInfo?.name ?? "",
      pokemon_id: randomId,
    });
  }

  if (pokeHP - randomNumber <= 0) {
    setPokeHP(0);
    setCaughtOrRan(true);
    newRandom();
  } else {
    setPokeHP(pokeHP - randomNumber);
  }
};
