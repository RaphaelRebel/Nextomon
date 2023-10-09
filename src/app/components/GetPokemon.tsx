import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import getFirestoreConfig from "../firebaseConfig";
import { PokeContext } from "../Data/PokemonId";

const db = getFirestoreConfig();

//Get id of logged in user
// const user = sessionUser();

// const user_id = user?.user?.id;
async function WriteToCloudFirestore(
  name: string,
  pokemon_id: number,
  user_email: string
) {
  try {
    const docRef = await addDoc(collection(db, "pokemon"), {
      name: name,
      pokemon_id: pokemon_id,
      user_email: user_email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

interface PokeInfo {
  name: string;
  stats: {
    base_stat: number;
  };
}

interface Data {
  id: string;
  name: string;
  pokemon_id: number;
  user_email: string;
  push: (value: any) => void;
}

const Img = styled(motion.img)`
  width: 10rem;
  height: auto;
  margin: 0 auto;
`;

const H2 = styled(motion.h2)`
  text-align: center;
  font-weight: 400;
`;

const Button = styled.button`
  width: 40%;
  height: 3rem;
  margin: 1rem;
  background-color: #337ccf;
  color: white;
  border: none;
  font-size: 100%;
  cursor: pointer;
`;

const ButtonParent = styled.div`
  display: flex;
`;

const P = styled.p`
  text-align: center;
  font-size: 150%;
  width: 100%;
`;

async function getPokeInfo(randomId: number) {
  if (!randomId) return null;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

    // if (!res.ok) {
    //   if (res.status === 404) {
    //     throw new Error("Pokemon not found!");
    //   } else {
    //     throw new Error(`HTTP error! status: ${res.status}`);
    //   }
    // }

    const data = await res.json();

    const pokeDataGet = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${data?.name}`
    );

    const pokeData = await pokeDataGet.json();

    return pokeData;
  } catch (error: any) {
    console.error("Error fetching data from PokeAPI:", error.message);
    return null; // Handle the error accordingly in your application
  }
}

export default function GetPokemon({
  randomId,
  newRandom,
}: {
  randomId: number;
  newRandom: () => void;
}) {
  const [pokeInfo, setPokeInfo] = useState<PokeInfo | string>();
  const [pokeHP, setPokeHP] = useState<number>(0);
  const [pokeFullHP, setPokeFullHP] = useState<number>(0);
  const [caughtOrRan, setCaughtOrRan] = useState<boolean>(false);
  const { userPokeData, setUserPokeData } = useContext(PokeContext);
  const { data: session } = useSession();

  const attack = () => {
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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPokeInfo(randomId);
        setPokeInfo(data ?? "Pokemon not found!");
        setPokeHP(data?.stats?.[0].base_stat);
        setPokeFullHP(data?.stats?.[0].base_stat);
      } catch (error: any) {
        console.error("Error fetching data from PokeAPI:", error.message);
        setPokeInfo("Ohno! Couldn't find that pokemon!");
      }
    }

    fetchData();
  }, [randomId]);

  const catchPoke = () => {
    setCaughtOrRan(true);
    let damagePercentage = 100 - Math.floor((pokeHP / pokeFullHP) * 100);
    let dice = Math.floor(Math.random() * (100 - 1) + 1);
    if (damagePercentage > dice) {
      console.log("caught");
      const sessionEmail: string = session?.user?.email ?? "No email found";
      WriteToCloudFirestore(pokeInfo?.name, randomId, sessionEmail);
    } else {
      console.log(pokeInfo.name, " escaped");
    }

    newRandom();
  };

  return (
    <>
      <Img
        transition={{ delay: 1 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`}
        alt={`Pokemon ${randomId}`}
      />
      <H2
        transition={{ delay: 1 }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
      >
        {pokeInfo?.name}
      </H2>
      {/* Get pokeinfo base_stat */}
      <P>{pokeHP}</P>

      <ButtonParent>
        <Button onClick={attack}>Attack</Button>
        <Button onClick={catchPoke}>Catch</Button>
      </ButtonParent>
    </>
  );
}
