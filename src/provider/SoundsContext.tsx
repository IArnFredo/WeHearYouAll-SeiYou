import { useIonActionSheet } from "@ionic/react";
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import app from "../firebaseConfig";
import { reducer, soundsContext } from "./Sounds";
import { App as ap } from '@capacitor/app';
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
    const [actionSheet, dismiss] = useIonActionSheet();
    document.addEventListener('ionBackButton', (ev: any) => {
        ev.detail.register(10, () => {
          actionSheet({
            header: 'Are you sure you want to exit?',
            buttons: [{
              text: 'Yes',
              handler: () => {
                ap.exitApp();
              }
            }, {
              text: 'No',
              handler: () => {
                dismiss();
              }
            }]
          })
        })
      });
    const initiate = initialState;
    const db = getFirestore();
    let [state, dispatch] = useReducer(reducer, initiate);

    let value = { state, dispatch };
    const [allData, setAllData] = useState<Array<any>>([]);
    const [mostData, setMostData] = useState<Array<any>>([]);

    useEffect(() => {
        onSnapshot(collection(db, "sounds"), (querySnapshot) => {
            console.log(querySnapshot.docs);
            console.log(querySnapshot.docChanges);
            const data = querySnapshot.docs.map((doc) => doc.data());
            let most = JSON.parse(JSON.stringify(data));
            most.sort((a: any, b: any) => (a.play <= b.play) ? 1 : -1);
            setAllData(data);
            setAllData(data);
            setMostData(most);
        })
        return;
    }, []);
    state.music.tracks = allData;
    state.music.tracks = allData;
    state.music.mostPopular = mostData;
    return (
        <soundsContext.Provider value={value}>
            {props.children}
        </soundsContext.Provider>
    );
}


export default SoundsContext;