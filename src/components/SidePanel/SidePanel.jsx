import React from "react";

const SidePanel = ({ item }) => {
  if (!item) {
    return <div>Sélectionnez un élément pour afficher ses détails</div>;
  }

  return (
    <div>
      <h2>Détails de l'élément</h2>
      {Object.keys(item).map((key) => (
        <div key={key}>
          <strong>{key.split("_").join(" ").toUpperCase()} :</strong>{" "}
          {item[key]}
        </div>
      ))}
    </div>
  );
};

export default SidePanel;
