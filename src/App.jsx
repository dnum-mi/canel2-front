import React, { Component } from "react";
import HeaderApp from "./components/header/Header";
import FooterApp from "./components/footer/Footer";
import TableApplications from "./components/tableApplications/TableApplications";
import TableActeurs from "./components/tableActeurs/TableActeurs";
import TableMigrations from "./components/tableMigrations/TableMigrations";
import TableInterfaces from "./components/TableInterfaces/TableInterfaces";
import TableTechnologies from "./components/TableTechnologies/TableTechnologies";
import TableConformites from "./components/TableConformites/TableConformites";
import TableEnvironnements from "./components/TableEnvironnements/TableEnvironnements";
import HomePage from "./components/HomePage/HomePage";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import FormGet from "./components/FormGet/FormGet";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "table",
      showTable: null,
      isConnected: false,
      isHome: false,
      showCreateAccountForm: false,
    };
  }

  componentDidMount() {
    const isConnected = localStorage.getItem("isConnected") === "true";
    this.setState({ isConnected });
  }

  handleTabClick = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  handleNavigationClick = (index) => {
    const TABLES = [
      <HomePage />,
      <TableApplications />,
      <TableActeurs />,
      <TableMigrations />,
      <TableInterfaces />,
      <TableTechnologies />,
      <TableConformites />,
      <TableEnvironnements />
    ];

    if (index >= 0 && index < TABLES.length) {
      this.setState({ showTable: TABLES[index] });
    } else {
      this.setState({ showTable: null });
    }
  };

  handleFormConnect = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    if (username === "test" && password === "test") {
      localStorage.setItem("isConnected", "true");
      this.setState({ isConnected: true, showTable: <HomePage /> });
    } else {
      alert("Identifiants incorrects !");
    }
  };

  handleLogout = () => {
    localStorage.setItem("isConnected", "false");
    this.setState({ isConnected: false });
  };

  handleCreateAccountClick = () => {
    this.setState({ showCreateAccountForm: true });
    console.log("toto")
  };
  
  handleCreateAccountClose = () => {
    this.setState({ showCreateAccountForm: false });
  };
  

  renderMainContent() {
    const { isConnected, showCreateAccountForm } = this.state;

    if (!isConnected) {
      return (
        <main className="fr-pt-md-14v" role="main" id="content">
        <div className="fr-container fr-container--fluid fr-mb-md-14v">
          <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-container fr-background-alt--grey fr-px-md-0 fr-py-10v fr-py-md-14v">
                <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                  <div className="fr-col-12 fr-col-md-9 fr-col-lg-8">
                    <div className="fr-mb-6v"></div>
                    <div>
                      <form id="login-1760" onSubmit={this.handleFormConnect}>
                        <fieldset className="fr-fieldset" id="login-1760-fieldset" aria-labelledby="login-1760-fieldset-legend login-1760-fieldset-messages">
                          <div className="fr-fieldset__element">
                            <fieldset className="fr-fieldset" id="credentials" aria-labelledby="credentials-messages">
                              <div className="fr-fieldset__element">
                                <div className="fr-input-group">
                                  <label className="fr-label" htmlFor="username-1757">
                                    Identifiant
                                    <span className="fr-hint-text">Format attendu : nom@domaine.fr</span>
                                  </label>
                                  <input className="fr-input" autoComplete="username" aria-required="true" aria-describedby="username-1757-messages" name="username" id="username-1757" type="text" />
                                  <div className="fr-messages-group" id="username-1757-messages" aria-live="assertive"></div>
                                </div>
                              </div>
                              <div className="fr-fieldset__element">
                                <div className="fr-password" id="password-1758">
                                  <label className="fr-password__checkbox fr-label" htmlFor="password-1758-show">
                                    Mot de passe
                                  </label>
                                  <div className="fr-input-wrap">
                                    <input className="fr-password__input fr-input" aria-describedby="password-1758-input-messages" aria-required="true" name="password" autoComplete="current-password" id="password-1758-input" type="password" />
                                  </div>
                                  <div className="fr-messages-group" id="password-1758-input-messages" aria-live="assertive"></div>
                                  <div className="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
                                    <input aria-label="Afficher le mot de passe" id="password-1758-show" type="checkbox" aria-describedby="password-1758-show-messages" />
                                    <label className="fr-password__checkbox fr-label" htmlFor="password-1758-show">
                                      Afficher
                                    </label>
                                    <div className="fr-messages-group" id="password-1758-show-messages" aria-live="assertive"></div>
                                  </div>
                                  <p>
                                    <a href="[À MODIFIER - url de la page de récupération]" className="fr-link">Mot de passe oublié ?</a>
                                  </p>
                                </div>
                              </div>
                              <div className="fr-messages-group" id="credentials-messages" aria-live="assertive"></div>
                            </fieldset>
                          </div>
                          <div className="fr-fieldset__element">
                            <div className="fr-checkbox-group fr-checkbox-group--sm">
                              <input name="remember" id="remember-1759" type="checkbox" aria-describedby="remember-1759-messages" />
                              <label className="fr-label" htmlFor="remember-1759">
                                Se souvenir de moi
                              </label>
                              <div className="fr-messages-group" id="remember-1759-messages" aria-live="assertive"></div>
                            </div>
                          </div>
                          <div className="fr-fieldset__element">
                            <ul className="fr-btns-group">
                              <li>
                                <button className="fr-mt-2v fr-btn" type="submit">
                                  Se connecter
                                </button>
                              </li>
                            </ul>
                            <br/>
                            <ul class="fr-btns-group">
                        
                            <button className="fr-btn fr-btn--secondary" data-fr-opened="false" aria-controls="fr-modal-1" onClick={this.handleCreateAccountClick} type="button" 
        >
          Créer un compte
        </button>
        <div className={showCreateAccountForm ? "create-account-form" : "create-account-form hidden"}>
          <CreateAccountForm onClose={this.handleCreateAccountClose} />
        </div>
                            
                          </ul>
                          </div>
                          <div className="fr-messages-group" id="login-1760-fieldset-messages" aria-live="assertive"></div>
                        </fieldset>
                      </form>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </main>
      );
    } else {
      return (
        <main className="fr-pt-md-14v" role="main" id="content">
          <HeaderApp onNavigationClick={this.handleNavigationClick} />
          {this.state.showTable}
        </main>
      );
    }
  }

render() {

  return (
    <>
      {this.renderMainContent()}
        <CreateAccountForm onClose={this.handleCreateAccountClose} />

      <FooterApp />
    </>
  );
}
}

export default App;
