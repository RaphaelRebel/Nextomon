"use client";
import styled from "styled-components";
import GetPokemon from "./GetPokemon";
import { use, useContext, useEffect, useState } from "react";
// import { PokeContext } from "../Data/PokemonId";

const Div = styled.div`
  width: 25rem;
  height: 25rem;
  border-radius: 1.8rem;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const H1 = styled.h1`
  text-align: center;
  width: 100%;
`;

export default function CatchPmBlock({ test }: { test: number }) {
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    const randomId: number = getRandomInt(1, 1010);
    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    setId(randomId);
  }, []);

  //   const { id, setId } = useContext(PokeContext);

  //   const chosenId: any = randomId();
  //   useEffect(() => {
  //     setId(chosenId);
  //   }, []);

  //   console.log(randomId());

  //   console.log(test);

  return (
    <Div>
      <GetPokemon randomId={id} />
    </Div>
  );
}
