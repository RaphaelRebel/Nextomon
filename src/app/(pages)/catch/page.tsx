"use client"
import { useSession } from "next-auth/react";

import styled from "styled-components";
// import { PokeProvider } from "@/app/Data/PokemonId";
import CatchPmBlock from "@/app/components/CatchPmBlock";
const Div = styled.div`
  width: 64rem;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 8rem;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;



export default function Home() {
  const { data: session } = useSession();

  return session ? (
    <Div>
      {/* <PokeProvider> */}
        <CatchPmBlock test={1}  />
        <CatchPmBlock test={2}  />
        <CatchPmBlock test={3}  />
        <CatchPmBlock test={4}  />
      {/* </PokeProvider> */}
    </Div>
  ) : (
    <p>Not signed in</p>
  );
}
