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
} from '@ionic/react';
import React from 'react';
import './Account.css';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/@welcome" />
                    <IonText>Sign In</IonText>
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
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
