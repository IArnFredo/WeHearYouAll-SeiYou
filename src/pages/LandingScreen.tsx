import { IonButton, IonContent, IonGrid, IonLabel, IonPage, IonRow } from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import { useUser } from '../provider/User';
import './LandingScreen.css';

const LandingScreen: React.FC = () => {
  const user = useUser();

  const changePage = () => {
    if (user.loggedIn == true) {
      return <Redirect to="/home" />;
    }
    else {
      return <Redirect to="/welcome" />;
    }
  };
  if (!user) return null;
  return (
    <IonPage>
      {user.loggedIn == false && (
        <IonContent className='landingContent' fullscreen>
          <div>
            <IonButton className='skipButton' routerLink={'/home'} fill='clear' color='light'>Skip</IonButton>
            <img src="../assets/images/landing.png" alt="" className='landingImg' />
          </div>
          <IonGrid className='ion-text-center ion-margin-top'>
            <IonLabel className='text1'>Welcome to SeiYou</IonLabel><br />
            <IonLabel className='text2'>Start your voice act here, it's free!</IonLabel>
            <IonRow className='ion-margin-top ion-justify-content-center'>
              <IonButton fill='clear' shape='round' color='dark' routerLink={'/register'}>Sign Up</IonButton>
              <IonButton shape='round' routerLink={'/login'}>Sign In</IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
      )}

      {user.loggedIn == true && (
          changePage()
      )}
      
    </IonPage>
  );
};

export default LandingScreen;