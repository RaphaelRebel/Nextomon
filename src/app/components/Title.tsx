import { useSession } from 'next-auth/react';
import styled from 'styled-components';


function TitleText(){
    const { data: session } = useSession();

    const LoggedInTitle = styled.h1`
        font-size: 100%;   
        margin: auto 0;
        text-align: center;
    `
    const LoggedOutTitle = styled.h1`
        font-size: 500%;   
        margin: auto 0;
        text-align: center;
    `

    
    const LoggedTitle = () => session ? <LoggedInTitle>Nextomon</LoggedInTitle> : <LoggedOutTitle>Nextomon</LoggedOutTitle> ;

    
    return <LoggedTitle/>
}

export default function Title() {
  return (
    <>
        <TitleText />
    </>
  );
}