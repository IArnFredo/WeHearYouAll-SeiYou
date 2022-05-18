import { query, collection, where, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { reducer, soundsContext } from "./Sounds";
const initialState = {
    playing: {
        index: 0,
        progress: 27000,
        paused: false,
    },
    user: {
        recentTracks: [],
      },
    ui: {
        playerOpen: false,
    },
    music: {
        tracks: [
            {

            }
        ],
    },
};

export const instigate = initialState;

const SoundsContext: React.FC = (props) => {
    const initiate = initialState;
    const db = getFirestore();
    let [state, dispatch] = useReducer(reducer, initialState);
    let value = { state, dispatch };
    const [readData, setReadData] = useState<Array<any>>([]);
   

    useEffect(() => {
        async function fetchData() {
            const q = query(
                collection(db, "sounds")
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());
            setReadData(data);
        }
        fetchData();
        
        return;
    },[10]);
    initiate.music.tracks = readData;
    return (
        <soundsContext.Provider value={value}>
            {props.children}
        </soundsContext.Provider>
    );
}


export default SoundsContext;