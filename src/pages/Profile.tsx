import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonToast,
  useIonViewWillLeave
} from "@ionic/react";
import { clear } from "console";
import { getAuth, signOut } from "firebase/auth";
import {
  collection, doc, getFirestore,
  onSnapshot, query, updateDoc, where
} from "firebase/firestore";
import {
  arrowUpOutline,
  chatboxEllipsesSharp,
  cloudUploadOutline,
  logOutOutline,
  mic,
  pencilOutline,
  playOutline
} from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import { userContext } from "../provider/User";
import "./Profile.css";

const Profile: React.FC = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = useContext(userContext);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [userAge, setAge] = useState<number>();
  const [presentToast, dismissToast] = useIonToast();
  const [loading, dismissLoading] = useIonLoading();
  const [readData, setReadData] = useState<Array<any>>([]);
  const [signout, setSignOut] = useState<string>("false");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [listChat, setListChat] = useState<Array<any>>([]);

  const [present] = useIonAlert();
  const history = useHistory();
  const location = useLocation().pathname;

  useIonViewWillLeave(() => {
    setShowModal(false);
  })

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const q = query(
          collection(db, "users"),
          where("UserID", "==", user.userId!)
        );
        // const querySnapshot = await onSnapshot(q);
        // const data = querySnapshot.docs.map((doc) => doc.data());
        onSnapshot(q, (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setReadData(data);
          var today = new Date();

          const birthDate = new Date(data[0].dob);
          var age = today.getFullYear() - birthDate!.getFullYear();
          var m = today.getMonth() - birthDate!.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate!.getDate())) {
            age--;
          }
          setAge(age);
        })
      }
      else {
        return null;
      }
    }

    async function fetchChat() {
      const z = query(
        collection(db, "users"),
        where("UserID", "!=", user.userId!)
      );
      onSnapshot(z, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setListChat(data);
      })
    };

    fetchChat();

    if (user != undefined) {
      fetchData();
    } else {
      setReadData([]);
      return
    }
    return;
  }, [db, user]);


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
              duration: 200,
            })
            const signout = doc(db, "users", user.userId!);
            signOut(auth)
              .then(() => {
                const ok = async () => {
                  await updateDoc(signout, {
                    isOnline: false,
                  });
                }
                ok();
                setSignOut("true");
                presentToast({
                  message: 'Sign out successful',
                  buttons: [{ text: 'hide', handler: () => dismissToast() }],
                  duration: 1000,
                });
              })
              .catch((error) => {
                console.error(error);
                presentToast({
                  message: 'Sign out failed',
                  buttons: [{ text: 'hide', handler: () => dismissToast() }],
                  duration: 1000,
                });
              });
          },
        },
        {
          text: "No",
          handler: () => {
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
    history.push('/upload-voice')
  }
  if (user == undefined) return null;

  return (
    <IonPage>
      {user && (
        <IonContent fullscreen className="bg-app" id="bg">
          <IonRow>
            {readData.map((data, id) => (
              <IonCol key={id} size="12">
                <div className="avatar-profile-cont">
                  <img className="avatar-profile" src={data.photoUrl} />
                </div>
                <IonCardHeader class="text-profile">
                  <IonCardTitle>{data.name}</IonCardTitle>
                  <IonCardSubtitle>
                    {/* {user.userData?.emailVerified ? "Verified" : "Not Verified"} <br /> */}
                    {data.gender}, {userAge}
                  </IonCardSubtitle>
                  <IonCardContent>
                    <IonButton
                      color="secondary"
                      onClick={() => setShowModal(true)}
                      className="chatBtn animated-btn"
                      shape="round"
                    >
                      Chat List &nbsp;
                      <IonIcon icon={chatboxEllipsesSharp} />&nbsp;
                    </IonButton>
                  </IonCardContent>
                </IonCardHeader>

                <IonCardContent>
                  <IonButton id="profile-Button"
                    routerLink="/edit-profile"
                    expand="full"
                    shape="round"
                    className="animated-btn">
                    <IonIcon className="button-icon" icon={pencilOutline} />&nbsp;
                    Edit Profile
                  </IonButton>
                  <IonButton id="profile-Button"
                    routerLink="/your-voice-list"
                    expand="block"
                    shape="round"
                    className="animated-btn">
                    <IonIcon className="button-icon" icon={playOutline} />&nbsp;
                    Your Voices
                  </IonButton>
                  <IonButton id="profile-Button"
                    onClick={() => setShowActionSheet(true)}
                    expand="block"
                    shape="round"
                    className="animated-btn">
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
                <IonButton id="profile-Button"
                  expand="block"
                  shape="round"
                  onClick={SignOut}
                  color="danger"
                  className="animated-btn">
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
      <IonModal isOpen={showModal}>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Chat List</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {listChat.map((data, id) => (
            <IonItem key={id} button routerLink={`/chat/${data.UserID}`}>
              <IonThumbnail slot="start">
                <img src={data.photoUrl} />
              </IonThumbnail>
              <IonLabel>{data.name}</IonLabel>
            </IonItem>
          ))}
        </IonContent>

      </IonModal>

    </IonPage>
  );
};

export default React.memo(Profile);
