import React from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonButton,
  IonGrid,
  IonIcon,
} from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import firebase from "../../database";
import { toast } from "../../helpers/toast";
import UserContext from "../../contexts/UserContext";
import { personCircleOutline, mailOutline } from "ionicons/icons";

const Profile = (props) => {
  const { user } = React.useContext(UserContext);

  async function handleLogoutUser() {
    try {
      await firebase.logout();
      props.history.push("/");
      toast("You have logged out sucessflly");
    } catch (err) {
      console.error("Logout Error", err);
      toast(err.message);
    }
  }
  return (
    <IonPage>
      <SmallHeader title="Profile" />
      <IonContent fullscreen>
        <LargeHeader title="Newsy" />
        {user ? (
          <>
            <IonCard>
              <IonCardContent>
                <IonList lines="none">
                  <IonItem>
                    <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.displayName}</strong>
                      <p>UserName</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.email}</strong>
                      <p>Email</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/edit-profile"}
                  color="primary"
                  fill="outline"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  onClick={handleLogoutUser}
                  color="primary"
                  fill="outline"
                >
                  Log Out
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/register"}
                  color="primary"
                >
                  Sign UP
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonButton expand="block" routerLink={"/login"} color="primary">
                  Log In
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};
export default Profile;
