import React, { Component } from "react";
import { getData, postData, updateData } from '../../Api/Request';
import TableData from "../table/TableData";
import { Button } from "@codegouvfr/react-dsfr/Button";
import FormPost from "../FormPost/FormPost";
import FormGet from "../FormGet/FormGet";
import FormUpdate from "../FormUpdate/FormUpdate";
import Pagination from "../Pagination";
import './TableApplications.css';
import { APPLICATION_INPUT_TYPES, APPLICATION_LABEL } from "../FormsModels/FormsModels";


class TableApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0,
      loading: 'initial'
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  /*
    Fetch default data and get offset and limit values
  */
  fetchData = () => {
    this.setState({ loading: 'true' });
    const { itemsPerPage, currentPage } = this.state;
    const offset = (currentPage - 1) * itemsPerPage;
    getData(`applications?offset=${offset}&limit=${itemsPerPage}`)
      .then(response => {
        let totalItems = response.length
        let filtered_data = response.map(this.filter_headers);
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        this.setState({
          data: filtered_data,
          loading: 'false',
          totalItems,
          totalPages,
        });   
      })
      .catch(error => console.error(error));
  };
  
  /*
    Pagination handler
  */
  paginate = (pageNumber) => {
    const startIndex = (pageNumber - 1) * this.state.itemsPerPage;
    const endIndex = startIndex + this.state.itemsPerPage;
    const displayedData = this.state.data.slice(startIndex, endIndex);
  
    this.setState({
      currentPage: pageNumber,
      displayedData: displayedData
    });
  }

  /*
    Handle pagination changes
  */
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.fetchData();
    });
  };

  /*
    Open Modal for POST form
  */
  handleOpenModalPost() {
    const modal = document.getElementById('fr-modal-1');
    modal.showModal();
  }

  /*
    Open modal for GET form
  */
  handleOpenModalGet() {
    const modal = document.getElementById('fr-modal-1-get');
    modal.showModal();
  }

  /*
    Submit POST form
  */
  handleSave() {
    const form = document.getElementById('form-post');
    const formData = new FormData(form);
    postData('applications', formData)
        .then(response => console.log(response))
        .catch(error => console.error(error));
  }

  /*
    Submit UPDATE form
  */
  handleUpdate() {
    const form = document.getElementById('form-update');
    const formData = new FormData(form);
    const id = formData.get('id');
    updateData(`app/<uuid:id>/update${id}`, formData)
        .then(response => console.log(response))
        .catch(error => console.error(error));
  }
  

  parentStateHandler = (newState) => {
    getData('applications?nom_application=App_Test')
      .then(response => {
              let filtered_data = response.results.map(this.filter_headers);
              console.log('Final response')
              console.log(response);
              this.setState({ data: filtered_data, loading: 'false' });
          }
      )
      .catch(error => console.error(error));
    //this.setState({ data: newState, loading: 'false' });
  }

  get_query_parameters = (data) => {
    const filtered_params = Object.keys(data)
        .filter(key => data[key]!='')
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
    let params = ''
    for (const [key, value] of Object.entries(filtered_params)) {
        params += key+'='+value+'&'
    }
    return (params.substr(0, params.length -1))
  }

  handleSaveGet() {
    const form = document.getElementById('form-get');
    const formData = new FormData(form);
    getData('applications?'+this.get_query_parameters(formData.entries()))
      .then(response => {
              let filtered_data = response.results.map(this.filter_headers);
              this.setState({ data: filtered_data, loading: 'false' });
        }
      )
      .catch(error => console.error(error));
  }

  filter_headers = (data) => {
    if (this.state.loading == false) {
        return {}
    }

    const selected_fields = [
        'nom_application',
        'description',
        'application_statut',
        'date_mise_en_production',
        'ministere_responsable',
        'sensibilite',
        'id'
    ];

    const filtered_headers = Object.keys(data)
        .filter(key => selected_fields.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});

    return filtered_headers;
  }

  render() {
    const { data, currentPage, totalPages, totalItems, itemsPerPage } = this.state;

    if (this.state.loading === 'initial') {
      return <h2>Intializing...</h2>;
    }
    if (this.state.loading === 'true') {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="table-acteurs-container">
        <TableData data={data} />
        <div className="button-container">
          <button onClick={this.handleOpenModalPost} className="fr-btn" data-fr-opened="false" aria-controls="fr-modal-1">
            Ajouter
          </button>
          <FormPost onSave={this.handleSave} model={APPLICATION_INPUT_TYPES} label={APPLICATION_LABEL}/>
        </div>
        <div className="button-container-get">
          <button onClick={this.handleOpenModalGet} className="fr-btn" data-fr-opened="false" aria-controls="fr-modal-1-get">
            Obtenir Infos
          </button>
          <FormGet onSave={this.handleSaveGet} parentStateHandler={this.parentStateHandler}/>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          handlePageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
  
export default TableApplications;