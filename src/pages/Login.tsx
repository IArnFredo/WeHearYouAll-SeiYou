import {
  IonContent,
  IonPage,
  IonToolbar,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonBackButton,
  IonButtons,
  IonText,
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  User,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc, getFirestore, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { add, logoGoogle } from "ionicons/icons";
import "./Account.css";
import "../firebaseConfig";
import app from "../firebaseConfig";
import { useHistory } from "react-router";
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // var uid = JSON.parse(localStorage.getItem("user") as string);
    // console.log(uid.uid);
    onAuthStateChanged(auth, (auser) => {
      if (auser) {
        setUser(auser);
        localStorage.setItem("user", JSON.stringify(auser));
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  // Sign in email pass

  const Email = useRef<HTMLIonInputElement>(null);
  const Password = useRef<HTMLIonInputElement>(null);

  const LoginWithEmail = () => {
    let email = Email.current?.value as string;
    let password = Password.current?.value as string;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <IonPage>
      <IonToolbar class="toolbar-transparent">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/@welcome" />
          <IonText>Sign In</IonText>
        </IonButtons>
      </IonToolbar>
      <IonContent
        fullscreen
        className="ion-padding ion-text-center ion-content-account"
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              {user ? (
                <IonContent>
                  <IonButton
                    onClick={signInWithGoogle}
                    id="google-button"
                    expand="full"
                    shape="round"
                  >
                    <IonIcon class="ion-margin-end" icon={logoGoogle} />
                    <IonLabel>Continue With Google</IonLabel>
                  </IonButton>
                  <p>{user.displayName}</p>
                  <IonAvatar>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        referrerPolicy="no-referrer"
                        alt="user"
                      />
                    ) : null}
                  </IonAvatar>
                  <IonButton
                    onClick={SignOut}
                    id="google-button"
                    expand="full"
                    shape="round"
                  >
                    <IonIcon class="ion-margin-end" icon={logoGoogle} />
                    <IonLabel>Sign Out</IonLabel>
                  </IonButton>
                </IonContent>
              ) : null}
              <IonButton
                onClick={signInWithGoogle}
                id="google-button"
                expand="full"
                shape="round"
              >
                <IonIcon class="ion-margin-end" icon={logoGoogle} />
                <IonLabel>Continue With Google</IonLabel>
              </IonButton>
              <p>or</p>
              <p id="label">Sign in to your Account</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  {" "}
                  <p id="label">Email</p>
                </IonLabel>
                <IonInput ref={Email} type="email"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  {" "}
                  <p id="label">Password</p>
                </IonLabel>
                <IonInput ref={Password} type="password"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                onClick={LoginWithEmail}
                id="login-button"
                shape="round"
              >
                Sign In
              </IonButton>
              <p id="label-2">Forgot Password?</p>
              <p id="label-2">Create New Account!</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
