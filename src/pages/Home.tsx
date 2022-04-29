import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonToolbar class="toolbar-transparent">
        <IonTitle>Blank</IonTitle>
      </IonToolbar>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Home;
