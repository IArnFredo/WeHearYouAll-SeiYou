import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert,
  IonGrid,
  IonBackButton,
  IonButtons,
  IonText,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  useIonAlert,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { arrowBack, backspace, logoGoogle, personCircle } from "ionicons/icons";
import "./Account.css";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const auth = getAuth();
const provider = new GoogleAuthProvider();
const Register: React.FC = () => {
  const db = getFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [present] = useIonAlert();
  const email = useRef<HTMLIonInputElement>(null);
  const password = useRef<HTMLIonInputElement>(null);
  const confirmPassword = useRef<HTMLIonInputElement>(null);
  const name = useRef<HTMLIonInputElement>(null);
  const dob = useRef<HTMLIonInputElement>(null);
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user") as string));
    console.log(user);
  }, []);
  console.log(gender);
  console.log(user);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        window.location.replace("/@register");
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

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email.current!.value,
        password: password.current!.value,
        name: name.current!.value,
        dob: dob.current!.value,
        gender: gender,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signUp = async () => {
    // console.log(dob.current?.value as string);
    const enteredName = name.current?.value as string;
    const enteredEmail = email.current?.value as string;
    const pass = password.current?.value as string;
    const cPass = confirmPassword.current?.value as string;
    const date = dob.current?.value;
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(enteredEmail);

    if (enteredName?.toString().length === 0 || !enteredName) {
      present({
        message: "<b>Name</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (enteredEmail?.toString().length === 0 || !enteredEmail) {
      present({
        message: "<b>Email!</b> field not entered!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    } else if (result == !true) {
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
    if (date?.toString().length === 0 || !date) {
      present({
        message: "Please input your <b>Birth Date</b>!",
        header: "Warning",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (pass.length < 6) {
      present({
        message: "Password must at least 6 characters.",
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
    addData();
  };

  //   const createUserEmail = () => {
  //     createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       const pathReference =
  //         "https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/default_picture.jpg?alt=media&token=2fc9fdb1-a8d6-409d-b64e-eb6c391e8259" as string;
  //       addData(pathReference, user.uid);
  //       sendEmailVerification(auth.currentUser!).then(() => {
  //         console.log("email sent");
  //         // ...
  //       });
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode);
  //       console.log(errorMessage);
  //     });
  //   }

  // const addData = async (pathReference: string, userID: string) => {
  //   try {
  //     // gender / tgl lahir belum
  //     const docRef = await addDoc(collection(db, "users"), {
  //       userId: userID,
  //       photoUrl: pathReference,
  //     });
  //     console.log("Document written with ID", docRef.id);
  //   } catch (err) {
  //     console.log("Error adding document : ", err);
  //   }
  // };
  return (
    <IonPage>
      <IonToolbar class="toolbar-transparent">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/@welcome" />
          <IonText>Create new Account</IonText>
        </IonButtons>
      </IonToolbar>
      <IonContent
        fullscreen
        className="ion-padding ion-text-center ion-content-account"
      >
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                id="google-button"
                onClick={signInWithGoogle}
                expand="full"
                shape="round"
              >
                <IonIcon className="ion-margin-end" icon={logoGoogle}></IonIcon>
                <p>Continue with Google</p>
              </IonButton>
              <p>Or</p>
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
