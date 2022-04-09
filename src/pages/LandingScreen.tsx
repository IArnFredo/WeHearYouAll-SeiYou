import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonLabel, IonText } from '@ionic/react';
import './LandingScreen.css';

const LandingScreen: React.FC = () => {
  return (
    <IonPage>
      <IonContent className='landingContent' fullscreen>
        <div>
          <IonButton className='skipButton' routerLink={'/'} fill='clear' color='light'>Skip</IonButton>
          <img src="../assets/images/landing.png" alt="" className='landingImg' />
        </div>
        <IonGrid className='ion-text-center ion-margin-top'>
          <IonLabel className='text1'>Welcome to SeiYou</IonLabel><br />
          <IonLabel className='text2'>Start your voice act here, it's free!</IonLabel>
          <IonRow className='ion-margin-top ion-justify-content-center'>
            <IonButton fill='clear' shape='round' color='dark' routerLink={'/@register'}>Sign Up</IonButton>
            <IonButton shape='round' routerLink={'/@login'}>Sign In</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LandingScreen;