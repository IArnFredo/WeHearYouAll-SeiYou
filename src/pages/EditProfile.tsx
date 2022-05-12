import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { pencilOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";

const EditProfile: React.FC = () => {

  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<DocumentData>();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (auser) => {
      if (auser) {
        setUser(auser);
      } else {
        setUser(null);
      }
    });
    async function fetchData() {
      if (user) {
        const userRef = doc(db, 'users', user!.uid);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        if (userData) {
          setUserData(userData);
          setGender(userData.gender);
          setName(userData.name);
          setSelectedDate(userData.dob);
          console.log(userData.dob)
        }
      }
    }
    fetchData();
  }, [auth, db, user]);

  const saveUpdate = async () => {
    const docRef = doc(db, 'users', user!.uid);
    try {
      await setDoc(docRef, {
        ...userData,
        gender,
        name,
        dob: selectedDate,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // bg-app is the class for the background
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/@profile" />
        </IonButtons>
        <IonTitle>Edit Profile</IonTitle>
      </IonToolbar>
        <IonContent className="bg-app">
          <IonRow>
            <IonCol size="12" className="ion-text-center edit-image-profile">
              {userData && (
                <img
                  src={userData.photoUrl}
                  className="radius-pic-edit-profile"
                  alt="profile"
                />
              )}
              <div className="centered-title-edit">
                <IonIcon
                  className="pencil"
                  size="small"
                  color="dark"
                  icon={pencilOutline}
                ></IonIcon>
                {/* <p style={{ color: "black" }}>Change</p> */}
              </div>
            </IonCol>
            <IonCol className="ion-text-center" size="12">
              <IonItem className="ion-margin ion-item-bg">
                <IonLabel position="stacked" color="medium">
                  Name
                </IonLabel>
                {/* lack ref on input */}
                <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol className="ion-text-center" size="12">
              {/* <IonRadioGroup
              value={selected}
              onIonChange={(e) => setSelected(e.detail.value)}
            >
              <IonListHeader>
                <IonLabel>Gender</IonLabel>
              </IonListHeader>
              <IonItem className="ion-item-bg inner-border-none">
                <IonLabel>Male</IonLabel>
                <IonRadio value="Male">Male</IonRadio>
              </IonItem>
              <IonItem className="ion-item-bg inner-border-none">
                <IonLabel>Female</IonLabel>
                <IonRadio value="Female"></IonRadio>
              </IonItem>
            </IonRadioGroup> */}
              <IonLabel position="stacked">
                {" "}
                <p id="label">Gender</p>
              </IonLabel>
              {gender !== '' && (
                <IonSegment
                  value={gender}
                  onIonChange={(e) => setGender(e.detail.value!)} 
                  className="segment"
                >
                  {""}
                  <IonSegmentButton class="segment-btn" value="Male">
                    <IonLabel>Male</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton class="segment-btn" value="Female">
                    <IonLabel>Female</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              )}
            </IonCol>
            <IonCol className="ion-text-center" size="12">
              <IonLabel position="stacked">
                {" "}
                <p id="label">Date of Birth</p>
              </IonLabel>
              {selectedDate !== '' && (
                <IonDatetime
                  value={selectedDate}
                  onIonChange={(e) => setSelectedDate(e.detail.value!)}
                  presentation="date"
                  className="dt"
                ></IonDatetime>
              )}
            </IonCol>
          </IonRow>
          <IonFooter style={{ position: "sticky" }}>
            <IonToolbar>
              <IonRow className="ion-margin">
                <IonCol class="ion-text-center">
                  {user && (
                    <IonButton expand="full" shape="round" onClick={saveUpdate}>
                      Save
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
            </IonToolbar>
          </IonFooter>
        </IonContent>
    </IonPage>
  );
};

export default EditProfile;
