import { IonAvatar, IonBackButton, IonButtons, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './Profile.css';

const AnotherProfile: React.FC = () => {
  const db = getFirestore();
  const userid = useParams<{ userID: string }>().userID;
  const [anotherUser, setAnotherUser] = useState<Array<any>>([]);
  const [voices, setAnotherVoices] = useState<Array<any>>([]);
  const [userAge, setAge] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    const q = query(collection(db, "users"), where("UserID", "==", userid));
    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setAnotherUser(data);
    });
    const q2 = query(collection(db, "sounds"), where("UserID", "==", userid));
    onSnapshot(q2, (querySnapshot) => {
      const voices = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setAnotherVoices(voices);
    });
    AgeCal();
    return;
  }, [])


  const AgeCal = () => {
    var today = new Date();
    const birthDate = new Date(JSON.parse(localStorage.getItem("dob")!));
    var age = today.getFullYear() - birthDate!.getFullYear();
    var m = today.getMonth() - birthDate!.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate!.getDate())) {
      age--;
    }
    setAge(age);
    return
  };

  if (userid == undefined) {
    history.push("/home");
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
              <div className='avatar-profile-cont'>
                <img className='avatar-profile' src={user.photoUrl} />
              </div>
              <IonCardHeader class='text-profile'>
                <IonCardTitle>{user.name}</IonCardTitle>
                <IonCardSubtitle>{user.gender}, 20</IonCardSubtitle>
              </IonCardHeader>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonCardTitle class='text-profile'>Voices</IonCardTitle>
              <IonList className="ion-margin">
                {voices.map((voice) => (
                  <IonItem key={voice.id} className="vList" lines="full"
                    button>
                    <IonAvatar className="avatar" slot="start">
                      <img src={voice.images} alt="" />
                    </IonAvatar>
                    <IonLabel className="label">{voice.name}</IonLabel>
                  </IonItem>
                ))}
                {voices.length === 0 && (
                  <IonLabel className="label">No voice's uploaded by user</IonLabel>
                )}
              </IonList>
            </IonCol>
          </IonRow>
        </IonContent>
      ))}

    </IonPage>

  )
}

export default React.memo(AnotherProfile);