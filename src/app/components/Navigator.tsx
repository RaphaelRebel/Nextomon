"use client";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import NavHeader from "./NavHeader";

import NavList from "./NavList";

const Nav = styled.nav`
  height: 100vh;
  width: 20%;
  min-width: 25rem;
  max-width: 30rem;
  background-color: #337ccf;
  color: white;
  position: sticky;
`;
const Button = styled.button`
  width: 100%;
  height: auto;
  background-color: #337ccf;
  color: white;
  border: none;
  font-size: 100%;
  cursor: pointer;
`;



interface NavFieldProps {
  children: React.ReactNode;
}

const NavField: React.FC<NavFieldProps> = ({ children }) => (
  <Nav>{children}</Nav>
);

export default function Navigator() {
  const { data: session } = useSession();

  if (session) {
    return (
      <NavField>
        <NavHeader />
        <Button onClick={() => signOut()}>Sign out</Button>
        <NavList />
      </NavField>
    );
  }
  return (
    <NavField>
      <NavHeader />
      <Button onClick={() => signIn()}>Sign in</Button>
    </NavField>
  );
}
