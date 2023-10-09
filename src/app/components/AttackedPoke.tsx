import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PokeContext } from "../Data/PokemonId";

const Box = styled.section`
  width: 20%;
  background-color: #d9d9d9;
  height: 30rem;
  margin: auto 0;
  border-radius: 1.8rem;
`;

export default function AttackedPoke() {
    const [pokeName, setPokeName] = useState<string>("");
    const {userPokeData, setUserPokeData} = useContext(PokeContext);

    console.log(userPokeData)

    useEffect(() => {
        setPokeName(userPokeData?.name);
    }, [userPokeData]);

    console.log(pokeName)
  return (
    <Box>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${userPokeData.pokemon_id}.png`} alt="Pokemon" />
        <p>{userPokeData.name}</p>
    </Box>
  );
}
