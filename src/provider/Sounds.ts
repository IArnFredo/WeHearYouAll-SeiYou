import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";

export interface Sounds{
    [key: string]: any;
    UserID?: any;
}

interface SoundsInit{
    sounds?: Sounds[];
}


export const soundsContext = React.createContext<Sounds>({ });

export function useSoundsContext(): Sounds {
  return React.useContext(soundsContext);
}

export function useSounds(): SoundsInit {
    const db = getFirestore();
    const [soundsInit, setSoundsInit] = React.useState<SoundsInit>({});
    const q = collection(db, "sounds");
    useEffect(() => {
        async function fetchData() {
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => doc.data());
          setSoundsInit({ sounds: data });
        }
        fetchData();
      }, []);
    return soundsInit;
}

