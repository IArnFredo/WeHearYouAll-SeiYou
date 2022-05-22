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
  IonIcon,
  useIonViewWillEnter,
  IonModal,
  IonHeader,
  IonThumbnail,
  IonTitle,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import "./Account.css";
import "../firebaseConfig";
import app from "../firebaseConfig";
import { Redirect, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { userContext } from "../provider/User";
import { query, collection, onSnapshot, getFirestore, doc, updateDoc } from "firebase/firestore";
import { arrowBackOutline } from "ionicons/icons";
const auth = getAuth(app);
const db = getFirestore();

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const user = useContext(userContext);

  // Sign in email pass
  const Email = useRef<HTMLIonInputElement>(null);
  const Password = useRef<HTMLIonInputElement>(null);
  const EmailForgot = useRef<HTMLIonInputElement>(null);
  const [loading, dismissLoading] = useIonLoading();
  const [presentToast, dismissToast] = useIonToast();
  const history = useHistory();

  const LoginWithEmail = () => {
    loading({
      message: 'Login...',
      spinner: "crescent",
      duration: 1000,
    })
    let email = Email.current?.value as string;
    let password = Password.current?.value as string;

    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (email?.toString().length === 0 || !email) {
      presentToast({
        message: "<b>Email!</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    } else if (result === !true) {
      presentToast({
        message: "Email not valid.",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (password?.toString().length === 0 || !password) {
      presentToast({
        message: "<b>Password!</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    // const hash = CryptoJS.SHA1(password).toString();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const signout = doc(db, "users", userCredential.user.uid);
        const ok = async () => {
          await updateDoc(signout, {
            isOnline: true,
          });
        }
        ok();
        // Signed in
        presentToast({
          message: "Login Successful",
          buttons: [{ text: 'hide', handler: () => dismissToast() }],
          duration: 400,
        })
      })
      .catch((error) => {
        const errorMessage = error.message;
        presentToast({
          message: "Email or Password is incorrect!",
          buttons: [{ text: 'hide', handler: () => dismissToast() }],
        })
      });
  };

  const LoginForgot = () => {
    let email = EmailForgot.current?.value as string;
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (email?.toString().length === 0 || !email) {
      presentToast({
        message: "<b>Email!</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    } else if (result === !true) {
      presentToast({
        message: "Email not valid.",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        presentToast({
          message: "Password reset email sent, please check your email",
          buttons: [{ text: 'hide', handler: () => dismissToast() }],
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        presentToast({
          message: "Email is not registered!",
          buttons: [{ text: 'hide', handler: () => dismissToast() }],
        })
      });
  }

  if (!user) return null;

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton routerLink={'/home'}>
            <IonIcon style={{ fontSize: '24px' }} icon={arrowBackOutline}></IonIcon>
          </IonButton>
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
                <br />
                <IonButton id="login-button2" expand="block" onClick={() => setShowModal(true)} fill="clear">
                  <p id="label-2">Forgot Password</p>
                </IonButton>
                <IonButton id="login-button3" expand="block" routerLink="/register" fill="clear">
                  <p id="label-2">Create New Account!</p>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      )}
      <IonModal isOpen={showModal} className="ion-content-account">
        <IonToolbar className="ion-notoolbar-playing">
          {/* <IonTitle>Forgot Password</IonTitle> */}
          <IonButtons onClick={() => setShowModal(false)} slot="start">
            <IonButton>
              <IonIcon size="large" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonContent className="ion-padding ion-text-center ion-content-account">
          <IonRow>
            <IonCol>
              <img src="../assets/icon/icon.png" alt="No Image" className='forgotPassword-img' />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonTitle className="ion-margin-bottom" id="label">Reset Password</IonTitle>
              <IonText color="medium">Enter your email address below to reset password</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  {" "}
                  <p id="label">Email</p>
                </IonLabel>
                <IonInput ref={EmailForgot} type="email"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                onClick={LoginForgot}
                id="login-button"
                shape="round"
              >
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default React.memo(Login);
