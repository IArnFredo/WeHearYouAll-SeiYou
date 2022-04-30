import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
  IonItem,
  IonAvatar,
  IonText,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonButton
} from "@ionic/react";
import { settings, logoVimeo, playOutline } from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage className="bg-app-home">
      <IonContent className="home-content">
        <IonRow className="home-title">
          <IonLabel className="ion-margin"><b>Welcome!</b></IonLabel>
        </IonRow>
        <IonGrid>
          {/* Recently Upload */}
          <IonRow className="home-subtitle">
            <IonLabel className="ion-margin">Recently Upload</IonLabel>
          </IonRow>
          <IonList className="home-recently-list">
            <IonRow>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonList>
          {/* End Recently Upload */}
          
          {/* Most Popular */}
          <IonRow className="home-subtitle">
            <IonLabel className="ion-margin">Most Popular</IonLabel>
          </IonRow>
          <IonList className="home-recently-list">
            <IonRow>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem className="home-vList" button>
                  <IonAvatar className="avatar" slot="start">
                    <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                  </IonAvatar>
                  <div>
                    <p className="title-text"><b>Voice title</b></p>
                    <p className="title-text">Name</p>
                  </div>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonList>
          {/* End Most Popular */}
        </IonGrid>

        {/* Floating Play Button */}
        <IonFab className="float-btn" vertical="bottom" slot="fixed">
          <IonItem className="home-float-btn ion-margin-horizontal" button>
            <IonAvatar className="avatar" slot="start">
              <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
            </IonAvatar>
            <div>
              <p className="title-text"><b>Voice title</b></p>
              <p className="title-text">Name</p>
            </div>
            <IonButton
              slot="end"
              fill="clear"
              routerLink="/@your-voice-list"
              expand="block"
              shape="round"
            >
              <IonIcon className="button-icon" icon={playOutline} />
            </IonButton>
          </IonItem>
        </IonFab>        
        {/* End Floating Play Button */}
      </IonContent>

    </IonPage>
  );
};

export default Home;
