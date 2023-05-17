import React, { Component } from "react";
import { Header } from "@codegouvfr/react-dsfr/Header";

class HeaderApp extends Component {
  state = {
    navigation: [
    
    ],
  };

  handleLogout = () => {
    // Perform logout action (e.g. remove session information)
    // Redirect user to homepage
    window.location.replace("/");
  };

  render() {
    return (
      <Header
        brandTop={<>Ministère <br />de l'Intérieur <br />et des outre mer</>}
        homeLinkProps={{
          href: "/",
          title:
            "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
        }}
        navigation={this.state.navigation.map((item) => ({
          ...item,
          className: item.isActive ? "fr-link--active" : "",
        }))}
        quickAccessItems={[
        
        ]}
        serviceTagline="Direction du Numérique"
        serviceTitle="Secrétariat Général"
      />
    );
  }
}

export default HeaderApp;
