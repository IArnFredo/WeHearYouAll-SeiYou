import {
  IonActionSheet,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import {
  arrowUpOutline,
  cloudUploadOutline,
  logOutOutline,
  mic,
  pencilOutline,
  playOutline,
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { userContext } from "../provider/User";
import "./Profile.css";


const Profile: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = useContext(userContext);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [userAge, setAge] = useState<number>(0);
  const [readData, setReadData] = useState<Array<any>>([]);
  const [signout, setSignOut] = useState<string>("false");

  const [present] = useIonAlert();

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "users"),
        where("UserID", "==", user.userId!)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setReadData(data);
      localStorage.setItem("dob", JSON.stringify(data[0].dob));
      AgeCal();
    }
    if (user !== null) {
      fetchData();
    } else {
      setReadData([]);
    }
    return;
  }, [user]);

  const unsubscribe = onSnapshot(collection(db, "users"), () => {
    // Respond to data
    // ...
  });

  unsubscribe();

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

  const SignOut = () => {
    present({
      message: "Are you sure you want to sign out?",
      header: "Warning",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            signOut(auth)
              .then(() => {
                setSignOut("true");
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          text: "No",
          handler: () => {
            console.log("cancel");
            return;
          },
        },
      ],
    });
  };

  const changePage = () => {
    if (signout == "true") {
      return <Redirect to="/home" />;
    }
    if (user.loggedIn == false) {
      return <Redirect to="/login" />;
    }
    else {
      return <Redirect to="/profile" />;
    }
  };

  return (
    <IonPage>
      {user.loggedIn == true && (
        <IonContent fullscreen className="bg-app" id="bg">
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <img className="avatar-profile" src={user.userData.photoURL} />
              {readData.map((data) => (
                <IonCardHeader key={data.UserID} class="text-profile">
                  <IonCardTitle>{data.name}</IonCardTitle>
                  <IonCardSubtitle>
                    {user.userData?.emailVerified ? "Verified" : "Not Verified"} <br />
                    {data.gender}, {userAge}
                  </IonCardSubtitle>
                </IonCardHeader>
              ))}
              <IonCardContent>
                <IonButton
                  routerLink="/edit-profile"
                  expand="block"
                  shape="round"
                >
                  <IonIcon className="button-icon" icon={pencilOutline} />&nbsp;
                  Edit Profile
                </IonButton>
                <IonButton
                  routerLink="/your-voice-list"
                  expand="block"
                  shape="round"
                >
                  <IonIcon className="button-icon" icon={playOutline} />&nbsp;
                  Your Voices
                </IonButton>
                <IonButton
                  onClick={() => setShowActionSheet(true)}
                  expand="block"
                  shape="round"
                >
                  <IonIcon className="button-icon" icon={arrowUpOutline} />&nbsp;
                  Upload New Voices
                </IonButton>
              </IonCardContent>
            </IonCol>
          </IonRow>
          <IonRow id="margin-for-float-btn">
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonCardContent>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={SignOut}
                  color="danger"
                >
                  <IonIcon className="button-icon" icon={logOutOutline} />&nbsp;
                  Sign Out
                </IonButton>
              </IonCardContent>
            </IonCol>
          </IonRow>
        </IonContent>
      )}

      {
        user.loggedIn == false && (
          changePage()
        )
      }

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
            handler: () => {
              console.log("Share clicked");
            },
          },
          {
            text: "Upload Your Voice",
            icon: cloudUploadOutline,
            data: "Data value",
            handler: () => {
              console.log("Play clicked");
            },
          },
        ]}
      ></IonActionSheet>
    </IonPage>
  );
};

export default React.memo(Profile);
