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
      nom_application: "",
      description: "",
      application_statut:"",
      date_mise_en_production:"",
      ministere_responsable:"",
      sensibilite:"",
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//   handleChange(event) {
//     const { name, value } = event.target;
//     const { description, values } = event.target;

//     console.log("name: ", name);
//     console.log("value: ", value);
//     console.log("description: ", description);
//     console.log("values: ", values);
//     this.setState({ [name]: value });
//     this.setState({ [description]: values });
//     console.log([name])
//   }

  handleSubmit(event, table) {
    event.preventDefault();
    const { nom_application, description, application_statut, date_mise_en_production, ministere_responsable, sensibilite } = this.state;
    const data = { nom_application, description, application_statut, date_mise_en_production, ministere_responsable, sensibilite };
     postData(table, data)
      .then(response => console.log(response))
       .catch(error => console.error(error));
     this.setState({ 
        nom_application: "",
        description: "",
        application_statut:"",
        date_mise_en_production:"",
        ministere_responsable:"",
        sensibilite:""
    });
    console.log(data)
  }

  handleToggle = ({ target }) => {
    this.setState(s => ({ ...s, [target.name]: !s[target.name] }));
  };

  getEnum = ({ target }) => {

  };

  generateForm = (model, label) => {
    const items = [];
    console.log('In generate')
    console.log(model)
    console.log(label)
    for (let key in model) {
      if (model[key] === 'checkbox') {
        items.push(
          <RadioButtons 
            legend={label[key]}
            options={[
                {
                    label: "Non",
                    nativeInputProps: {
                        value : 0
                    }
                },
                {
                    label: "Oui",
                    nativeInputProps: {
                        value : 1
                    }
                }
            ]}
            orientation="horizontal"
        />
        )
      };
      if (model[key] == 'date') {
        items.push(
          <Input
          label={label[key]}
          key={key}
          nativeInputProps={{
            type: 'date'
          }}
          />
        )
      };
      if (model[key] == 'multiselect') {
        console.log('multiselect')
      };
      if (model[key] == 'select') {
        items.push(
          <Select
            key={key}
            label={label[key]}
            className='toto'
            nativeSelectProps={{
              
            }}
          >
            <option>Value</option>
          </Select>
        )
      };
      if (model[key] == 'text') {
        items.push(<Input
            label={label[key]}
            key={key}
            name={key}
          />)
      };
      if (model[key] == 'uuid') {
        items.push(<Input
          label={label[key]}
          key={key}
          name={key}
        />)
      };
    }
    console.log(items)
    return items;
  //   return (
  //     <Input label="Nom" state="default" name="nom_application" value="toto" onChange={(e) => this.setState({ nom_application: e.target.value})} stateRelatedMessage="Text de validation / d'explication de l'erreur" />
  //   )
  }


  render() {
    return (
      <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" className="fr-modal">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div>
            <div className="fr-modal__content">
              <h1 id="fr-modal-title-modal-1" className="fr-modal__title">Ajouter une Application</h1>
                <form onSubmit={(event) => this.handleSubmit(event, this.props.table)}>
                  { this.generateForm(this.props.model, this.props.label) }
                  <Button type="submit">Enregistrer</Button>
                </form>
            </div>
          </div>
        </div>
      </dialog>
      )
    }
  }
export default FormPost;
