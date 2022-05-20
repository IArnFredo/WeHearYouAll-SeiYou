import {
  IonAvatar, IonCol, IonContent, IonGrid, IonItem, IonLabel,
  IonList, IonPage, IonRow
} from "@ionic/react";
import React, { useCallback } from "react";
import 'react-h5-audio-player/lib/styles.css';
import { useHistory } from "react-router";
import { getMostpopular, getTracks, isPlayerOpen, playTrack, useSoundsContext } from "../provider/Sounds";
import "./Home.css";

const Home: React.FC = () => {
  const { state, dispatch } = useSoundsContext();

  const trackSounds = getTracks(state);
  const mostPopular = getMostpopular(state);
  const open = isPlayerOpen(state);
  const history = useHistory();

  const doPlay = useCallback(sound => {
    dispatch(playTrack(sound));
  }, []);
  if (open == true) {
    history.push("/playing");
  }
  return (
    <IonPage className="bg-app-home">
      <IonContent className="home-content">
        <IonRow id="margin-for-float-btn-home">
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
            <IonRow className="home-title">
              <IonLabel className="ion-margin-top"><b>Welcome!</b></IonLabel>
            </IonRow>
            <IonGrid>
              {/* Recently Upload */}
              <IonRow className="home-subtitle">
                <IonLabel className="ion-margin-top">Recently Upload</IonLabel>
              </IonRow>
              <IonList className="home-recently-list">
                <IonRow>
                  {trackSounds && trackSounds.map((sound: any, index: any) => (
                    <IonCol size="6" key={index}>
                      <IonItem className="home-vList" button onClick={() => doPlay(sound)}>
                        <IonAvatar slot="start">
                          <img src={sound.images} alt="" />
                        </IonAvatar>
                        <div>
                          <p className="title-text"><b>{sound.name}</b></p>
                          <p className="title-text">by {sound.userName}</p>
                        </div>
                      </IonItem>
                    </IonCol>
                  ))}

                  {/* <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar className="avatar" slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/@playing">
                      <IonAvatar className="avatar" slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol> */}
                </IonRow>
              </IonList>
              {/* End Recently Upload */}

              {/* Most Popular */}
              <IonRow className="home-subtitle">
                <IonLabel className="ion-margin-top">Most Popular</IonLabel>
              </IonRow>
              <IonList className="home-recently-list">
                <IonRow>
                  {mostPopular && mostPopular.map((sounds: any, index: any) => (
                    <IonCol key={index} size="6">
                      <IonItem className="home-vList" button onClick={() => doPlay(sounds)}>
                        <IonAvatar slot="start">
                          <img src={sounds.images} alt="" />
                        </IonAvatar>
                        <div>
                          <p className="title-text"><b>{sounds.name}</b></p>
                          <p className="title-text">by {sounds.userName}</p>
                        </div>
                      </IonItem>
                    </IonCol>
                  ))}                         
                </IonRow>
              </IonList>
              {/* End Most Popular */}
            </IonGrid>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);


