import {
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonPage,
  IonContent,
} from "@ionic/react";
import React from "react";
import "./Playing.css";

const Playing: React.FC = () => {
  return (
      <IonPage className="bg-app">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Now Playing</IonTitle>
        </IonToolbar>
        <IonContent className="ion-padding">
          <IonTitle>
            yey
          </IonTitle>
        </IonContent>
      </IonPage>
  );
};

export default Playing;
