import { collection, getDocs } from "firebase/firestore";
import getFirestoreConfig from "../firebaseConfig";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import GetUserPokeData from "./GetUserPokeData";

interface Data {
    id: string;
    name: string;
    pokemon_id: number;
    user_email: string;
    push: (value: any) => void;
    }

export default async function GetUserPokemon() {
    const [pokeData, setPokeData] = useState<Data[] | unknown>([]);
//    (async()=>{
//     const arr= await GetUserPokeData();
//     console.log(arr);

//  })();

const test = GetUserPokeData();
useEffect(() => {
    
    new Promise((resolve, reject) => {
       
      setTimeout(() => {
        
        resolve(test);
      }, 1000);
    }).then((data) => {
        setPokeData(data);
    });
    //data is undefined, why?
  }, [test]);

  return pokeData;
}
