import React, { Component } from 'react';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { postData } from '../../Api/Request';


class CreateAccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prenom: "",
      nom: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { prenom, nom, email, password } = this.state;
    const data = { prenom, nom, email, password };
    
    
    postData('register/', data)
      .then(response => console.log(response))
      .catch(error => console.error(error));

    this.setState({
      prenom: "",
      nom: "",
      email: "",
      password: "",
    });
  }

  render() {
    const { prenom, nom, email, password } = this.state;

    return (
      <dialog className="create-account-modal fr-modal" aria-labelledby="fr-modal-title-modal-1" id="fr-modal-1">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-link--close fr-link" title="Fermer la fenêtre modale" aria-controls="fr-modal-1-get">Fermer</button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-modal-title-modal-1" className="fr-modal__title">Créer un compte</h1>
                  <form className="create-account-form" onSubmit={this.handleSubmit} id="form-get">
                    <Input label="Prénom" state="default" name="prenom" value={prenom} onChange={(e) => this.setState({ prenom: e.target.value })} required />
                    <Input label="Nom" state="default" name="nom" value={nom} onChange={(e) => this.setState({ nom: e.target.value })} required />
                    <Input label="Email" state="default" type="email" name="email" value={email} onChange={(e) => this.setState({ email: e.target.value })} required />
                    <Input label="Mot de passe" state="default" type="password" name="password" value={password} onChange={(e) => this.setState({ password: e.target.value })} required />
                    <Button className="create-account-submit" type="submit">Créer</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
}

export default CreateAccountForm;
