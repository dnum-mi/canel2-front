import React, { Component } from "react";
import { getData, postData } from '../../Api/Request';
import TableData from "../table/TableData";
import FormPost from "../FormPost/FormPost";
import Pagination from "../Pagination";
import { ACTEUR_INPUT_TYPES, ACTEUR_LABEL } from "../FormsModels/FormsModels";
import FormGet from "../FormGet/FormGet";


import './TableActeurs.css';

class TableActeurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'initial',
      data: [],
      itemsPerPage: 5,
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: 'true' });
    const { itemsPerPage, currentPage } = this.state;
    const offset = (currentPage - 1) * itemsPerPage;
    getData(`acteurs?offset=${offset}&limit=${itemsPerPage}`)
      .then(response => {
        const totalPages = Math.ceil(response.total / itemsPerPage);
        this.setState({ data: response.results, loading: 'false', totalPages, totalItems: response.total });
      })
      .catch(error => console.error(error));
  }

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage }, () => {
      this.fetchData();
    });
  };

  

  handleOpenModal = () => {
    const modal = document.getElementById('fr-modal-1');
    if (!modal.open) {
      modal.showModal();
    }
  }

  handleSave = () => {
    const form = document.getElementById('form-post');
    const formData = new FormData(form);
    const endpoint = 'acteurs';
    postData(endpoint, formData)
      .then(response => {
        console.log(response);
        this.fetchData();
      })
      .catch(error => console.error(error));
  }
  

  render() {
    if (this.state.loading === 'initial') {
      return <h2>Intializing...</h2>;
    }
    if (this.state.loading === 'true') {
      return <h2>Loading...</h2>;
    }
    const { data, currentPage, totalPages, totalItems, itemsPerPage } = this.state;
    return (
      <div className="table-acteurs-container">
      <TableData data={data} />
      <div className="button-container">
        <button onClick={this.handleOpenModal} className="fr-btn" data-fr-opened="false" aria-controls="fr-modal-1">
          Ajouter
        </button>
<FormPost onSave={this.handleSave} model={ACTEUR_INPUT_TYPES} label={ACTEUR_LABEL}/>          </div>
      <div className="button-container-get">
        <button onClick={this.handleOpenModalGet} className="fr-btn" data-fr-opened="false" aria-controls="fr-modal-1-get">
          Obtenir Infos
        </button>
        <FormGet onSave={this.handleSaveGet} parentStateHandler={this.parentStateHandler} />
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

export default TableActeurs;
