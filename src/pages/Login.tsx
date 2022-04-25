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
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult, signInWithRedirect, linkWithPopup } from "firebase/auth";
import { logoGoogle } from 'ionicons/icons';
import './Account.css';

const Login: React.FC = () => {
    const [login, setLogin] = useState("");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const googleSign = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)!;
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setLogin("login");
            // console.log(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

        // linkWithPopup(auth.currentUser, provider).then((result) => {
        //     // Accounts successfully linked.
        //     const credential = GoogleAuthProvider.credentialFromResult(result);
        //     const user = result.user;
        //     // ...
        //   }).catch((error) => {
        //     // Handle Errors here.
        //     // ...
        //   });
    };

    // setInterval(() => {
    //     console.log(user);
    // },1000);
    
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/@welcome" />
                    <IonText>Sign In</IonText>
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen className="ion-padding ion-text-center ion-content-account">
                <IonGrid>
                    <IonRow>
                        <IonCol>
{
    login === "login" &&(
        <IonButton onClick={googleSign} id="google-button" expand='full' shape="round">
        <IonIcon class="ion-margin-end" icon={logoGoogle}/>
        <IonLabel>Continue With Google</IonLabel>
    </IonButton>
    )
}
                        <IonButton onClick={googleSign} id="google-button" expand='full' shape="round">
                            <IonIcon class="ion-margin-end" icon={logoGoogle}/>
                            <IonLabel>Continue With Google</IonLabel>
                        </IonButton>
                            <p>Or</p>
                            <p id="label">Sign in to your Account</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> <p id="label">Email</p></IonLabel>
                                <IonInput type="email"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> <p id="label">Password</p></IonLabel>
                                <IonInput type="password">
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton id="login-button" shape="round">Sign In</IonButton>
                            <p id="label-2">
                                Forgot Password?
                            </p>
                            <p id="label-2">
                                Create New Account!
                            </p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
