
import React, { useCallback, useContext, useState } from "react";
import {
  IonActionSheet,
  IonAlert,
  IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel,
  IonList, IonPage, IonRow, IonToolbar, useIonAlert
} from "@ionic/react";
import 'react-h5-audio-player/lib/styles.css';
import { Redirect, useHistory } from "react-router";
import { getMostpopular, getTracks, isPlayerOpen, playTrack, useSoundsContext } from "../provider/Sounds";
import "./Home.css";
import { cloudUploadOutline, duplicate, duplicateOutline, duplicateSharp, enter, enterOutline, enterSharp, logInOutline, logInSharp, mic } from "ionicons/icons";
import { userContext } from "../provider/User";

const Home: React.FC = () => {
  const { state, dispatch } = useSoundsContext();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAlert] = useIonAlert();
  const trackSounds = getTracks(state);
  const mostPopular = getMostpopular(state);
  const open = isPlayerOpen(state);
  const history = useHistory();
  const user = useContext(userContext);

  const doPlay = useCallback(sound => {
    dispatch(playTrack(sound));
  }, []);
  const recordBtn = () => {
    if (user.loggedIn == false) {
      showAlert({
        header: "Upload",
        message: "You need to login to record voices",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Confirm Cancel");
            }
          },
          {
            text: "Login",
            handler: () => {
              history.push("/login");
            }
          }
        ]
      })
      return
    }
    history.push('/record-voice')
  }

  const uploadBtn = () => {
    if (user.loggedIn == false) {
      showAlert({
        header: "Upload",
        message: "You need to login to record sounds",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Confirm Cancel");
            }
          },
          {
            text: "Login",
            handler: () => {
              history.push("/login");
            }
          }
        ]
      })
      return
    }
    history.push('/upload-voice')
  }
  if (open == true) {
    // history.push("/playing");
    return <Redirect to="/playing" />;
  }

  return (
    <IonPage className="bg-app-home">
      {user.loggedIn == false && (
        <>
          <IonToolbar className="toolbar-transparent">
            <img src="/assets/icon/icon.png" style={{marginLeft:"8%", marginTop:"2%"}} width="90vw" alt="" />
            <IonButton fill="default" class="ion-no-padding ion-margin" onClick={()=>setShowActionSheet(true)} slot="end">
              <IonIcon icon={duplicate} className="home-icon"/>
            </IonButton>
            <IonButton routerLink="/login" fill="default" class="ion-margin-end ion-no-padding" slot="end">
              <IonIcon icon={enter} className="home-icon"/>
            </IonButton>
          </IonToolbar>
          <IonContent className="home-content">
            <IonRow id="margin-for-float-btn-home">
              <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                {/* <IonRow className="home-title">
                  <IonLabel className="ion-margin-top"><b>Welcome!</b></IonLabel>
                </IonRow> */}
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
          <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass=""
            header="Choose"
            buttons={[
              {
                text: "Record Your Voice",
                icon: mic,
                data: 10,
                handler: () => recordBtn()
              },
              {
                text: "Upload Your Voice",
                icon: cloudUploadOutline,
                data: "Data value",
                handler: () => uploadBtn()
              },
            ]}
          ></IonActionSheet>
        </>
      )}
      
      {user.loggedIn == true && (
        <>
          <IonToolbar className="toolbar-transparent">
            <img src="/assets/icon/icon.png" style={{marginLeft:"8%", marginTop:"2%"}} width="23%" alt="" />
            <IonButton fill="default" class="ion-no-padding ion-margin" onClick={()=>setShowActionSheet(true)} slot="end">
              <IonIcon icon={duplicate} className="home-icon"/>
            </IonButton>
          </IonToolbar>
          <IonContent className="home-content">
            <IonRow id="margin-for-float-btn-home">
              <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                {/* <IonRow className="home-title">
                  <IonLabel className="ion-margin-top"><b>Welcome!</b></IonLabel>
                </IonRow> */}
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
          <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass=""
            header="Choose"
            buttons={[
              {
                text: "Record Your Voice",
                icon: mic,
                data: 10,
                handler: () => recordBtn()
              },
              {
                text: "Upload Your Voice",
                icon: cloudUploadOutline,
                data: "Data value",
                handler: () => uploadBtn()
              },
            ]}
          ></IonActionSheet>
        </>
      )}
    </IonPage>
  );
};

export default React.memo(Home);


