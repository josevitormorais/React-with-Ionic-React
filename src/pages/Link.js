import React from "react";
import firebase from "../database";
import { Plugins } from "@capacitor/core";
import UserContext from "../contexts/UserContext";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import { closeCircleOutline } from "ionicons/icons";
import LinkItem from "../components/Link/LinkItem";

const { Browser } = Plugins;
const Link = (props) => {
  const { user } = React.useContext(UserContext);
  const [link, setLink] = React.useState(null);
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection("links").doc(linkId);

  React.useEffect(() => {
    getLink();
  }, [linkId]);

  function getLink() {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  function jandleAddVote() {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousVote = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = { ...previousVote, vote };
          const voteCount = updatedVotes.lenght;
          linkRef.update({ votes: updatedVotes, voteCount });
          setLink((prevState) => ({
            ...prevState,
            votes: updatedVotes,
            voteCount: voteCount,
          }));
        }
      });
    }
  }
  function handleDeleteLink() {
    linkRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${link.id} deleted`);
      })
      .catch((err) => {
        console.error("Error deleting document", err);
      });
    props.history.push("/");
  }

  function postedByAuthUser(link) {
    return user && user.uid === link.postedBy.id;
  }

  async function openBrowser() {
    await Browser.open({
      url: link.url,
    });
  }
  return (
    <IonPage>
      <NavHeader
        title={link && link.description}
        option={link && postedByAuthUser(link)}
        icon={closeCircleOutline}
        action={handleDeleteLink}
      />
      <IonContent>
        {link && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol class="ion-text-center">
                  <LinkItem link={link} browser={openBrowser} />
                  <IonButton
                    onClick={() => handlAddVote()}
                    size="small"
                  ></IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Link;
