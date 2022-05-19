import {
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonIcon,
  IonFooter,
  IonHeader,
  IonButton,
  IonModal,
} from "@ionic/react";
import {
  alertCircleOutline, arrowBackCircle, arrowDown,
} from "ionicons/icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Playing.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { closePlayer, getCurrentTrack, getPlaying, getTracks, isPlayerOpen, soundsContext, useSoundsContext } from "../provider/Sounds";
import { Redirect } from "react-router";
import SoundPlayer from "./SoundPlayer";


// const media = Media;
// const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
// fileMusic.seekTo(1);
const Playing: React.FC = () => {
  const { state, dispatch } = useSoundsContext();
  const playing = getPlaying(state);

  if (!playing) {
    return null;
  }

  const open = isPlayerOpen(state);
  const currentTrack = getCurrentTrack(state, state.playing.index);
  console.log(open);


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
                {currentTrack.name} <br />
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
