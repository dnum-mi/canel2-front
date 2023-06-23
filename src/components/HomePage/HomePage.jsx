import React, { Component } from "react";
// import HeaderApp from "../header/Header";
import "./HomePage.css";

class HomePage extends Component {
  handleStartClick = () => {
    this.props.onStartClick(0);
  };

  render() {
    return (
      <div className="homepage">
        {/* <HeaderApp onNavigationClick={this.props.onNavigationClick} /> */}
        <div className="content">
          <header className="header">
            <h1 className="title">Bienvenue sur CANEL</h1>
          </header>
          <p className="description">
            Cette application vous permet de gérer vos données de manière simple et efficace.
            Voici quelques-unes des fonctionnalités que vous trouverez :
          </p>
          <ul className="features-list">
            <li>TableApplications : Gestion des applications</li>
            <li>TableActeurs : Gestion des acteurs</li>
            <li>TableMigrations : Gestion des migrations</li>
            <li>TableInterfaces : Gestion des interfaces</li>
            <li>TableTechnologies : Gestion des technologies</li>
            <li>TableConformites : Gestion des conformités</li>
            <li>TableEnvironnements : Gestion des environnements</li>
          </ul>
          <p className="exploration-prompt">
            N'hésitez pas à explorer chaque section pour découvrir toutes les fonctionnalités disponibles.
          </p>
          <div className="section">
            <h2 className="section-title">TableApplications</h2>
            <p className="section-description">
              Cette table permet de gérer les informations sur les applications de votre organisation. Vous pouvez afficher les données, ajouter de nouvelles applications, mettre à jour les informations existantes et effectuer des recherches pour trouver des applications spécifiques.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">TableActeurs</h2>
            <p className="section-description">
              Cette table permet de gérer les informations sur les acteurs de votre organisation. Vous pouvez consulter les données, ajouter de nouveaux acteurs, mettre à jour les informations existantes et effectuer des recherches pour trouver des acteurs spécifiques.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">TableMigrations</h2>
            <p className="section-description">
              Cette table permet de gérer les informations sur les migrations de données. Vous pouvez visualiser les données, ajouter de nouvelles migrations, mettre à jour les informations existantes et effectuer des recherches pour trouver des migrations spécifiques.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">TableInterfaces</h2>
            <p className="section-description">
              Cette table permet de gérer les informations sur les interfaces de votre organisation. Vous pouvez consulter les données, ajouter de nouvelles interfaces, mettre à jour les informations existantes et effectuer des recherches pour trouver des interfaces spécifiques.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">TableTechnologies</h2>
            <p className="section-description">
              Cette table permet de gérer les informations sur les technologies utilisées dans votre organisation. Vous pouvez afficher les données, ajouter de nouvelles technologies, mettre à jour les informations existantes et effectuer des recherches pour trouver des technologies spécifiques.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">TableConformites</h2>
            <p className="section-description">
              Cette table permet de gérer les informations sur les conformités et les certifications. Vous pouvez visualiser les données, ajouter de nouvelles conformités, mettre à jour les informations existantes et effectuer des recherches pour trouver des conformités spécifiques.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">TableEnvironnements</h2>
            <p className="section-description">
              Cette table permet de gérer les informations sur les environnements de votre organisation. Vous pouvez consulter les données, ajouter de nouveaux environnements, mettre à jour les informations existantes et effectuer des recherches pour trouver des environnements spécifiques.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
