import { IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonRow } from '@ionic/react'
import React from 'react';
import './Profile.css';

const AnotherProfile = () => {
  return (
    <IonContent fullscreen className='ion-padding' id='bg'>
            <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                    <img className='avatar-profile' src='./assets/images/shionne.jpg' />
                        <IonCardHeader class='text-profile'>
                            <IonCardTitle>Yudhistira Aremaputra Wardhana</IonCardTitle>
                            
                            <IonCardSubtitle>Male, 20</IonCardSubtitle>
                            
                        </IonCardHeader>
                </IonCol>
            </IonRow>     
    </IonContent>
  )
}

export default AnotherProfile