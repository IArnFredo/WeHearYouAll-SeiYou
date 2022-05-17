import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  ellipsisVerticalCircleOutline,
  homeOutline,
  searchOutline,
} from "ionicons/icons";
import { Route, Switch, withRouter } from "react-router";
import AnotherProfile from "../pages/AnotherProfile";
import EditProfile from "../pages/EditProfile";
import EditVoice from "../pages/EditVoice";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import SoundPlayer from "../pages/SoundPlayer";
import UploadVoice from "../pages/UploadVoice";
import YourVoiceList from "../pages/YourVoiceList";

const MenuTabs: React.FC = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/another-profile/:userID" component={AnotherProfile} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit-profile" exact>
            <EditProfile />
          </Route>
          <Route path="/upload-voice" exact={true} component={UploadVoice} />
          <Route path="/your-voice-list" exact={true} component={YourVoiceList} />
          <Route path="/edit-voice" exact={true} component={EditVoice} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/search">
            <IonIcon icon={searchOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/profile">
            <IonIcon icon={ellipsisVerticalCircleOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default MenuTabs;
