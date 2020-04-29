import React from "react";
import firebase from "../../database";
import LinkItem from "./LinkItem";
const LinkList = (props) => {
  const [links, setLinks] = React.useState([]);
  const isTrending = props.location.pathname.includes("trending");

  React.useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTrending]);

  function getLinks() {
    if (isTrending) {
      return firebase.db
        .collection("links")
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapShot);
    }
    return firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapShot);
  }
  function handleSnapShot(snapshot) {
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
  }

  return (
    <>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          url={`/link/${link.id}`}
          index={index + 1}
        />
      ))}
    </>
  );
};
export default LinkList;
