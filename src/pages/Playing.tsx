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
  IonText,
  IonFooter,
  IonButton,
  IonRange,
} from "@ionic/react";
import {
  alertCircleOutline,
  pauseCircleSharp,
  playCircleSharp,
  playSkipBack,
  playSkipForward,
  shareSocial,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Media } from "@awesome-cordova-plugins/media";
import "./Playing.css";


const media = Media;
const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
fileMusic.seekTo(1);
const Playing: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  let gender = "male";
  
  const status = fileMusic.onStatusUpdate.subscribe(status =>{
    if (status.toString() === "1") {
      setInterval(() => {
        const dur = fileMusic.getDuration();
        console.log(dur);
        setDuration(dur);
      }, 500)
    }});

  fileMusic.onSuccess.subscribe(() => {
    console.log("Success");
  });

  fileMusic.onError.subscribe(error => {
    console.log("Error: " + error);
  });

  useEffect(() => {
    setInterval(() => {
      fileMusic.getCurrentPosition().then((position) => {
        setCurrentTime(position);
      });
    }, 1000);
  }, []);

  const PlayVoice = () => {
    fileMusic.play();
    setPlaying(true);
    console.log("play");
  }

  const PauseVoice = () => {
    fileMusic.pause();
    setPlaying(false);
    console.log("pause");
  }
  return (
    <IonPage className={gender === "female" ? "" : "playing-app"}>
      <IonToolbar class="ion-notoolbar-playing">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
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
              <IonRange
                max={100}
                color="dark"
                style={{ padding: "0px 14px" }}
              ></IonRange>
            </IonCol>
            <IonCol size="6">
              <IonText className="ion-margin-start">{currentTime}</IonText>
            </IonCol>
            <IonCol className="ion-text-right" size="6">
              <IonText className="ion-margin-end">{duration}</IonText>
            </IonCol>

            <IonCol className="ion-text-center" size="12">
              <IonButton fill="clear" color="dark">
                <IonIcon size="small" icon={shareSocial}></IonIcon>
              </IonButton>
              <IonButton fill="clear" color="dark">
                <IonIcon size="small" icon={playSkipBack}></IonIcon>
              </IonButton>
              {playing == false ?
                (
                  <IonButton fill="clear" color="secondary" onClick={PlayVoice}>
                    <IonIcon size="large" icon={playCircleSharp}></IonIcon>
                  </IonButton>
                ) :
                (
                  <IonButton fill="clear" color="secondary" onClick={PauseVoice}>
                    <IonIcon size="large" icon={pauseCircleSharp}></IonIcon>
                  </IonButton>
                )}
              <IonButton fill="clear" color="dark">
                <IonIcon size="small" icon={playSkipForward}></IonIcon>
              </IonButton>
              <IonButton fill="clear" color="dark"></IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Playing;
