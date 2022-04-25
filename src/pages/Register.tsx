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
} from '@ionic/react';
import React from 'react';
import { arrowBack, backspace, logoGoogle, personCircle } from 'ionicons/icons';
import './Account.css';

const Register: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/@welcome" />
                    <IonText>Create new Account</IonText>
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen className="ion-padding ion-text-center ion-content-account">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton id="google-button" expand='full' shape="round">
                                <IonIcon className='ion-margin-end' icon={logoGoogle}></IonIcon>
                                <p>Continue with Google</p>
                            </IonButton>
                            <p>Or</p>
                            <p id="label">Account Information</p>
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
                            <IonItem>
                                <IonLabel position="floating"> <p id="label">Confirm Password</p></IonLabel>
                                <IonInput type="password">
                                </IonInput>
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
                                <IonLabel position="floating"> <p id="label">Name</p></IonLabel>
                                <IonInput id="input" type="text" placeholder="Name" ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonLabel position="fixed"> <p id="label">Gender</p></IonLabel>
                            <IonButton id="login-button" shape="round">Male</IonButton>
                            <IonButton id="login-button" shape="round">Female</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked"> <p id="label">Date of Birth</p></IonLabel>
                                <IonInput id="input" type="date"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton id="login-button" shape="round">Sign Up</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;
