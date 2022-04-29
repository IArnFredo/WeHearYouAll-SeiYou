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
import { Route } from "react-router";
import AnotherProfile from "../pages/AnotherProfile";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

const MenuTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/@another-profile">
          <AnotherProfile />
        </Route>
        <Route exact path="/@search">
          <Search />
        </Route>
        <Route exact path="/@home">
          <Home />
        </Route>
        <Route exact path="/@profile">
          <Profile />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/@home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/@search">
          <IonIcon icon={searchOutline} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/@profile">
          <IonIcon icon={ellipsisVerticalCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MenuTabs;
