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
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { add, logoGoogle } from "ionicons/icons";
import "./Account.css";
import "../firebaseConfig";
import app from "../firebaseConfig";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  useEffect(() => {
    // var uid = JSON.parse(localStorage.getItem("user") as string);
    // console.log(uid.uid);
    onAuthStateChanged(auth, (auser) => {
      if (auser) {
        getRedirectResult(auth)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result!)!;
          const token = credential.accessToken;
    
          // The signed-in user info.
          const user = result!.user;
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
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

  // Sign in email pass

  const Email = useRef<HTMLIonInputElement>(null);
  const Password = useRef<HTMLIonInputElement>(null);

  const LoginWithEmail = () => {
    let email = Email.current?.value as string;
    let password = Password.current?.value as string;
    const hash = CryptoJS.SHA1(password).toString();
    signInWithEmailAndPassword(auth, email, hash)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
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
              {/* {user ? (
                <IonContent>
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
              ) : null} */}
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
              <Link className="link-to" to="/@forgot_password"><p id="label-2">Forgot Password?</p></Link>
              <Link className="link-to" to="/@register"><p id="label-2">Create New Account!</p></Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
