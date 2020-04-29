import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import UserContext from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import firebase from "../../database";
import validateCreateLink from "../../validators/validateCreateLink";
const INITIAL_STATE = {
  description: "",
  url: "",
};

const Submit = (props) => {
  const { user } = React.useContext(UserContext);
  const { handleSubmit, values, handleChange } = useForm(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        posteBy: {
          id: user.uid,
          name: user.displayName,
        },
        voteContent: 1,
        votes: [],
        comments: [],
        created: Date.now(),
      };

      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
  }
  return (
    <IonPage>
      <SmallHeader title="Submit" />
      <IonContent fullscreen>
        <LargeHeader title="Submit" />
        <IonItem lines="full">
          <IonLabel position="floating"> Description </IonLabel>
          <IonInput
            name="description"
            value={values.description}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating"> Url </IonLabel>
          <IonInput
            name="url"
            value={values.url}
            type="url"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
export default Submit;
