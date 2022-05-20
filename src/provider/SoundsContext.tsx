import { query, collection, where, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
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
        initiate: false,
    },
    music: {
        tracks: [
            {

            }
        ],
        mostPopular: [
            {

            }
        ],
    },
};

export const instigate = initialState;

const SoundsContext: React.FC = (props) => {
    const initiate = initialState;
    const db = getFirestore();
    let [state, dispatch] = useReducer(reducer, initiate);

    let value = { state, dispatch };
    const [allData, setAllData] = useState<Array<any>>([]);
    const [mostData, setMostData] = useState<Array<any>>([]);

    useEffect(() => {
        async function fetchData() {
            const q = query(
                collection(db, "sounds")
            );
            // const querySnapshot = await getDocs(q);
            const querySnapshot = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map((doc) => doc.data());
                let most = JSON.parse(JSON.stringify(data));
                most.sort((a:any, b:any) => (a.play <= b.play) ? 1 : -1);
                setMostData(most);
                setAllData(data);  
            });
        }
        fetchData();
        return;
    }, []);
  
    state.music.tracks = allData;
    state.music.mostPopular = mostData;

    return (
        <soundsContext.Provider value={value}>
            {props.children}
        </soundsContext.Provider>
    );
}


export default SoundsContext;