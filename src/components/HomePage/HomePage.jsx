import React, { Component } from "react";
import "./HomePage.css";

class HomePage extends Component {
  handleStartClick = () => {
    this.props.onStartClick(0);
  };

  render() {
    return (
      <div className="homepage">
        <div className="content">
          <header className="header">
            <h1 className="title">Bienvenue sur CANEL</h1>
          </header>
          <p className="description">
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
          </p>
      
        </div>
      </div>
    );
  }
}

export default HomePage;
