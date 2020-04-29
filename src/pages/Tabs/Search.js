import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";

const Serach = () => {
  return (
    <IonPage>
      <SmallHeader title="Serach" />
      <IonContent fullscreen>
        <LargeHeader title="Newsy" />
      </IonContent>
    </IonPage>
  );
};
export default Serach;
