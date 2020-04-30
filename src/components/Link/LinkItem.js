import React from "react";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonBadge,
  IonLabel,
  IonText,
  IonIcon,
} from "@ionic/react";
import {
  linkOutline,
  chevronBackCircleOutline,
  personCircleOutline,
  timeOutline,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
import { getHostName } from "../../helpers/domain";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const LinkItem = ({ link, index, showCount, url, browser }) => {
  return (
    <IonCard routerLink={url} onClick={browser} button>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <IonBadge
              style={{
                verticalAlign: "middle",
              }}
              slot="start"
            >
              {showCount && index}
            </IonBadge>
            <IonLabel>
              <p
                style={{
                  alignItems: "center",
                  fontSize: "0.8rem",
                  fontWeight: "normal",
                }}
              >
                <IonIcon
                  icon={linkOutline}
                  style={{ verticalAlign: "middle" }}
                />{" "}
                <IonText style={{ verticalAlign: "middle" }} />
                {getHostName(link.url)}
              </p>
              <div class="ion-padding-vertical ion-text-wrap">
                <strong style={{ fontSize: "1rem" }}>{link.description}</strong>
              </div>
              <p
                style={{
                  alignItems: "center",
                  fontSize: "0.8 rem",
                  fontWeight: "normal",
                }}
              >
                <IonIcon
                  icon={chevronBackCircleOutline}
                  style={{ verticalAlign: "middle" }}
                />{" "}
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {link.voteCount} points
                </IonText>
                {" | "}
                <IonIcon
                  icon={personCircleOutline}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                <IonText
                  style={{
                    alignItems: "middle",
                  }}
                >
                  {link.postedBy.name}
                </IonText>
                {" | "}
                <IonIcon
                  icon={timeOutline}
                  style={{
                    verticalAlign: "middle",
                  }}
                />{" "}
                <IonText
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  {formatDistanceToNow(link.created)}
                </IonText>
                {link.comments.lenght > 0 && (
                  <>
                    {" |"}
                    <IonIcon
                      Icon={chatbubbleEllipsesOutline}
                      style={{ verticalAlign: "middle" }}
                    />{" "}
                    <IonText
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {link.comments.lenght}
                    </IonText>
                  </>
                )}{" "}
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default LinkItem;
