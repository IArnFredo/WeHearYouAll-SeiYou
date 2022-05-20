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
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { getAuth, signOut } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { link } from "fs";
import {
  arrowUpOutline,
  cloudUploadOutline,
  logOutOutline,
  mic,
  pencilOutline,
  playOutline,
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, Router, useHistory, useLocation } from "react-router";
import { userContext } from "../provider/User";
import "./Profile.css";

const Profile: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = useContext(userContext);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [userAge, setAge] = useState<number>(0);
  const [presentToast, dismissToast] = useIonToast();
  const [loading, dismissLoading] = useIonLoading();
  const [readData, setReadData] = useState<Array<any>>([]);
  const [signout, setSignOut] = useState<string>("false");
  const [present] = useIonAlert();
  const history = useHistory();
  const location = useLocation().pathname;

  useEffect(() => {
    async function fetchData() {
      if (user) {
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
      else {
        return null;
      }
    }
    if (user.userId != undefined) {
      fetchData();
    } else {
      setReadData([]);
    }
    return;
  }, [db, user]);
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
            loading({
              message: "Signing out...",
              spinner: "crescent",
            })
            signOut(auth)
              .then(() => {
                dismissLoading();
                setSignOut("true");
                presentToast({
                  message: 'Sign out successful',
                  buttons: [{ text: 'hide', handler: () => dismissToast() }],
                  duration: 3000,
                });
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
      history.push("/home");
    }
    if (user.loggedIn == false) {
      return <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    }
    else {
      return <Redirect to={'/profile'} />
    }
  };

  const recordBtn = () => {
    history.push('/record-voice')
  }

  const uploadBtn = () => {
    history.push('/record-voice')
  }

  if (user == undefined) return null;

  return (
    <IonPage>
      {user && (
        <IonContent fullscreen className="bg-app" id="bg">
          <IonRow>
            {readData.map((data) => (
              <IonCol key={data.UserID} size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                <div className="avatar-profile-cont">
                  <img className="avatar-profile" src={data.photoUrl} />
                </div>
                <IonCardHeader class="text-profile">
                  <IonCardTitle>{data.name}</IonCardTitle>
                  <IonCardSubtitle>
                    {user.userData?.emailVerified ? "Verified" : "Not Verified"} <br />
                    {data.gender}, {userAge}
                  </IonCardSubtitle>
                </IonCardHeader>

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
            ))}
          </IonRow>
          <IonRow id="margin-for-float-btn-profile">
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
    </IonPage>
  );
};

export default React.memo(Profile);
