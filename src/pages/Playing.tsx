import { IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";
import React from "react";

const Playing: React.FC = () => {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/" />
      </IonButtons>
      <IonTitle>Now Playing</IonTitle>
    </IonToolbar>
  );
};

export default Playing;
