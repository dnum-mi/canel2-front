import React, { Component } from 'react';
import { postData } from '../../Api/Request';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';
import { Select } from '@codegouvfr/react-dsfr/Select';

class FormPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nom_application: '',
      description: '',
      application_statut: '',
      date_mise_en_production: '',
      ministere_responsable: '',
      sensibilite: '',
    };
  }

  handleSubmit(event, table) {
    event.preventDefault();
    const {
      nom_application,
      description,
      application_statut,
      date_mise_en_production,
      ministere_responsable,
      sensibilite,
    } = this.state;
    const data = {
      nom_application,
      description,
      application_statut,
      date_mise_en_production,
      ministere_responsable,
      sensibilite,
    };
    postData(table, data)
      .then(response => console.log(response))
      .catch(error => console.error(error));
    this.setState({
      nom_application: '',
      description: '',
      application_statut: '',
      date_mise_en_production: '',
      ministere_responsable: '',
      sensibilite: '',
    });
    console.log(data);
  }

  handleToggle = ({ target }) => {
    this.setState(s => ({ ...s, [target.name]: !s[target.name] }));
  };

  generateForm = (model, label) => {
    const items = [];

    for (let key in model) {
      if (model[key] === 'checkbox') {
        items.push(
          <RadioButtons
            key={key} // Ajouter une prop key unique ici
            legend={label[key]}
            options={[
              {
                label: 'Non',
                nativeInputProps: {
                  value: 0,
                },
              },
              {
                label: 'Oui',
                nativeInputProps: {
                  value: 1,
                },
              },
            ]}
            orientation="horizontal"
          />
        );
      } else if (model[key] === 'date') {
        items.push(
          <Input
            key={key} // Ajouter une prop key unique ici
            label={label[key]}
            nativeInputProps={{
              type: 'date',
            }}
          />
        );
      } else if (model[key] === 'multiselect') {
        console.log('multiselect');
      } else if (model[key] === 'select') {
        items.push(
          <Select key={key} label={label[key]} className="toto" nativeSelectProps={{}}>
            <option>Value</option>
          </Select>
        );
      } else if (model[key] === 'text' || model[key] === 'uuid') {
        items.push(
          <Input
            key={key} // Ajouter une prop key unique ici
            label={label[key]}
            name={key}
            value={this.state[key]}
            onChange={(e) => this.setState({ [key]: e.target.value })}
          />
        );
      }
    }

    return items;
  };

  render() {
    return (
      <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" className="fr-modal">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div>
            <div className="fr-modal__content">
              <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                Ajouter une Application
              </h1>
              <form onSubmit={event => this.handleSubmit(event, this.props.table)}>
                {this.generateForm(this.props.model, this.props.label)}
                <Button type="submit">Enregistrer</Button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
}

export default FormPost;
