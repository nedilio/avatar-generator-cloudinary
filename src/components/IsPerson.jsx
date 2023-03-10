import React from "react";
import NotPerson from "./NotPerson";
import Person from "./Person";

const IsPerson = ({ isPerson, tags }) => {
  return <div>{isPerson ? <Person /> : <NotPerson notPerson={tags[0]} />}</div>;
};

export default IsPerson;
