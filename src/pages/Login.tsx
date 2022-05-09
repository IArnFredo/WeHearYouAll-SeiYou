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
  IonAvatar,
  IonRedirect,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  User,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./Account.css";
import "../firebaseConfig";
import app from "../firebaseConfig";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
const auth = getAuth(app);

const Login: React.FC = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();


  useEffect(() => {
    onAuthStateChanged(auth, (auser) => {
      if (auser) {
        setUser(auser);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  const loginFailed = () => {
    setToastMessage("Email or Password is incorrect!");
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
        return <Redirect to="/@profile" />;
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        loginFailed();
      });
  };

  return (
    <React.Fragment>
      {user ? (
        <Redirect to={"/@profile"} />
      ) : (
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
                  <Link className="link-to" to="/@forgot_password">
                    <p id="label-2">Forgot Password?</p>
                  </Link>
                  <Link className="link-to" to="/@register">
                    <p id="label-2">Create New Account!</p>
                  </Link>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => {
          setToastMessage("");
        }}
      />
    </React.Fragment>
  );
};

export default Login;
