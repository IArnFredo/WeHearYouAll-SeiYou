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
import { getAuth, signOut } from "firebase/auth";
import {
  collection, collectionGroup, doc, getDocs,
  getFirestore,
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
  const [userAge, setAge] = useState<number>(0);
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
          localStorage.setItem("dob", JSON.stringify(data[0].dob));
        })
        AgeCal();
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
                // Set the "capital" field of the city 'DC'
                ok();
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
    history.push('/upload-voice')
  }
  if (user == undefined) return null;

  return (
    <IonPage>
      {user && (

        <IonContent fullscreen className="bg-app" id="bg">
          <IonRow>
            {readData.map((data) => (
              <>
                <IonCol key={data.UserID} size-sm="8" offset-sm="2" size-md="6" offset-md="3">
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
                        id="trigger-button"
                        className="chatBtn animated-btn"
                        // routerLink={`/chat/${data.UserID}`}
                        shape="round" disabled={undefined} strong={undefined} size={undefined} fill={undefined} mode={undefined} expand={undefined} onIonBlur={undefined} onIonFocus={undefined} type={undefined} routerAnimation={undefined} href={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined}                      >
                        Chat List &nbsp;
                        <IonIcon icon={chatboxEllipsesSharp} />&nbsp;
                      </IonButton>
                    </IonCardContent>
                  </IonCardHeader>


                  <IonCardContent>
                    <IonButton id="profile-Button"
                    routerLink="/edit-profile"
                    expand="block"
                    shape="round"
                    className="animated-btn" disabled={undefined} strong={undefined} color={undefined} size={undefined} fill={undefined} mode={undefined} onIonBlur={undefined} onIonFocus={undefined} type={undefined} routerAnimation={undefined} href={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined}                    >
                      <IonIcon className="button-icon" icon={pencilOutline} />&nbsp;
                      Edit Profile
                    </IonButton>
                    <IonButton id="profile-Button"
                    routerLink="/your-voice-list"
                    expand="block"
                    shape="round"
                    className="animated-btn" disabled={undefined} strong={undefined} color={undefined} size={undefined} fill={undefined} mode={undefined} onIonBlur={undefined} onIonFocus={undefined} type={undefined} routerAnimation={undefined} href={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined}                    >
                      <IonIcon className="button-icon" icon={playOutline} />&nbsp;
                      Your Voices
                    </IonButton>
                    <IonButton id="profile-Button"
                    onClick={() => setShowActionSheet(true)}
                    expand="block"
                    shape="round"
                    className="animated-btn" disabled={undefined} strong={undefined} color={undefined} size={undefined} fill={undefined} mode={undefined} onIonBlur={undefined} onIonFocus={undefined} type={undefined} routerAnimation={undefined} href={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined}                    >
                      <IonIcon className="button-icon" icon={arrowUpOutline} />&nbsp;
                      Upload New Voices
                    </IonButton>
                  </IonCardContent>
                </IonCol>
              </>
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
                className="animated-btn" disabled={undefined} strong={undefined} size={undefined} fill={undefined} mode={undefined} onIonBlur={undefined} onIonFocus={undefined} type={undefined} routerAnimation={undefined} href={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined}                >
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
              <IonButton onClick={() => setShowModal(false)} disabled={undefined} strong={undefined} color={undefined} size={undefined} fill={undefined} mode={undefined} expand={undefined} onIonBlur={undefined} onIonFocus={undefined} type={undefined} routerAnimation={undefined} href={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined} shape={undefined}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {listChat.map((data) => (
            <>
              <IonItem button routerLink={`/chat/${data.UserID}`} disabled={undefined} color={undefined} fill={undefined} mode={undefined} type={undefined} routerAnimation={undefined} href={undefined} rel={undefined} target={undefined} download={undefined} shape={undefined} lines={undefined} counter={undefined} detail={undefined} detailIcon={undefined}>
                <IonThumbnail slot="start">
                  <img src={data.photoUrl} />
                </IonThumbnail>
                <IonLabel>{data.name}</IonLabel>
              </IonItem>
            </>
          ))}
        </IonContent>

      </IonModal>

    </IonPage>
  );
};

export default React.memo(Profile);
