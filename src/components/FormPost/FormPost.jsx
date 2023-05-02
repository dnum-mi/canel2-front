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

  render() {
    // const { nom_application, description, application_statut, date_mise_en_production, ministere_responsable, sensibilite } = this.state;
    // return (
    //   <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" className="fr-modal">
    //     <div className="fr-container fr-container--fluid fr-container-md">
    //       <div className="fr-grid-row fr-grid-row--center">
    //         <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
    //           <div className="fr-modal__body">
    //             <div className="fr-modal__header">
    //               <button className="fr-link--close fr-link" title="Fermer la fenêtre modale" aria-controls="fr-modal-1">Fermer</button>
    //             </div>
    //             <div className="fr-modal__content">
    //               <h1 id="fr-modal-title-modal-1" className="fr-modal__title">Ajouter une Application</h1>
    //               <form onSubmit={this.handleSubmit}>
    //                 <Input label="Nom" state="default" name="nom_application" value={nom_application} onChange={(e) => this.setState({ nom_application: e.target.value})} stateRelatedMessage="Text de validation / d'explication de l'erreur" />
    //                 <Input label="Description" state="default" name="description" value={description} onChange={(e) => this.setState({ description: e.target.value})}  stateRelatedMessage="Text de validation / d'explication de l'erreur" />
    //                 <select class="fr-select" value={this.state.application_statut} onChange={(e) => this.setState({ application_statut: e.target.value})}>
    //                   <option value="Décommissionnée">Décommissionnée</option>
    //                   <option value="En construction" selected>En construction</option>
    //                   <option value="En cours de retrait">En cours de retrait</option>
    //                   <option value="En production">En production</option>
    //                   <option value="Identifiée dans la trajectoire">Identifiée dans la trajectoire</option>
    //                   <option value="Mise en extinction">Mise en extinction</option>
    //                 </select>
    //                 <Input label="Date" state="default" name="date_mise_en_production" value={date_mise_en_production} onChange={(e) => this.setState({ date_mise_en_production: e.target.value})}  stateRelatedMessage="Text de validation / d'explication de l'erreur" />
    //                 <select class="fr-select" value={this.state.sensibilite} onChange={(e) => this.setState({ sensibilite: e.target.value})}>
    //                   <option value="S1" selected>S1</option>
    //                   <option value="S2">S2</option>
    //                   <option value="S3">S3</option>
    //                   <option value="S4">S4</option>
    //                 </select>
    //                 <select class="fr-select" value={this.state.ministere_responsable} onChange={(e) => this.setState({ ministere_responsable: e.target.value})}>
    //                   <option value="direction d'information legale et administrative">dir. d'information legale et administrative</option>
    //                   <option value="direction interministerielle numerique">dir interministerielle numerique</option>
    //                   <option value="mi - gendaremerie nationale">mi - gendaremerie nationale</option>
    //                   <option value="mi - préfecture de police">mi - préfecture de police</option>
    //                   <option value="ministère affaires sociaux">ministère affaires sociaux</option>
    //                   <option value="ministère de l'economie et des finances et de la souveraineté industrielle et numérique">min. de l'economie et des finances et de la souveraineté industrielle et numérique</option>
    //                   <option value="ministère de l'education nationale">min. de l'education nationale</option>
    //                   <option value="ministere de l'interieur" selected>min. de l'interieur</option>
    //                   <option value="ministère de la justice">min. de la justice</option>
    //                   <option value="ministère de la transition ecologique et de la cohesion des territoires">min. de la transition ecologique et de la cohesion des territoires</option>
    //                   <option value="ministère des affaires etrangères">min. des affaires etrangères</option>
    //                   <option value="ministère des armées">min. des armées</option>
    //                 </select>
    //                 <Button type="submit">Enregistrer</Button>
                    
    //               </form>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </dialog>
    // );
    return (
      <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" className="fr-modal">
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-link--close fr-link" title="Fermer la fenêtre modale" aria-controls="fr-modal-1">Fermer</button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-modal-title-modal-1" className="fr-modal__title">Ajouter une Application</h1>
                  <form onSubmit={(event) => this.handleSubmit(event, this.props.table)}>
                    { this.generateForm(this.props.model, this.props.label) }
                    <Button type="submit">Enregistrer</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    )
  }
}

export default FormPost;
