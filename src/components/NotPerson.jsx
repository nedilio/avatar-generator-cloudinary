import React from "react";

const NotPerson = ({ notPerson = "unknown entity" }) => {
  const vocals = ["a", "e", "i", "o", "u"];
  const firstLetter = notPerson.split("")[0];

  const prefix = vocals.includes(firstLetter) ? "an" : "a";

  return (
    <div className="p-2 mt-2 bg-purple-600 font-bold text-slate-100 rounded-md">
      ❌ Oh ****!! you are {prefix} {notPerson.replace("-", " ")}!
    </div>
  );
};

export default NotPerson;
