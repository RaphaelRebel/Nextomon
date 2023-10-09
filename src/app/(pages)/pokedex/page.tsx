"use client";
import GetData from "@/app/components/GetUserPokemon";
import GetUserPokemon from "@/app/components/GetUserPokemon";
import { use, useEffect, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const PokeBlock = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: #d9d9d9;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  background-color: #337ccf;
  border-radius: 9rem;
  margin: 1rem;
  object-fit: contain;
  padding: 1rem;
`;

interface Data {
  id: string;
  name: string;
  pokemon_id: number;
  user_email: string;
  push: (value: any) => void;
}

export default function Page() {
  const [pokeData, setPokeData] = useState<any>(null);
  let getPokemon = GetUserPokemon();

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getPokemon);
      }, 10);
    }).then((data) => {
      setPokeData(data);
    });
    //data is undefined, why?
  }, [getPokemon]);

  const PokemonCard = pokeData?.map((item: Data) => {
    return (
      <PokeBlock key={item.id}>
        <Img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.pokemon_id}.png`}
        />
        {item.name}
      </PokeBlock>
    );
  });

  return <Section>{PokemonCard}</Section>;
}
