import {
  IonToast,
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
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import "./Account.css";
import "../firebaseConfig";
import app from "../firebaseConfig";
import { Redirect, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { userContext } from "../provider/User";
import { query, collection, onSnapshot, getFirestore } from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore();

const Login: React.FC = () => {
  const [toastMessage, setToastMessage] = useState("");
  const user = useContext(userContext);
  const loginFailed = () => {
    setToastMessage("Email or Password is incorrect!");
  };
  const from  = useLocation().state;
  const history = useHistory();
  async function fetchData() {
    const q = query(
        collection(db, "sounds")
    );
    // const querySnapshot = await getDocs(q);
}
fetchData();
  // Sign in email pass
  const Email = useRef<HTMLIonInputElement>(null);
  const Password = useRef<HTMLIonInputElement>(null);
  const [loading, dismissLoading] = useIonLoading();
  const [presentToast, dismissToast] = useIonToast();

  const LoginWithEmail = () => {
    loading({
      message: 'Login...',
      spinner: "crescent",
    })
    let email = Email.current?.value as string;
    let password = Password.current?.value as string;
    const hash = CryptoJS.SHA1(password).toString();
    signInWithEmailAndPassword(auth, email, hash)
      .then((userCredential) => {
        // Signed in
        dismissLoading();
        presentToast({
          message: "Login Successful",
          buttons: [{ text: 'hide', handler: () => dismissToast() }],
          duration: 1000,
        })
        history.push("/home");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        loginFailed();
      });
  };
  
  if (!user) return null;

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref={ from == "/welcome" ? '/welcome' : '/home'} />
          <IonText>Sign In</IonText>
        </IonButtons>
      </IonToolbar>
      {user.loggedIn == true && (
        history.push("/home")
      )}

      {user.loggedIn == false && (
        <IonContent
          fullscreen
          className="ion-padding ion-text-center ion-content-account"
        >
          <IonGrid>
            <IonRow>
              <IonCol>
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
                <Link className="link-to" to="/forgot_password">
                  <p id="label-2">Forgot Password?</p>
                </Link>
                <Link className="link-to" to="/register">
                  <p id="label-2">Create New Account!</p>
                </Link>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      )}

      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => {
          setToastMessage("");
        }}
      />
    </IonPage>
  );
};

export default React.memo(Login);
