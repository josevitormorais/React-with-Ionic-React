import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonButton,
  IonRow,
  IonRouterLink,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import useForm from "../../hooks/useForm";
import { toast } from "../../helpers/toast";
import validateLogin from "../../validators/validateLogin";
import firebase from "../../database";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateLogin,
    auhtenticateUser
  );

  const [busy, setBusy] = React.useState(false);

  async function auhtenticateUser() {
    setBusy(true);
    const { email, password } = values;
    try {
      await firebase.login(email, password);
      toast("you have logged in succesfully!");
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      toast(err.message);
    }
    setBusy(false);
  }
  return (
    <IonPage>
      <NavHeader title="Log In" />
      <IonLoading message={"Please wait.."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            value={values.password}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Log In
            </IonButton>
          </IonCol>
        </IonItem>
        <IonRow>
          <IonCol class="ion-text-center ion-padding-vertical">
            <IonRouterLink routerLink={"/forgot"}>
              Forgot Password?
            </IonRouterLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
