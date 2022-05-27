import { getElement } from "@ionic/core/dist/types/stencil-public-runtime";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonActionSheet,
  IonItem,
} from "@ionic/react";
import {
  cloudUploadOutline,
  duplicateOutline,
  ellipsisVerticalCircleOutline,
  homeOutline,
  mic,
  personCircleOutline,
  searchOutline,
} from "ionicons/icons";
import { useContext, useState } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router";
import AnotherProfile from "../pages/AnotherProfile";
import Chatting from "../pages/Chatting";
import EditProfile from "../pages/EditProfile";
import EditVoice from "../pages/EditVoice";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import SoundPlayer from "../pages/SoundPlayer";
import UploadVoice from "../pages/UploadVoice";
import YourVoiceList from "../pages/YourVoiceList";
import { userContext } from "../provider/User";
import './MenuTabs.css';



const MenuTabs: React.FC = () => {
  const user = useContext(userContext);
  const history = useHistory();
  if (!user) return null;
  return (
    <>
      <IonTabs>
        <IonRouterOutlet ionPage>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route exact path="/another-profile/:userID" component={AnotherProfile} />
          <Route exact path="/chat/:userID" component={Chatting} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit-profile" exact>
            <EditProfile />
          </Route>
          <Route path="/upload-voice" exact={true} component={UploadVoice} />
          <Route path="/your-voice-list" exact={true} component={YourVoiceList} />
          <Route path="/edit-voice" exact={true} component={EditVoice} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" >
          <IonTabButton tab="tab1" href="/home">
            <IonIcon icon={homeOutline} />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/search">
            <IonIcon icon={searchOutline} />
          </IonTabButton>
          <IonTabButton tab="tab3" href={user.loggedIn == false ? '/login' : '/profile'}>
            {user.loggedIn == false ?
              <IonIcon icon={personCircleOutline} />
              : <div className="radius-pic-menu-tabs">
                <img className="radius-pic-menu" src={user.userData.photoURL} />
              </div>}

          </IonTabButton>
        </IonTabBar>
      </IonTabs>

    </>

  );
};

export default MenuTabs;
