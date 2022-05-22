import {
  IonButton,
  IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonIcon, IonItem, IonPage, IonRow, IonTitle, IonToolbar
} from "@ionic/react";
import {
  alertCircleOutline, arrowBackCircle
} from "ionicons/icons";
import React, { useEffect } from "react";
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

  useEffect(()=> {
    
  },[])
  
  if (!playing) {
    return null;
  }
  console.log(state);



  const open = isPlayerOpen(state);
  const currentTrack = getCurrentTrack(state, state.playing.index);

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
    return <Redirect to={'/home'} />
  }


  return (
    <>
      <IonPage>
        <IonToolbar class="ion-notoolbar-playing">
          <IonButtons class="ion-margin-start" style={{ marginTop: '10px' }} slot="start" onClick={ChangeURLandState}>
            <IonIcon size="large" icon={arrowBackCircle} />
          </IonButtons>

          <IonTitle>Now Playing</IonTitle>
        </IonToolbar>
        <IonContent className="ion-padding ion-content-playing">
          <IonRow>
            <IonCol className="ion-text-center ion-margin-top">
              <div className="radius-pic-player-cont">
              <img
                src={currentTrack.images}
                className="radius-pic-player"
                alt="" />
              </div>

            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="">
              <IonTitle>
                {state.ui.initiate == true ? currentTrack.name : null} <br />
                <span style={{ color: "grey", fontSize: "15px" }}>{currentTrack.userName}</span>
              </IonTitle>
            </IonCol>
            <IonCol size="2" className="ion-text-right ion-margin-top ion-margin-end">
              <IonButtons>
                <IonButton routerLink={`/another-profile/${currentTrack.UserID}`}>
                  <IonIcon icon={alertCircleOutline} size="large"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard color="dark">
                <IonCardContent>
                  {currentTrack.description}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default React.memo(Playing);
