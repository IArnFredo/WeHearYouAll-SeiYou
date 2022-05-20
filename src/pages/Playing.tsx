import {
  IonButtons, IonCol, IonContent, IonIcon, IonPage, IonRow, IonTitle, IonToolbar
} from "@ionic/react";
import {
  alertCircleOutline, arrowBackCircle
} from "ionicons/icons";
import React from "react";
import 'react-h5-audio-player/lib/styles.css';
import { Redirect } from "react-router";
import { closePlayer, getCurrentTrack, getPlaying, getTracks, isPlayerOpen, useSoundsContext } from "../provider/Sounds";
import "./Playing.css";


// const media = Media;
// const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
// fileMusic.seekTo(1);
const Playing: React.FC = () => {
  const { state, dispatch } = useSoundsContext();
  const playing = getPlaying(state);
  const trackSounds = getTracks(state);
  const track = trackSounds[state.playing.index];
  if (!playing) {
    return null;
  }

  const open = isPlayerOpen(state);
  const currentTrack = getCurrentTrack(state, state.playing.index);


  let gender = "male";

  // if (open == false) {
  //   return <Redirect to={'/home'}/>
  // }

  if (!currentTrack) {
    return null;
  }

  const ChangeURLandState = () => {
    dispatch(closePlayer());
  }

  if (open == false) {
    return <Redirect to={'/home'}/>
  }

  return (
    <>
      <IonPage className={gender === "female" ? "" : "playing-app"}>
        <IonToolbar class="ion-notoolbar-playing">
          <IonButtons class="ion-margin-start" style={{marginTop : '10px'}} slot="start" onClick={ChangeURLandState}>
            <IonIcon size="large" icon={arrowBackCircle} />
          </IonButtons>

          <IonTitle>Now Playing</IonTitle>
        </IonToolbar>
        <IonContent className="ion-padding ion-content-playing">
          <IonRow>
            <IonCol className="ion-text-center ion-margin-top">
              <img
                src={"assets/images/allphen.png"}
                className="radius-pic"
                alt="" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="">
              <IonTitle>
                {state.ui.initiate == true ? currentTrack.name : null} <br />
                <span style={{ color: "grey", fontSize: "15px" }}>{currentTrack.userName}</span>
              </IonTitle>
            </IonCol>
            <IonCol className="ion-text-right ion-margin-top ion-margin-end">
              <IonIcon icon={alertCircleOutline} size="large"></IonIcon>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default React.memo(Playing);
