import {
    IonApp,
    IonButton,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";

const Register: React.FC = () => {
    return(
        <IonApp>
            <IonHeader>
                <IonButtons slot="start">
                    <IonBackButton />
                </IonButtons>
                <IonTitle>Create New Account</IonTitle>
            </IonHeader>
            <IonContent>
                <IonTitle>Account Information</IonTitle>
                {/* <IonItem>
                    <IonLabel position="floating">Floating Label</IonLabel>
                    <IonInput value={text}></IonInput>
                </IonItem> */}
            </IonContent>
        </IonApp>
    );
};

export default Register;