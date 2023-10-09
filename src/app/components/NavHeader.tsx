import { useSession } from "next-auth/react";
import styled from "styled-components";

const Img = styled.img`
  width: 20%;
  height: 50px;
  object-fit: cover;
  border-radius: 1.8rem;
`;

const Text = styled.p`
  font-size: 80%;
`;

const Div = styled.div`
  width: 75%;
  align-content: space-between;
`;

const Header = styled.header`
  width: 100%;
  height: 20%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface ImgProps {
  src: string;
}

const ImgField: React.FC<ImgProps> = ({ src }) => <Img src={src} />;

export default function NavHeader() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Header>
        {session?.user?.image && <ImgField src={session?.user?.image} />}
        <Div>
          <Text>{session?.user?.name}</Text>
          <Text>{session?.user?.email}</Text>
        </Div>
      </Header>
    );
  } else {
    return <Text>Not signed in </Text>;
  }
}
