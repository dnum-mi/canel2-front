import React, { Component } from "react";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { getToken, storeTokens, getData } from '../../Api/Request';

class HeaderApp extends Component {
  state = {
    navigation: [
      {
        isActive: true,
        linkProps: {
          href: "#",
          target: "_self",
          onClick: () => this.handleNavigationClick(0),
        },
        text: "Applications",
      },
      {
        isActive: false,
        linkProps: {
          href: "#",
          target: "_self",
          onClick: () => this.handleNavigationClick(1),
        },
        text: "Acteurs",
      },
      {
        isActive: false,
        linkProps: {
          href: "#",
          target: "_self",
          onClick: () => this.handleNavigationClick(2),
        },
        text: "Migrations",
      },
      {
        isActive: false,
        linkProps: {
          href: "#",
          target: "_self",
          onClick: () => this.handleNavigationClick(3),
        },
        text: "Interfaces",
      },
      {
        isActive: false,
        linkProps: {
          href: "#",
          target: "_self",
          onClick: () => this.handleNavigationClick(4),
        },
        text: "Technologies",
      },
      {
        isActive: false,
        linkProps: {
          href: "#",
          target: "_self",
          onClick: () => this.handleNavigationClick(5),
        },
        text: "Conformites",
      },
      {
        isActive: false,
        linkProps: {
          href: "#",
          target: "_self",
          onClick: () => this.handleNavigationClick(6),
        },
        text: "Environnements",
      },
    ],
  };

  handleNavigationClick = (index) => {
    const navigation = this.state.navigation.map((item, i) => ({
      ...item,
      isActive: i === index,
    }));
    this.setState({ navigation });

    if (this.props.onNavigationClick) {
      this.props.onNavigationClick(index, navigation);
    }
  };

  handleLogout = () => {
    // Mettre à jour l'état pour déconnecter l'utilisateur
    this.props.handleLogout();

    // Rediriger l'utilisateur vers la page de connexion
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
          {
            iconId: "fr-icon-lock-line",
            linkProps: {
              href: "#",
            },
            text: "Se déconnecter",
            onClick: this.handleLogout()
          },
          
        ]}
        serviceTagline="Direction du Numérique"
        serviceTitle="Secrétariat Général"
      />
    );
  }
}

export default HeaderApp;
