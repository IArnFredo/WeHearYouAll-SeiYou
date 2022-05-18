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
import { getAuth, updateProfile } from "firebase/auth";
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { pencilOutline } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { userContext } from "../provider/User";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import "./EditProfile.css";

const EditProfile: React.FC = () => {
  const history = useHistory();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const user = useContext(userContext);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(false);
  const [userData, setUserData] = useState<DocumentData>();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState('');
  const [, setSelectedFile] = useState<File>();
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined,
    preview: string,
  }>();

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const userRef = doc(db, 'users', user.userId!);
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
  }, [db, user]);

  const saveUpdate = async (photoUrl: string) => {
    const docRef = doc(db, 'users', user.userId!);
    try {
      await setDoc(docRef, {
        ...userData,
        gender,
        name,
        dob: selectedDate,
        photoUrl: photoUrl !== '' ? photoUrl : userData!.photoUrl,
      });
      updateProfile(auth.currentUser!, {
        displayName: name,
        photoURL: photoUrl !== '' ? photoUrl : userData!.photoUrl,
      }).then(() => {
        console.log(auth.currentUser!);
      }).catch((error) => {
        console.error("Error updating profile: ", error);
      });
      history.push('/profile');
    } catch (error) {
      console.error(error);
    }
  }

  const changePage = () => {
    if (!user.loggedIn) {
      return <Redirect to="/login" />;
    }
    else {
      return <Redirect to="/profile" />;
    }
  };

  const choosePicture = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 80,
      width: 500
    });
    console.log(photo);

    const response = await fetch(photo.webPath!);
    const bin = await response.blob();
    setSelectedFile(bin as File);

    if (!photo || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path,
      preview: photo.webPath,
    });
  };

  const updateHandler = async () => {
    setDisabledSubmitBtn(true);
    if (!name || name.toString().trim().length === 0 || !gender || !selectedDate) {
      console.log(takenPhoto);
      setDisabledSubmitBtn(false);
      return;
    }

    if (takenPhoto) {
      const photoName = user.userId + '.jpeg';
      const photoBlob = await fetch(takenPhoto.preview).then(res => res.blob());

      // store image in firebase storage
      const storageRef = ref(storage, `images/${photoName}`);
      uploadBytes(storageRef, photoBlob).then((snapshot) => {
        console.log('photo uploaded', snapshot);
        getDownloadURL(ref(storage, `images/${photoName}`)).then((photoUrl) => {
          // add memory to firestore
          saveUpdate(photoUrl);
          console.log('photo url:', photoUrl);
        }).catch((err) => console.error(err));
      });
    } else {
      saveUpdate('');
    }
  };

  if (!user) {
    return null;
  }

  return (
    // bg-app is the class for the background
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/profile" />
        </IonButtons>
        <IonTitle>Edit Profile</IonTitle>
      </IonToolbar>
      {user.loggedIn !== false ? (
        <IonContent className="bg-app">
          <IonRow>
            {userData && (
              <IonCol size="12" className="ion-text-center edit-image-profile">
                {takenPhoto ? (
                  <img
                    src={takenPhoto.preview}
                    className="radius-pic-edit-profile"
                    alt="profile"
                    onClick={choosePicture}
                  />
                ) : (
                  <img
                    src={userData.photoUrl}
                    className="radius-pic-edit-profile"
                    alt="profile"
                    onClick={choosePicture}
                  />
                )}
                <div className="centered-title-edit" onClick={choosePicture}>
                  <IonIcon
                    className="pencil"
                    size="small"
                    color="dark"
                    icon={pencilOutline}
                  ></IonIcon>
                  {/* <p style={{ color: "black" }}>Change</p> */}
                </div>
              </IonCol>
            )}
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
                    <IonButton
                      expand="full"
                      shape="round"
                      onClick={updateHandler}
                      disabled={disabledSubmitBtn}
                    >
                      Save
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
            </IonToolbar>
          </IonFooter>
        </IonContent>
      ) :
        changePage()
      }
    </IonPage>
  );
};

export default React.memo(EditProfile);
