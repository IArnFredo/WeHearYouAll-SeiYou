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
} from "@ionic/react";
import {
  alertCircleOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import "./Playing.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


// const media = Media;
// const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
// fileMusic.seekTo(1);
const Playing: React.FC = () => {
  let gender = "male";

  return (
    <IonPage className={gender === "female" ? "" : "playing-app"}>
      <IonToolbar class="ion-notoolbar-playing">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>Now Playing</IonTitle>
      </IonToolbar>
      <IonContent className="ion-padding ion-content-playing">
        <IonRow>
          <IonCol className="ion-text-center ion-margin-top">
            <img
              src={"assets/images/allphen.png"}
              className="radius-pic"
              alt=""
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="">
            <IonTitle>
              Owari Da <br />
              <span style={{ color: "grey", fontSize: "15px" }}>Alphen</span>
            </IonTitle>
          </IonCol>
          <IonCol className="ion-text-right ion-margin-top ion-margin-end">
            <IonIcon icon={alertCircleOutline} size="large"></IonIcon>
          </IonCol>
        </IonRow>
      </IonContent>
      <IonFooter style={{ position: "static" }}>
        <IonToolbar class='ion-notoolbar-playing'>
          <IonRow>
            <IonCol size="12" className="ion-text-justify">
              <AudioPlayer
                autoPlay={false}
                layout="stacked"
                src="https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a"
                onPlay={e => console.log("onPlay")}
              />
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default React.memo(Playing);
