import { IonAvatar, IonBackButton, IonButtons, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { query, collection, where, getFirestore, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Profile.css';

const AnotherProfile: React.FC = () => {
  const db = getFirestore();
  const userid = useParams<{ userID: string }>().userID;
  const [anotherUser, setAnotherUser] = useState<Array<any>>([]);
  const [userAge, setAge] = useState<number>(0);

  console.log(userid);
  
  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "users"), where("UserID", "==", userid));
      const querySnapshot = await getDocs(q);
      setAnotherUser(
        querySnapshot.docs.map((doc) => ({ ...doc.data() }))
      );
      AgeCal();
      
    }
    fetchData();
    return
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
  };
  return (
    <IonPage className='bg-app'>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>Back Button</IonTitle>
      </IonToolbar>

      {anotherUser.map((user) => (
        <IonContent fullscreen className='ion-padding' id='bg' key={user.UserID}>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <img className='avatar-profile' src='./assets/images/shionne.jpg' />
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

                <IonItem className="vList" lines="full"
                  button>
                  <IonAvatar className="avatar" slot="start">
                    <img src='https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg' alt="" />
                  </IonAvatar>
                  <IonLabel className="label">judul voice</IonLabel>
                </IonItem>

              </IonList>
            </IonCol>
          </IonRow>
        </IonContent>
      ))}

    </IonPage>

  )
}

export default React.memo(AnotherProfile);