import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonPage,
  IonPopover,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {pencilOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";

const EditProfile: React.FC = () => {
  const [selected, setSelected] = useState<string>("Female");
  const [selectedDate, setSelectedDate] = useState('2012-12-15');

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    // bg-app is the class for the background
    <IonPage className="bg-app">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Edit Profile</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonRow>
          <IonCol size="12" className="ion-text-center edit-image-profile">
            <img
              src={"assets/images/shionne.jpg"}
              className="radius-pic-edit-profile"
              alt=""
            ></img>
            <div className="centered-title-edit">
              <IonIcon
                className="ion-margin-top"
                size="large"
                color="dark"
                icon={pencilOutline}
              ></IonIcon>
              <p style={{ color: "black" }}>Change</p>
            </div>
          </IonCol>
          <IonCol className="ion-text-center" size="12">
            <IonItem className="ion-margin ion-item-bg">
              <IonLabel position="floating" color="medium">
                Name
              </IonLabel>
              {/* lack ref on input */}
              <IonInput></IonInput>
            </IonItem>
          </IonCol>
          <IonCol className="ion-text-center" size="12">
            <IonRadioGroup
              value={selected}
              onIonChange={(e) => setSelected(e.detail.value)}
            >
              <IonListHeader>
                <IonLabel>Gender</IonLabel>
              </IonListHeader>
              <IonItem className="ion-item-bg inner-border-none">
                <IonLabel>Male</IonLabel>
                <IonRadio value="Male">Male</IonRadio>
              </IonItem>
              <IonItem className="ion-item-bg inner-border-none">
                <IonLabel>Female</IonLabel>
                <IonRadio value="Female"></IonRadio>
              </IonItem>
            </IonRadioGroup>
          </IonCol>
          <IonCol className="ion-text-center" size="12">
            <IonListHeader>
              <IonLabel>Date Of Birth</IonLabel>
            </IonListHeader>
            <IonItem>
            <IonDatetime value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-top">
          <IonCol class="ion-margin-top ion-text-center">
          <IonButton expand="full" shape="round">Save</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
