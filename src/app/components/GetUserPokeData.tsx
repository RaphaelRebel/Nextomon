import { collection, getDocs } from "firebase/firestore";
import getFirestoreConfig from "../firebaseConfig";
import { useSession } from "next-auth/react";

const db = getFirestoreConfig();

interface Data {
  id: string;
  name: string;
  pokemon_id: number;
  user_email: string;
  push: (value: any) => void;
}

const data: Data[] = [];
export default async function GetUserPokeData() {
  const { data: session } = useSession();
  const docRef = await getDocs(collection(db, "pokemon"));
  docRef.forEach((doc: any) => {
    if (
      doc.data().user_email == session?.user?.email &&
      !data.some((item) => item.id === doc.id)
    ) {
      //check if data id is not in data array
      data.push({ id: doc.id, ...doc.data() });
    }
  });

  return data;
}
