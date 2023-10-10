import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import getFirestoreConfig, { WriteToCloudFirestore } from "../firebaseConfig";
import { PokeContext } from "../Data/PokemonId";
import { attackPoke, catchPoke } from "../functions/CatchOrAttack";

const db = getFirestoreConfig();

//Get id of logged in user
// const user = sessionUser();

export interface PokeInfo {
  name: string;
  stats: {
    base_stat: number;
  };
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

const theme = {
  colors: {
    primary: "white",
  },
};

const Button = styled.button`
  width: 40%;
  height: 3rem;
  margin: 1rem;
  background-color: #337ccf;
  color: ${(props) => props.theme.colors.primary};
  border: none;
  font-size: 100%;
  cursor: pointer;
`;

Button.defaultProps = {
  theme: {
    color: "#337ccf",
  },
};

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

  const attackPokeCall = () => {
    attackPoke({
      userPokeData,
      pokeInfo,
      randomId,
      setUserPokeData,
      pokeHP,
      setPokeHP,
      setCaughtOrRan,
      newRandom,
    });
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

  const catchPokeCall: () => void = () => {
    catchPoke({
      newRandom,
      randomId,
      pokeHP,
      pokeFullHP,
      session,
      pokeInfo,
    });
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
        <ThemeProvider theme={theme}>
          <Button onClick={attackPokeCall}>Attack</Button>
          <Button onClick={catchPokeCall}>Catch</Button>
        </ThemeProvider>
      </ButtonParent>
    </>
  );
}
