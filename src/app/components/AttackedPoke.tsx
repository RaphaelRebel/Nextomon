import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PokeContext } from "../Data/PokemonId";
import { motion } from "framer-motion";

const Box = styled(motion.section)`
  width: 20%;
  background-color: #d9d9d9;
  height: 30rem;
  margin: auto 0;
  border-radius: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Img = styled(motion.img)`
  width: 10rem;
  height: auto;
`;
export default function AttackedPoke() {
  const [pokeName, setPokeName] = useState<string>("");
  const { userPokeData, setUserPokeData } = useContext(PokeContext);

  useEffect(() => {
    setPokeName(userPokeData?.name);
  }, [userPokeData]);

  console.log(pokeName);
  return (
    <Box >
      <Img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${userPokeData.pokemon_id}.png?` + new Date().getTime()}
        alt="Pokemon"
      />
      <p>{userPokeData.name}</p>
    </Box>
  );
}
