import React, { Component } from "react";
import { Footer } from "@codegouvfr/react-dsfr/Footer";

class FooterApp extends Component {
  render() {
    return (
      <Footer
        accessibility="fully compliant"
        brandTop={<>Ministère <br />de l'Intérieur <br />et des outre mer</>}
        contentDescription="
          Ce message est à remplacer par les informations de votre site.
    
          Comme exemple de contenu, vous pouvez indiquer les informations 
          suivantes : Le site officiel d’information administrative pour les entreprises.
          Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
          à la gestion et au développement de votre entreprise.
          "
        cookiesManagementLinkProps={{
          href: '#'
        }}
        homeLinkProps={{
          href: '/',
          title: 'Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)'
        }}
        personalDataLinkProps={{
          href: '#'
        }}
        termsLinkProps={{
          href: '#'
        }}
        websiteMapLinkProps={{
          href: '#'
        }}
      />
    );
  }
}

export default FooterApp;
