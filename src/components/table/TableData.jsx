import React, { Component } from 'react';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { getData, deleteData } from '../../Api/Request';
import FormUpdate from '../FormUpdate/FormUpdate';
import SidePanel from '../SidePanel/SidePanel';
import Modal from 'react-modal';
import { ReactComponent as EditIcon } from '../../img/ball-pen-line.svg';
import { ReactComponent as DeleteIcon } from '../../img/delete-bin-line.svg';
import { ReactComponent as ExportIcon } from '../../img/download-line.svg';
import { ENVIRONNEMENT_INPUT_TYPES, ENVIRONNEMENT_LABEL } from "../FormsModels/FormsModels";


import './TableData.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(255, 255, 255, 0.8)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

Modal.setAppElement('#root');

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      selectedItem: null,
      detailsModalIsOpen: false,
      updateModalIsOpen: false,
      currentElement: null,
    };

  }

  openModal = (id, item) => {
    this.setState({ selectedId: id, selectedItem: item, detailsModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({
      detailsModalIsOpen: false,
      updateModalIsOpen: false
    });
  };


  handleRowClick = (id, item) => {
    this.openModal(id, item);
  };

  handleDelete = (idValue, nameValue) => {
    if (window.confirm(`Voulez-vous supprimer l'élément nommé : "${nameValue}" ?`)) {
      deleteData(`acteurs/${idValue}`)
        .then(() => {
          getData('application')
            .then((response) => this.props.setData(response))
            .catch((error) => console.error(error));
        })
        .catch((error) =>
          alert(`Erreur : ${error.response.status} avec un message : ${error.message}`)
        );
    }
  };

  openUpdateModal = (element) => {
    this.setState({ updateModalIsOpen: true, currentElement: element });
  };

  renderTableHeader() {
    if (this.props.data && this.props.data[0]) {
      let header = Object.keys(this.props.data[0]);
      header.push('Modifier');
      header.push('Supprimer');
      const titles = header.map((key) => {
        return (
          <th key={key} className="table-header">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span>{key.split('_').join(' ').toUpperCase()}</span>
            </div>
          </th>
        );
      });

      return <tr>{titles}</tr>;
    }
  }

  renderTableData() {
    let elements = this.props.data;
    if (!elements || elements.length === 0) {
      return <></>;
    }
    let keys = Object.keys(elements[0]);
    let id_key = keys[0];
    let name_key = keys[1];

    return elements.map((item, index) => {
      let stringResponse;
      return (
        <tr key={index} onClick={() => this.handleRowClick(item[id_key], item)}>
          {keys.map((it) => {
            if (typeof item[it] === 'boolean' && item[it]) {
              stringResponse = 'Oui';
            } else if (String(item[it]).length > 20) {
              stringResponse = item[it].substr(0, 20) + '...';
            } else if (typeof item[it] === 'boolean' && !item[it]) {
              stringResponse = 'Non';
            } else if (item[it] && typeof item[it] !== 'boolean') {
              if (Array.isArray(item[it])) {
                stringResponse = item[it].length;
              } else {
                stringResponse = item[it];
              }
            } else {
              stringResponse = 'Non renseignée';
            }
            return (
              <td key={it} className="table-cell" style={{ textAlign: 'center' }}>
                {stringResponse}
              </td>
            );
          })}
          <td>
            {item[id_key] && (
              <div className="icon-cell">
                <EditIcon
                  className="edit-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    this.openUpdateModal(item);
                  }}
                />
              </div>
            )}
          </td>
          <td>
            {item[id_key] && (
              <div className="icon-cell">
                <DeleteIcon
                  className="delete-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    this.handleDelete(item[id_key], item[name_key]);
                  }}
                />
              </div>
            )}
          </td>
        </tr>
      );
    });
  }

  exportToCSV = () => {
    const { data } = this.props;
    const csvHeaders = Object.keys(data[0]);
    const csvRows = data.map((row) =>
      csvHeaders.map((fieldName) => JSON.stringify(row[fieldName])).join(',')
    );

    const csvString = [csvHeaders.join(','), ...csvRows].join('\r\n');
    const csvBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvBlob);
    link.style.display = 'none';
    link.download = 'table-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    return (
      <div className="fr-container fr-mt-4w fr-mb-6w">
        <div className="fr-table fr-table--layout-fixed">
          <table>
            <thead>{this.renderTableHeader()}</thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>

        {/* Modale pour l'affichage des détails */}
        <Modal
          isOpen={this.state.detailsModalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Détails de l'élément"
        >
          <SidePanel item={this.state.selectedItem} />
          <Button onClick={this.closeModal}>Fermer</Button>
        </Modal>

        {/* Modale pour la mise à jour */}
        <dialog
          aria-labelledby="fr-modal-title-modal-update"
          role="dialog"
          id="fr-modal-update"
          className="fr-modal"
          open={this.state.updateModalIsOpen}
        >
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-link--close fr-link" title="Fermer la fenêtre modale" aria-controls="fr-modal-1" onClick={this.closeModal}>Fermer</button>
                  </div>
                  <div className="fr-modal__content">
                    <FormUpdate
                      currentData={this.state.currentDataToEdit}
                      model={ENVIRONNEMENT_INPUT_TYPES}
                      label={ENVIRONNEMENT_LABEL}
                      table="environnements/"
                      closeUpdateModal={this.closeModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>

        <div
          style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={this.exportToCSV}
        >
          <ExportIcon />
          <span style={{ marginLeft: '5px' }}>Exporter au format CSV</span>
        </div>
      </div>
    );
  }
}

export default TableData;

