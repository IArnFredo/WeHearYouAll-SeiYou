import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonPage,
  IonPopover,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { pencilOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";



const EditProfile: React.FC = () => {

  const auth = getAuth();
  const db = getFirestore();
  const db2 = getDatabase();
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileD] = useState<Array<any>>([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState("2001-12-15");

  useEffect(() => {
    onAuthStateChanged(auth, (auser) => {
      if (auser) {
        setUser(auser);
      } else {
        setUser(null);
      }
    });
      async function fetchData() {
        const q = query(
          collection(db, "users"),
          where("UserID", "==", auth?.currentUser?.uid)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0].id);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProfileD(data);
        data.map((item) => {
          setGender(item.gender);
          setName(item.name);
          setSelectedDate(item.dob);
        })
      }
      fetchData();
  }, [user]);
  
  useEffect(() =>{
    console.log(selectedDate);
  },[selectedDate])
  
  useEffect(() =>{
    console.log(gender);
  },[gender])

  const saveUpdate = async () => {
    // set(ref(db2, 'users/' + auth?.currentUser?.uid), {
    //   name: name,
    //   gender: gender,
    //   dob: selectedDate,
    //   // photoUrl: 
    // })
    // const docRef = doc()
    // await setDoc()
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
      {profileData.map((data) => (
        <IonContent className="bg-app" key={data.id}>
          {/* <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">

            </IonCol>
          </IonRow> */}
          <IonRow>
            <IonCol size="12" className="ion-text-center edit-image-profile">
              <img
                src={data.photoUrl}
                className="radius-pic-edit-profile"
                alt=""></img>
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
              {/* <IonItem> */}
                <IonDatetime
                  value={selectedDate}
                  onIonChange={(e) => setSelectedDate(e.detail.value!)}
                  presentation="date"
                  className="dt"
                ></IonDatetime>
              {/* </IonItem> */}
            </IonCol>
          </IonRow>
          <IonFooter style={{ position: "sticky" }}>
            <IonToolbar>
              <IonRow className="ion-margin">
                <IonCol class="ion-text-center">
                  <IonButton expand="full" shape="round" onClick={saveUpdate}>
                    Save
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonToolbar>
          </IonFooter>
        </IonContent>
      ))}
    </IonPage>
  );
};

export default EditProfile;
