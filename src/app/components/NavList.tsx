import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";


const Ul = styled.ul`
  list-style: none;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
`;

interface UlFieldProps {
  children: React.ReactNode;
}

const UlField: React.FC<UlFieldProps> = ({ children }) => <Ul>{children}</Ul>;

const Li = styled(motion.li)`
  width: 80%;
  margin: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const LinkField = styled(Link)`
    text-decoration: none;
    color: white;   
`

interface LiFieldProps {
  children: React.ReactNode;
  link: string
}

const LiField: React.FC<LiFieldProps> = ({ children, link }) => (
  <>
    <Li whileHover={{ x: 10}}><LinkField href={link}>{children}</LinkField></Li> <hr />
  </>
);


export default function NavList() {
    return(
        <UlField>
          <LiField link="/">Home</LiField>
          <LiField link="/catch">Catch</LiField>
          <LiField link="/pokedex">Pokedex</LiField>
          <LiField link="/battles">Battles</LiField>
        </UlField>
    )
}