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
  IonIcon,
  IonPage,
  IonRow,
  useIonAlert,
} from "@ionic/react";
import { getAuth, signOut, User } from "firebase/auth";
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
import React, { useState } from "react";
import "./Profile.css";
const auth = getAuth();

const Profile: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  // const [signOutConfirmation, setSignOutConfirmation] = useState(false);
  const [present] = useIonAlert();
  const [user, setUser] = useState<User | null>(null);

  const SignOut = () => {
    present({
      message: "Are you sure you want to sign out?",
      header: "Warning",
      buttons: [{ text: "Yes", handler : () => {
        signOut(auth)
        .then(() => {
          localStorage.clear();
          setUser(null);
        })
        .catch((error) => {
          console.log(error);
        });
      }}, {text: "No", handler: () => {
        console.log("cancel");
        return;
      }}],
    });
  };

  return (
    <IonPage className="bg-app">
      <IonContent fullscreen className="ion-padding" id="bg">
        <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
            <img className="avatar-profile" src="./assets/images/shionne.jpg" />
            <IonCardHeader class="text-profile">
              <IonCardTitle>Yudhistira Aremaputra Wardhana</IonCardTitle>
              <IonCardSubtitle>Male, 20</IonCardSubtitle>
            </IonCardHeader>
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
