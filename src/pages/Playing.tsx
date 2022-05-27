import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert
} from "@ionic/react";
import { collection, doc, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
import {
  alertCircleOutline, arrowBackCircle, sendOutline, text
} from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import 'react-h5-audio-player/lib/styles.css';
import { Redirect } from "react-router";
import { closePlayer, getCurrentTrack, getPlaying, getTracks, isPlayerOpen, useSoundsContext } from "../provider/Sounds";
import { userContext } from "../provider/User";
import "./Playing.css";


// const media = Media;
// const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
// fileMusic.seekTo(1);
const Playing: React.FC = () => {
  const db = getFirestore();
  const user = useContext(userContext);
  const { state, dispatch } = useSoundsContext();
  const playing = getPlaying(state);
  const trackSounds = getTracks(state);
  const track = trackSounds[state.playing.index];
  const comment = useRef<HTMLIonInputElement>(null);
  const [text, setText] = useState<string>('');
  const [showAlert] = useIonAlert();
  const [allComments, setAllComments] = useState<Array<any>>([]);
  const open = isPlayerOpen(state);
  const currentTrack = getCurrentTrack(state, state.playing.index);
  useEffect(() => {
    const q = query(collection(db, "comments"), where("soundId", "==", currentTrack.id));
    onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setAllComments(data);
    })
  }, [])

  if (!playing) {
    return null;
  }

  const uploadComment = () => {
    if (user.loggedIn == true) {
      showAlert({
        header: "Are you sure",
        message: "Do you want to upload this comment?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Confirm Cancel");
              return
            }
          },
          {
            text: "Submit",
            handler: () => {

              const id = new Date().getTime().toString();
              const comment = doc(db, "comments", id);
              const ok = async () => {
                await setDoc(comment, {
                  id: id,
                  text: text,
                  soundId: currentTrack.id,
                  userId: user.userId,
                  userName: user.userData.displayName,
                  userPhoto: user.userData.photoURL,
                })
              }
              ok();
              return;
            }
          }
        ]
      })
      return
    }

  }

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
      <IonPage className="bg-app">
        <IonToolbar>
          <IonButtons class="ion-margin-start" style={{ marginTop: '10px', marginLeft: '30px' }} slot="start" onClick={ChangeURLandState}>
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
          <IonRow>
            <IonCol>
              <IonCard id="comment-card">
                <IonList id="comment-box">
                  {allComments.length > 0 ? (
                    <IonItem lines="none">
                      <IonAvatar slot="start">
                        <img src={allComments[0].userPhoto} alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>{allComments[0].userName}</b></p>
                        <p className="title-text">{allComments[0].text}.</p>
                      </div>
                    </IonItem>
                  ) : (
                    <IonItem lines="none">
                      <IonLabel>There is no comments</IonLabel>
                    </IonItem>
                  )}

                </IonList>
                <IonRow id="comment-row">
                  {user.loggedIn == false && (
                    <>
                      <IonCol size="10">
                        <IonInput disabled id="comment-input" placeholder="Login first to comment..." /* ref={} onIonChange={e => setText(e.detail.value!)} */> </IonInput>
                      </IonCol>
                      <IonCol size="2">
                        <IonButton disabled size="small" expand='block' fill="clear" color="primary" className="msg-button">
                          <IonIcon size="small" icon={sendOutline} slot="icon-only"></IonIcon>
                        </IonButton>
                      </IonCol>
                    </>
                  )}

                  {user.loggedIn == true && (
                    <>
                      <IonCol size="10">
                        <IonInput id="comment-input" placeholder="Comment here..." ref={comment} onIonChange={e => setText(e.detail.value!)}> </IonInput>
                      </IonCol>
                      <IonCol size="2">
                        <IonButton size="small" expand='block' fill="clear" color="primary" onClick={uploadComment} className="msg-button">
                          <IonIcon size="small" icon={sendOutline} slot="icon-only"></IonIcon>
                        </IonButton>
                      </IonCol>
                    </>
                  )}
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default React.memo(Playing);
