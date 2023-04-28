import React, { Component } from "react";
import { getData } from '../../Api/Request';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            columns: ["NOM", "STATUS", "CREATEUR", "CODE OPERATION", "SENSIBILITER"]
        };
    }

    componentDidMount() {
        getData('applications')
            .then(response => this.setState({ data: response }))
            .catch(error => console.error(error));
    }

    render() {
        const { data, columns } = this.state;

        return (
            <React.Fragment>
                <div className='fr-container fr-mt-4w fr-mb-6w'>

                    <div className="fr-table fr-table--layout-fixed">
                        <table>
                            <caption>APPLICATIONS</caption>
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th key={column} scope="col">{column}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {data?.results?.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.nom_application}</td>
                                        <td>{item.application_statut}</td>
                                        <td>{item.createur}</td>
                                        <td>{item.code_operation}</td>
                                        <td>{item.sensibilite}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Table;
