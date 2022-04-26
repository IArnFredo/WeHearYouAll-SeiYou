import {
  IonContent,
  IonPage,
  IonTitle,
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
  getRedirectResult,
  signInWithRedirect,
  linkWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { logoGoogle } from "ionicons/icons";
import "./Account.css";
import { signInWithGoogle } from "../firebaseConfig";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  let hasLogin = "false";
  hasLogin = localStorage.getItem("hasLogin")!;

  let photoURL = "";
  photoURL = localStorage.getItem("photoURL")!;

  // const googleSign = () => {
  //     signInWithPopup(auth, provider)
  //     .then((result) => {
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         const credential = GoogleAuthProvider.credentialFromResult(result)!;
  //         const token = credential.accessToken;
  //         // The signed-in user info.
  //         const user = result.user;
  //         setLogin("login");
  //         // console.log(user);
  //         // ...
  //     }).catch((error) => {
  //         // Handle Errors here.
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // The email of the user's account used.
  //         const email = error.email;
  //         // The AuthCredential type that was used.
  //         const credential = GoogleAuthProvider.credentialFromError(error);
  //         // ...
  //     });

  // };

  // linkWithPopup(auth.currentUser, provider).then((result) => {
  //     // Accounts successfully linked.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const user = result.user;
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     // ...
  //   });

  // setInterval(() => {
  //     console.log(user);
  // },1000);

  const Email = useRef<HTMLIonInputElement>(null);
  // const [email, setEmail] = useState(initialCount);
  const Password = useRef<HTMLIonInputElement>(null);

  const auth = getAuth();
  const LoginWithEmail = () => {
    let email = Email.current?.value as string;
    let password = Password.current?.value as string;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("hasLogin", "true");
        localStorage.setItem("photoURL", user.photoURL!);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user);
    //     sendEmailVerification(auth.currentUser!).then(() => {
    //       console.log("email sent");
    //       // ...
    //     });
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //   });
  };

  return (
    <IonPage>
      <IonToolbar>
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
              {hasLogin == "true" && (
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
                  <p>{localStorage.getItem("name")}</p>
                  <IonAvatar>
                      <img src={localStorage.getItem("photoURL")!} alt="" />
                  </IonAvatar>
                </IonContent>
              )}
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
