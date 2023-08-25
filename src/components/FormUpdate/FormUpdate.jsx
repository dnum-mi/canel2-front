import React, { Component } from 'react';
import { getData, postData } from '../../Api/Request';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';
import { Select } from '@codegouvfr/react-dsfr/Select';

class FormUpdate extends Component {
  constructor(props) {
    super(props);

    let myState = {};
    for (const key in this.props.model) {
      myState[key] = this.props.currentData && this.props.currentData[key] ? this.props.currentData[key] : "";
    }
    this.state = { ...myState, selectData: {} };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.routes) {
      this.getSelectValues(this.props.routes);
    }
  }

  async getSelectValues(routes) {
    try {
      let promises = [];
      for (let key in routes) {
        promises.push(getData(`${routes[key]}`).then(response => ({ key, data: response.results })));
      }
      let results = await Promise.all(promises);
      let selectData = {};
      results.forEach(result => {
        selectData[result.key] = result.data;
      });
      this.setState({ selectData });
    } catch (error) {
      console.error("Erreur lors de la récupération des données pour les éléments Select :", error);
    }
  }

  generateForm(model, label) {
    const items = [];
    for (let key in model) {
      const currentVal = this.state[key];
      switch (model[key]) {
        case 'checkbox':
          items.push(
            <RadioButtons
              legend={label[key]}
              value={currentVal}
              onChange={(e) => {
                this.setState({ [key]: e.target.value });
              }}
              options={[
                {
                  label: "Non",
                  nativeInputProps: {
                    value: 0
                  }
                },
                {
                  label: "Oui",
                  nativeInputProps: {
                    value: 1
                  }
                }
              ]}
              orientation="horizontal"
            />
          );
          break;
        case 'date':
          items.push(
            <Input
              label={label[key]}
              key={key}
              value={currentVal}
              onChange={(e) => {
                this.setState({ [key]: e.target.value });
              }}
              nativeInputProps={{
                type: 'date'
              }}
            />
          );
          break;
        case 'select':
          items.push(
            <Select
              key={key}
              label={label[key]}
              value={currentVal}
              onChange={(e) => {
                this.setState({ [key]: e.target.value });
              }}
            >
              {this.state.selectData && this.state.selectData[key] && this.state.selectData[key].map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </Select>
          );
          break;
        case 'text':
        case 'uuid':
          items.push(
            <Input
              label={label[key]}
              key={key}
              name={key}
              value={currentVal}
              onChange={(e) => {
                this.setState({ [key]: e.target.value });
              }}
            />
          );
          break;
        default:
          console.warn(`Type non reconnu pour le modèle: ${model[key]}`);
          break;
      }
    }
    return items;
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = { ...this.state };
    delete data.selectData;

    for (let key in data) {
      if (data[key] === "") {
        data[key] = null;
      }
      if (key === "acteurs" || key === "environnements") {
        data[key] = [data[key]];
      }
    }

    postData(this.props.table, JSON.stringify(data))
      .then(response => {
        console.log("Réponse après POST :", response);
      })
      .catch(error => {
        console.error("Erreur lors de l'envoi de données :", error);
      });
  }

  render() {

    return (
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-link--close fr-link" title="Fermer la fenêtre modale" aria-controls="fr-modal-1" onClick={this.props.closeUpdateModal}>Fermer</button>
                </div>
                <div className="fr-modal__content">
                  <p>Test: Est-ce que ce texte s'affiche ?</p>
                  <form onSubmit={this.handleSubmit}>
                    {this.generateForm(this.props.model, this.props.label)}
                    <Button type="submit">Mettre à jour</Button>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default FormUpdate;
