import {
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonFooter,
  IonButton,
  IonRange,
} from "@ionic/react";
import {
  alertCircleOutline,
  playCircle,
  playCircleOutline,
  playCircleSharp,
  playSkipBack,
  playSkipBackOutline,
  playSkipForward,
  shareSocial,
} from "ionicons/icons";
import React from "react";
import "./Playing.css";

const Playing: React.FC = () => {
  let gender = "male";

  return (
    <IonPage className={gender === "female" ? "" : "playing-app"}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Now Playing</IonTitle>
      </IonToolbar>
      <IonContent className="ion-padding">
        <IonRow>
          <IonCol className="ion-text-center ion-margin-top">
            <img
              src={"assets/images/allphen.png"}
              className="radius-pic"
              alt=""
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="">
            <IonTitle>
              Owari Da <br />
              <span style={{ color: "grey", fontSize: "15px" }}>Alphen</span>
            </IonTitle>
          </IonCol>
          <IonCol className="ion-text-right ion-margin-top ion-margin-end">
            <IonIcon icon={alertCircleOutline} size="large"></IonIcon>
          </IonCol>
        </IonRow>
      </IonContent>
      <IonFooter style={{ position: "static" }}>
        <IonToolbar>
          <IonRow>
            <IonCol size="12" className="ion-text-justify">
              <IonRange
                max={100}
                color="dark"
                style={{ padding: "0px 14px" }}
              ></IonRange>
            </IonCol>
            <IonCol size="6">
              <IonText className="ion-margin-start">00:00</IonText>
            </IonCol>
            <IonCol className="ion-text-right" size="6">
              <IonText className="ion-margin-end">00:00</IonText>
            </IonCol>

            <IonCol className="ion-text-center" size="12">
              <IonButton fill="clear" color="dark">
                <IonIcon size="small" icon={shareSocial}></IonIcon>
              </IonButton>
              <IonButton fill="clear" color="dark">
                <IonIcon size="small" icon={playSkipBack}></IonIcon>
              </IonButton>
              <IonButton fill="clear" color="secondary">
                <IonIcon size="large" icon={playCircleSharp}></IonIcon>
              </IonButton>
              <IonButton fill="clear" color="dark">
                <IonIcon size="small" icon={playSkipForward}></IonIcon>
              </IonButton>
              <IonButton fill="clear" color="dark"></IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Playing;
