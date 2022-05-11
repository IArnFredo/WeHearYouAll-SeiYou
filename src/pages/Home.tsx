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
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Home: React.FC = () => {
  return (
    <IonPage className="bg-app-home">
      <IonContent className="home-content">
        <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
                  <IonItem className="home-vList" button routerLink="/@playing">
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
          </IonCol>
        </IonRow>
        

        {/* Floating Play Button */}
        <IonFab className="float-btn" vertical="bottom" slot="fixed">
          <IonItem className="home-float-btn ion-margin-horizontal" button detail={false}>
          {/* routerLink="/@playing" */}
            {/* <IonAvatar className="avatar" slot="start">
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
            </IonButton> */}
              <AudioPlayer
                autoPlay={false}
                header="Your Voice"
                layout="horizontal"
                showDownloadProgress={false}
                showFilledProgress={false}
                showJumpControls={false}
                showFilledVolume={false}
                src="https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a"
                onPlay={e => console.log("onPlay")}
                className="audioPlayer"
              // other props here
              />
          </IonItem>
        </IonFab>        
        {/* End Floating Play Button */}
      </IonContent>

    </IonPage>
  );
};

export default Home;
