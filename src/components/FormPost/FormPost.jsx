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

  getSelectValues = async (routes) => {
    let data = {}
    for (let key in routes) {
      await getData(`${routes[key]}?limit=20`)
      .then(response => {
        console.log("PROMISE: ");
        data[String(key)] = response
      })
    }
    console.log("DATA: ", data)
    return data
  }

  generateForm = async (model, label) => {
    let selectValues = await this.getSelectValues(this.props.routes)
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
        console.log('multiselect')
      };
      if (model[key] == 'select') {
        // let optionsValues
        // if (typeof selectValues !== "undefined"){
        //   if (typeof selectValues[key] !== "undefined") {
        //     console.log("BEFORE MAP: ", selectValues[key])
        //     // optionsValues = (selectValues[key]).map(value => {
        //     //   console.log("VALUE: ", value);
        //     //   <option value={value}>{value}</option>
        //     // })
        //   } else {
        //     if (key == "ministere_responsable") {
        //       console.log("IN IF TEST")
        //       console.log(selectValues)
        //       console.log(JSON.parse(JSON.stringify(selectValues)))
        //       console.log(JSON.stringify(selectValues))
        //       console.log(Object.keys(selectValues))
        //       console.log('IN FOR:')
        //       for (let x in selectValues[key]) {
        //         console.log(x)
        //         console.log(selectValues[key][x])
        //       }
        //       console.log('END FOR')
        //     }
        //     optionsValues = <option>  </option>
        //   }

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
              <option value=""></option>
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
      if ((key == "acteurs" || key == "environnements") && typeof data[key] !== "object" ) {
        data[key] = [data[key]]
      }
    }
    data = JSON.stringify(data)
     postData(table+'s/', data)
      .then(response => {
        for (let key in this.state) {
          this.state[key] = ""
        }
        alert(response)
      })
      .catch(error => console.error(error));
    console.log('END HANDLE SUBMIT\n');
  }

  render() {
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
                  <h1 id="fr-modal-title-modal-1" className="fr-modal__title">Ajouter {this.props.table}</h1>
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
