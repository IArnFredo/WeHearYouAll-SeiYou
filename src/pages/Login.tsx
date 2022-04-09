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
  } from '@ionic/react';
  import { personCircle } from 'ionicons/icons';
  import './Home.css';
  
  const Login: React.FC = () => {
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
            <IonRow>
                <IonCol>

                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonIcon
                        style={{ fontSize: "70px", color: "#0040ff" }}
                        icon={personCircle}
                    />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonTitle>Sign in to your Account</IonTitle>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Email</IonLabel>
                        <IonInput type="email"></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating"> Password</IonLabel>
                        <IonInput
                            type="password"
                            >
                        </IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                <IonButton expand="block">Sign In</IonButton>
                <p style={{ fontSize: "medium" }}>
                    Don't have an account? <a href="#">Sign up!</a>
                </p>
                </IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
    );
  };
  
  export default Login;
  