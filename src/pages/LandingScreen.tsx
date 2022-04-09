import { IonContent, IonHeader, IonPage, IonButton } from '@ionic/react';
import './Home.css';

const LandingScreen: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
            <IonButton expand='block' fill='clear' slot='end'>Skip</IonButton>
        </IonHeader>
        <IonContent fullscreen>

        </IonContent>
    </IonPage>
  );
};

export default LandingScreen;