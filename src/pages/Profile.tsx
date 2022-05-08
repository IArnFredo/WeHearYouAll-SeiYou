import {
  IonActionSheet,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  useIonAlert,
} from "@ionic/react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  arrowUpOutline,
  caretForwardCircle,
  cloudUploadOutline,
  heart,
  logoInstagram,
  logOutOutline,
  mic,
  pencilOutline,
  playOutline,
  share,
  trash,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Profile.css";
const auth = getAuth();
const db = getFirestore();

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [userAge, setAge] = useState<number>(0);
  const [readData, setReadData] = useState<Array<any>>([]);

  const [present] = useIonAlert();
  const history = useHistory();

  useEffect(() => {
    // var uid = JSON.parse(localStorage.getItem("user") as string);
    // console.log(uid.uid);
    onAuthStateChanged(auth, (auser) => {
      if (auser) {
        setUser(auser);
        localStorage.setItem("user", JSON.stringify(auser));
        console.log(user);
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
      const data = querySnapshot.docs.map((doc) => doc.data());
      setReadData(data);
      localStorage.setItem("dob", JSON.stringify(data[0].dob));
      AgeCal();
    }
    if (user !== null) {
      fetchData();
    }
  }, [user]);

  const AgeCal = () => {
    var today = new Date();
    const birthDate = new Date(JSON.parse(localStorage.getItem("dob")!));
    var age = today.getFullYear() - birthDate!.getFullYear();
    var m = today.getMonth() - birthDate!.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate!.getDate())) {
      age--;
    }
    // console.log(today);
    // console.log(birthDate);
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
                localStorage.clear();
                setUser(null);
                history.push("/@login");
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

  return (
    <IonPage className="bg-app">
      {user ? (
        <IonContent fullscreen className="ion-padding" id="bg">
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <img className="avatar-profile" src={user?.photoURL!} />
              {readData.map((data) => (
                <IonCardHeader key={data.UserID} class="text-profile">
                  <IonCardTitle>{user?.displayName}</IonCardTitle>
                  <IonCardSubtitle>
                    {data.gender}, {userAge}
                  </IonCardSubtitle>
                </IonCardHeader>
              ))}
              <IonCardContent>
                <IonButton
                  routerLink="/@edit-profile"
                  expand="block"
                  shape="round"
                >
                  <IonIcon className="button-icon" icon={pencilOutline} />
                  Edit Profile
                </IonButton>
                <IonButton
                  routerLink="/@your-voice-list"
                  expand="block"
                  shape="round"
                >
                  <IonIcon className="button-icon" icon={playOutline} />
                  Your Voices
                </IonButton>
                <IonButton
                  onClick={() => setShowActionSheet(true)}
                  expand="block"
                  shape="round"
                >
                  <IonIcon className="button-icon" icon={arrowUpOutline} />
                  Upload New Voices
                </IonButton>
              </IonCardContent>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton
                expand="block"
                shape="round"
                onClick={SignOut}
                color="danger"
              >
                <IonIcon className="button-icon" icon={logOutOutline} />
                Sign Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>
      ) : (
        <IonContent className="landingContent" fullscreen>
          {/* <div>
            <IonButton
              className="skipButton"
              routerLink={"/@home"}
              fill="clear"
              color="light"
            >
              Skip
            </IonButton>
            <img
              src="../assets/images/landing.png"
              alt=""
              className="landingImg"
            />
          </div> */}
          <IonGrid className="ion-text-center ion-margin-top">
            <IonLabel className="text1">Welcome to SeiYou</IonLabel>
            <br />
            <IonLabel className="text2">
              Start your voice act here, it's free!
            </IonLabel>
            <IonRow className="ion-margin-top ion-justify-content-center">
              <IonButton
                fill="clear"
                shape="round"
                color="dark"
                routerLink={"/@register"}
              >
                Sign Up
              </IonButton>
              <IonButton shape="round" routerLink={"/@login"}>
                Sign In
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
      )}

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

export default Profile;
