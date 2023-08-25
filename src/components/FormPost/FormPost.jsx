import React, { Component } from 'react';
import { getData, postData } from '../../Api/Request';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';
import { Select } from '@codegouvfr/react-dsfr/Select';

class FormPost extends Component {
  constructor(props) {
    super(props);
    let myState = {}
    for (const key in this.props.model) {
      myState[key] = ""
    };
    this.state = myState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSelectValues = (routes) => {
    let data = {}
    for (let key in routes) {
      getData(`${routes[key]}`)
      .then(response => {
        data[key] = response.results
      })
    }
    return data
  }

  generateForm = (model, label) => {
    let selectValues = this.getSelectValues(this.props.routes)
    const items = [];
    for (let key in model) {
      if (model[key] === 'checkbox') {
        items.push(
          <RadioButtons 
            legend={label[key]}
            onChange={(e) => {
              let newValue = {}
              newValue[key] = e.target.value
              this.setState(newValue);
            }}
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
          onChange={(e) => {
            let newValue = {}
            newValue[key] = e.target.value
            this.setState(newValue);
          }}
          nativeInputProps={{
            type: 'date'
          }}
          />
        )
      };
      if (model[key] == 'multiselect') {
      };
      if (model[key] == 'select') {
          items.push(
            <Select
              key={key}
              label={label[key]}
              className='toto'
              onChange={(e) => {
                let newValue = {}
                newValue[key] = e.target.value
                this.setState(newValue);
              }}
              nativeSelectProps={{
                
              }}
            >
              {/* { optionsValues } */}
            </Select>
          )
        // }
      };
      if (model[key] == 'text') {
        items.push(<Input
            label={label[key]}
            key={key}
            name={key}
            onChange={(e) => {
              let newValue = {}
              newValue[key] = e.target.value
              this.setState(newValue);
            }}
          />)
      };
      if (model[key] == 'uuid') {
        items.push(<Input
          label={label[key]}
          key={key}
          name={key}
          onChange={(e) => {
            let newValue = {}
            newValue[key] = e.target.value
            this.setState(newValue);
          }}
        />)
      };
    }
    return items;
  }

  handleSubmit(event, table) {
    event.preventDefault();
    let data = this.state
    for (let key in data) {
      if (data[key] == "") {
          data[key] = null
      }
      if (key == "acteurs" || key == "environnements") {
        data[key] = [data[key]]
      }
    }
    data = JSON.stringify(data)
     postData(table, data)
      .then(response => console.log(response))
       .catch(error => console.error(error));
  }

  render() {
    return (
<dialog aria-labelledby="fr-modal-title-modal-post" role="dialog" id="fr-modal-1" className="fr-modal">
          <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-link--close fr-link" title="Fermer la fenêtre modale" aria-controls="fr-modal-1">Fermer</button>
                </div>
                <div className="fr-modal__content">
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