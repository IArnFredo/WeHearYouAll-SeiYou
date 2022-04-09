import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonIcon, IonRow } from '@ionic/react';
import { arrowUpOutline, logoInstagram, pencilOutline, playOutline } from 'ionicons/icons';
import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <IonContent fullscreen className='ion-padding' id='bg'>
            <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                    <img className='avatar-profile' src='./assets/images/shionne.jpg' />
                        <IonCardHeader class='text-profile'>
                            <IonCardTitle>Yudhistira Aremaputra Wardhana</IonCardTitle>
                            
                            <IonCardSubtitle>Male, 20</IonCardSubtitle>
                            
                        </IonCardHeader>
                        <IonCardContent>
                            <IonButton href='' expand="block"><IonIcon className='button-icon' icon={pencilOutline}/>Edit Profile</IonButton>
                            <IonButton href='' expand="block"><IonIcon className='button-icon' icon={playOutline}/>Your Voices</IonButton>
                            <IonButton href='' expand="block"><IonIcon className='button-icon' icon={arrowUpOutline}/>Upload New Voices</IonButton>
                        </IonCardContent>
                </IonCol>
            </IonRow>     
    </IonContent>
  );
};

export default Profile;