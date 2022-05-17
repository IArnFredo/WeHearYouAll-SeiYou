import React, { useEffect, useRef, useState } from "react";
import "./Playing.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IonCol, IonContent, IonFab, IonFooter, IonItem, IonPage, IonRow, IonToolbar } from "@ionic/react";
import { useLocation, useParams } from "react-router";
import "./SoundPlayer.css";
import { useSoundsContext, getTracks, nextTrack } from "../provider/Sounds";

// const media = Media;
// const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
// fileMusic.seekTo(1);

const waitForElement = (sel: any, cb: any) => {
  const el = document.querySelector(sel);

  if (!el || !el.offsetHeight) {
    requestAnimationFrame(() => waitForElement(sel, cb));
  } else {
    cb(el);
  }
}

const SoundPlayer: React.FC = (props) => {
  const [top, setTop] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  const [disable, setDisable] = useState(false);
  const Changer = document.getElementById("classChanger")!;
  const { state, dispatch } = useSoundsContext();
  const trackSounds = getTracks(state);
  const track = trackSounds[currentSong];
  console.log(track);
  
  const location = useLocation().pathname;

  useEffect(() => {
    waitForElement('ion-tab-bar', (tabBar: any) => {
      if (tabBar) {
        const box = tabBar.getBoundingClientRect();
        setTop(window.innerHeight - box.top);
      }
      else {
        setTop(0);
      }
    })
    if (location === "/welcome") {
      setDisable(true);
    }
    if (location === "/login") {
      setDisable(true);
    }
    if (location === "/register") {
      setDisable(true);
    }
    if (location === "/home") {
      setDisable(false);
    }
    if (location === "/edit-profile") {
      Changer.style.left = "-999px"
    }
    if (location === "/profile") {
      Changer.style.left = "0px"
    }
  }, [location]);


  // if (location === "/edit-profile") {
  //   Changer.style.left = "-999px";
  // }
  // if (location === "/profile") {
  //   disable = "false";
  //   Changer.style.left = "0px";
  // }
  // if (location === "/your-voices") {
  //   Changer.style.left = "-999px";
  // }
  // if (location === "/your-voice-list") {
  //   disable = "false";
  //   Changer.style.left = "0px";
  // }
  if(!track) return null;

  return (
    <>
      {disable == true && (
        null
      )}
      {disable == false && (
        <div id="classChanger" style={{
          position: 'fixed',
          width: '100%',
          zIndex: '1000',
          bottom: `${top}px`,
        }} className="false">
          {props.children}
          <IonFooter>
            <IonToolbar>
              <IonRow>
                <IonCol size="12" className="ion-text-justify">
                  <AudioPlayer
                    autoPlay={false}
                    layout="horizontal"
                    // src={track.soundsURL && track.soundsURL}
                    onEnded={() => setCurrentSong(i => i + 1)}
                  />
                </IonCol>
              </IonRow>
            </IonToolbar>
          </IonFooter>
        </div>
      )}
    </>
  );
};
export default React.memo(SoundPlayer);
