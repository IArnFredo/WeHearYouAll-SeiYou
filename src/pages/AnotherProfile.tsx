import { IonAvatar, IonBackButton, IonText, IonButtons, IonButton, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar, IonThumbnail } from '@ionic/react';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import { playTrack, useSoundsContext } from '../provider/Sounds';
import { chatboxEllipsesSharp } from 'ionicons/icons';
import './Profile.css';
import { userContext } from '../provider/User';

const AnotherProfile: React.FC = () => {
  const db = getFirestore();
  const userid = useParams<{ userID: string }>().userID;
  const [anotherUser, setAnotherUser] = useState<Array<any>>([]);
  const [voices, setAnotherVoices] = useState<Array<any>>([]);
  const [userAge, setAge] = useState<number>();
  const history = useHistory();
  const { state, dispatch } = useSoundsContext();
  const user = useContext(userContext);


  useEffect(() => {
    const q = query(collection(db, "users"), where("UserID", "==", userid));
    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setAnotherUser(data);
      var today = new Date();
      var birthDate = new Date(data[0].dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
      }
      setAge(age);
    });
    const q2 = query(collection(db, "sounds"), where("UserID", "==", userid));
    onSnapshot(q2, (querySnapshot) => {
      const voices = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setAnotherVoices(voices);
      return;
    });

    return;
  }, [])


  const doPlay = useCallback(sound => {
    dispatch(playTrack(sound));
  }, []);


  if (userid == undefined) {
    history.push("/home");
  }

  if (userid == user.userId) {
    return <Redirect to={'/profile'} />
  }

  return (
    <IonPage className='bg-app' id='margin-for-float-btn-another-profile'>
      {anotherUser.map((user) => (
        <IonToolbar key={user.UserID}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{user.name}</IonTitle>
        </IonToolbar>
      ))}
      {anotherUser.map((user) => (
        <IonContent fullscreen id='bg' className='ion-content-account' key={user.UserID}>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              {/* <div className='avatar-profile-cont'>
                <img className='avatar-profile' src={user.photoUrl} />
              </div>
              <IonCardHeader class='text-profile'>
                <IonCardTitle>{user.name}</IonCardTitle>
                <IonCardSubtitle>{user.gender}, 20</IonCardSubtitle>
              </IonCardHeader> */}
              <IonItem lines="none">
                <IonThumbnail>
                  <img src={user.photoUrl} />
                </IonThumbnail>
                <IonLabel>
                  <IonTitle className="name-profile">{user.name}</IonTitle>
                  <IonText className="genderAge-profile">{user.gender}, {userAge}</IonText>
                  <IonButton
                    color="secondary"
                    className="chatBtn"
                    routerLink={`/chat/${user.UserID}`}
                    expand="block"
                    shape="round"
                  >
                    Chat me &nbsp;
                    <IonIcon icon={chatboxEllipsesSharp} />&nbsp;
                  </IonButton>
                </IonLabel>
                {/* <IonLabel>{user.gender}, {userAge}</IonLabel> */}
              </IonItem>
            </IonCol>
          </IonRow>
          {/* <IonRow>
            <IonButtons>
              <IonButton color="" routerLink='/profile'>
                <IonIcon size='large' icon={chatboxEllipsesOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonRow> */}
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonCardTitle class='text-profile'>Voices</IonCardTitle>
              {voices.map((voice) => (
                <IonList key={voice.id} className="" onClick={() => doPlay(voice)}>
                  <IonItem className="vList" lines="full"
                    button>
                    <IonAvatar className="avatar" slot="start">
                      <img src={voice.images} alt="" />
                    </IonAvatar>
                    <IonLabel className="label">{voice.name}</IonLabel>
                  </IonItem>
                </IonList>
              ))}
              {voices.length === 0 && (
                <IonList>
                  <IonItem lines='full'>
                    <IonLabel className="label">No voice's uploaded by user</IonLabel>
                  </IonItem>
                </IonList>
              )}
            </IonCol>
          </IonRow>

        </IonContent>
      ))}

    </IonPage>

  )
}

export default React.memo(AnotherProfile);