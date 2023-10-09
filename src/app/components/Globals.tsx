"use client";
import { createGlobalStyle } from "styled-components";

 function  RunGlobals() {
  const Globals: any = createGlobalStyle`
* {
margin: 0;
padding: 0;
box-sizing: border-box;
max-width: 100vw;

}

html {
font-size: 62.5%;
font-family: 'Ubuntu', sans-serif;
font-weight: 200;
scroll-behavior: smooth;
width: 100vw;
}

body {
font-size: 1.6rem;
min-height: 100vh;
background-color: var(--mainBackground);
padding: 0;
margin: 0;
overflow-x: hidden;
}
`;
  return  Globals;
}

export default RunGlobals();
