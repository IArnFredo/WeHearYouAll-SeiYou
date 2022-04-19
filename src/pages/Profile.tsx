import { IonActionSheet, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonIcon, IonPage, IonRow } from '@ionic/react';
import { arrowUpOutline, caretForwardCircle, cloudUploadOutline, heart, logoInstagram, mic, pencilOutline, playOutline, share, trash } from 'ionicons/icons';
import React, { useState } from 'react';
import './Profile.css';

const Profile: React.FC = () => {
    
    const [showActionSheet, setShowActionSheet] = useState(false);
    return (
    <IonPage className='bg-app'>
        <IonContent fullscreen className='ion-padding' id='bg'>
            <IonRow>
                <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                    <img className='avatar-profile' src='./assets/images/shionne.jpg' />
                    <IonCardHeader class='text-profile'>
                        <IonCardTitle>Yudhistira Aremaputra Wardhana</IonCardTitle>
                                
                        <IonCardSubtitle>Male, 20</IonCardSubtitle>
                            
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton href='/@edit-profile' expand="block" shape="round"><IonIcon className='button-icon' icon={pencilOutline}/>Edit Profile</IonButton>
                        <IonButton href='/@your-voice-list' expand="block" shape="round"><IonIcon className='button-icon' icon={playOutline}/>Your Voices</IonButton>
                        <IonButton onClick={() => setShowActionSheet(true)} expand="block" shape="round"><IonIcon className='button-icon' icon={arrowUpOutline}/>Upload New Voices</IonButton>
                    </IonCardContent>
                </IonCol>
            </IonRow>     
        </IonContent>
        <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass='' header="Choose"
        buttons={[{
          text: 'Record Your Voice',
          icon: mic,
          data: 10,
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Upload Your Voice',
          icon: cloudUploadOutline,
          data: 'Data value',
          handler: () => {
            console.log('Play clicked');
          }
        }]}
      >
      </IonActionSheet>
    </IonPage>
    
    
  );
};

export default Profile;