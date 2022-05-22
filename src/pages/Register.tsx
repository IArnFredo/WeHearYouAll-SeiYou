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
  useIonAlert,
  IonSegment,
  IonSegmentButton,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Account.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { Redirect, useHistory } from "react-router";
import { userContext } from "../provider/User";

const auth = getAuth();
// const provider = new GoogleAuthProvider();

const Register: React.FC = () => {
  const db = getFirestore();
  const user = useContext(userContext);
  const [present] = useIonToast();
  const [loading, dismiss] = useIonLoading();
  const email = useRef<HTMLIonInputElement>(null);
  const password = useRef<HTMLIonInputElement>(null);
  const confirmPassword = useRef<HTMLIonInputElement>(null);
  const name = useRef<HTMLIonInputElement>(null);
  const dob = useRef<HTMLIonInputElement>(null);
  const [gender, setGender] = useState("Male");
  const history = useHistory();

  const signUp = async () => {
    const enteredName = name.current?.value as string;
    const enteredEmail = email.current?.value as string;
    const pass = password.current?.value as string;
    const cPass = confirmPassword.current?.value as string;
    const date = dob.current?.value;
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(enteredEmail);
    if (enteredEmail?.toString().length === 0 || !enteredEmail) {
      present({
        message: "<b>Email!</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    } else if (result === !true) {
      present({
        message: "Email not valid.",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (pass?.toString().length === 0 || !pass) {
      present({
        message: "<b>Password!</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (cPass?.toString().length === 0 || !cPass) {
      present({
        message: "<b>Confirm Password!</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (pass.length < 6 || pass.length > 16) {
      present({
        message: "Password must have 6 - 16 characters.",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (pass !== cPass) {
      present({
        message: "The password and confirmation password do not match.",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (enteredName?.toString().length === 0 || !enteredName) {
      present({
        message: "<b>Name</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (date?.toString().length === 0 || !date) {
      present({
        message: "Please input your <b>Birth Date</b>!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }

    const hash = CryptoJS.SHA1(pass).toString();
    loading({
      message: 'Creating New User...',
      spinner: "crescent", 
      duration:2000,
    })  
    createUserWithEmailAndPassword(auth, enteredEmail, hash)
      .then((userCredential) => {
        const user = userCredential.user;
        // Signed in
        const pathReference =
          "https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/images%2Fdefault_picture.jpg?alt=media&token=9a22a104-60bb-4d72-b8a4-96fad2251f62" as string;
        updateProfile(auth.currentUser!, {
          displayName: enteredName, photoURL: pathReference,
        }).then(() => {
          console.log(auth.currentUser!);
        }).catch((error) => {
          console.error("Error updating profile: ", error);
        });
        addData(pathReference, user.uid);

        dismiss();
        present({
          // auto login
          message: "Registration Successful!, you account has been auto logged in.",
          header: "Success, Welcome!",
          buttons: [{
            text: "OK", handler: () => {
              history.push("/profile");
            },
          }],
        });
        // sendEmailVerification(auth.currentUser!).then(() => {
        //   present({
        //     message: "Verify your email to finish signing up for SeiYou!",
        //     header: "Please Check Your Email",
        //     buttons: [{
        //       text: "OK", handler: () => {
        //         history.push("/profile");
        //       },
        //     }],
        //   });
        // });
      })
      .catch((error) => {
        dismiss();
        const errorCode = error.code;
        const errorMessage = error.message;
        present({
          message: "This email is already registered!",
          header: "Warning",
          buttons: [{
            text: "OK", handler: () => {
              return
            },
          }],
        });
      });

    const addData = async (pathReference: string, userId: string) => {
      try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
          UserID: userId!,
          email: email.current!.value,
          name: name.current!.value,
          dob: dob.current!.value,
          gender: gender,
          photoUrl: pathReference,
          isOnline: true,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
  };

  return (
    <IonPage>
      <IonToolbar className="register-toolbar">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/welcome" />
          <IonText>Create new Account</IonText>
        </IonButtons>
      </IonToolbar>
      <IonContent
        fullscreen
        className="ion-padding ion-text-center ion-content-account"
      >
        <IonGrid>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonRow>
                <IonCol>
                  <p id="label">Account Information</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">
                      {" "}
                      <p id="label">Email</p>
                    </IonLabel>
                    <IonInput ref={email} type="email"></IonInput>
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
                    <IonInput ref={password} type="password"></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">
                      {" "}
                      <p id="label">Confirm Password</p>
                    </IonLabel>
                    <IonInput ref={confirmPassword} type="password"></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <p id="label">Personal Information</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">
                      {" "}
                      <p id="label">Name</p>
                    </IonLabel>
                    <IonInput
                      ref={name}
                      id="input"
                      type="text"
                      placeholder="Name"
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  {/* <IonRadioGroup
                value={gender}
                onIonChange={(e) => setGender(e.detail.value)}
              >
                <IonLabel position="fixed">
                  {" "}
                  <p id="label">Gender</p>
                </IonLabel>
                <IonItem className="ion-item-bg inner-border-none">
                  <IonLabel>Male</IonLabel>
                  <IonRadio value="Male">Male</IonRadio>
                </IonItem>
                <IonItem className="ion-item-bg inner-border-none">
                  <IonLabel>Female</IonLabel>
                  <IonRadio value="Female"></IonRadio>
                </IonItem>
              </IonRadioGroup> */}
                  <IonLabel position="stacked">
                    {" "}
                    <p id="label">Gender</p>
                  </IonLabel>
                  <IonSegment
                    onIonChange={(e) => setGender(e.detail.value!)}
                    value={gender}
                    className="segment"
                  >
                    {""}
                    <IonSegmentButton class="segment-btn" value="Male">
                      <IonLabel>Male</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton class="segment-btn" value="Female">
                      <IonLabel>Female</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">
                      {" "}
                      <p id="label">Date of Birth</p>
                    </IonLabel>
                    <IonInput ref={dob} id="input" type="date"></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton onClick={signUp} id="login-button" shape="round">
                    Sign Up
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Register);
