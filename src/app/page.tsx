"use client";

import styled from "styled-components";
import Title from "./components/Title";


// const HelloStyles = styled.div`
//   color: yellow;
//   fontSize: 50px;
//   background-color: red;
// `;

// interface HelloProps {
//   text: string;
// }

// const Hello: React.FC<HelloProps> = ({text}) => <HelloStyles>{text}</HelloStyles>;

const Section = styled.section`
display: initial;
`;

export default function Home() {
  return (
    <Section>
        <Title />
    </Section>
  );
}
