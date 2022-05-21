import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { callOutline, videocamOutline, settingsOutline, sendOutline} from "ionicons/icons";
import React, { useState } from 'react';
import './Chatting.css';

const Chatting: React.FC = () => {

  const [text, setText] = useState<string>();

  return (
    <>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={callOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={videocamOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
          <div className='chatbox__title'>
            <div className='chatbox__title-avatar-container'>
              <img src={""}/>
              <span className={`chatbox__title-status ? 'chatbox__title-status--online' : 'chatbox__title-status--offline'}`}></span>
            </div>
            <span></span>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className='bg-app'>
        <div className="base-container">
          <div className="friend-text-div">
            <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' />
            <div className="friend-text-container">
              <div className="friend-text">Hellow</div>
            </div>
          </div>
          <div className="my-text-div">
            <div className="my-text-container">
              <div className="my-text">Holaa!</div>
              <div className="my-text">Testing</div>
            </div>
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonRow>
            <IonCol size="10">
              <IonInput value={text}> </IonInput>
            </IonCol>
            <IonCol size="2">
              <IonButton expand='block' fill="clear" color="primary" className="msg-button">
                <IonIcon icon={sendOutline} slot="icon-only"></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
    </>
  );
};

export default Chatting;
