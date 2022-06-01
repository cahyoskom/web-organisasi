import React, { Component } from "react";
import OrganisasiDataService from "../services/organisasi.service";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import dateFormat from 'dateformat';
import 'react-responsive-modal/styles.css';
import ReactDOM from 'react-dom';
import { Modal } from 'react-responsive-modal';



export default class organisasiList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNama = this.onChangeSearchNama.bind(this);
    this.retrieveOrganisasi = this.retrieveOrganisasi.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrganisasi = this.setActiveOrganisasi.bind(this);
    this.removeAllOrganisasi = this.removeAllOrganisasi.bind(this);
    this.deleteOrganisasi = this.deleteOrganisasi.bind(this);
    this.searchNama = this.searchNama.bind(this);

    this.state = {
      organisasi: [],
      currentOrganisasi: null,
      currentIndex: -1,
      searchNama: "",
      open: false
    };
  }

  componentDidMount() {
    this.retrieveOrganisasi();
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onChangeSearchNama(e) {
    const searchNama = e.target.value;

    this.setState({
      searchNama: searchNama
    });
  }

  retrieveOrganisasi() {
    OrganisasiDataService.getAll()
      .then(response => {
        this.setState({
          organisasi: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOrganisasi();
    this.setState({
      currentOrganisasi: null,
      currentIndex: -1
    });
  }

  setActiveOrganisasi(organisasi, index) {
    
    this.setState({
      currentOrganisasi: organisasi,
      currentIndex: index,
      open: true
    });
  }

  removeAllOrganisasi() {
    OrganisasiDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteOrganisasi() {    
    OrganisasiDataService.delete()
      .then(response => {
        console.log(response.data);
        this.props.history.push('/organisasi')
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNama() {
    OrganisasiDataService.findByNama(this.state.searchNama)
      .then(response => {
        this.setState({
          organisasi: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
 
    const { searchNama, organisasi, currentOrganisasi, currentIndex, open } = this.state;

    return (
      <div className="list row">
        <div className="col-12 bg-light mt-5">{" "}</div>
        <div className="col-8">{" "}</div>
        <div className="col-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Nama"
              value={searchNama}
              onChange={this.onChangeSearchNama}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNama}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12 ">
          <h4>LIST ORGANISASI</h4>       
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="w-25 p-3 text-center align-middle">Nama Organisasi</th>
                <th className="w-25 p-3 text-center align-middle">Alamat</th>
                <th className="w-25 p-3 text-center align-middle">Logo</th>
                <th className="w-25 p-3 text-center align-middle">Action</th>
              </tr>

            {organisasi &&
              organisasi.map((organisasi, index) => (
                
                <tr>
                    <td className="align-middle">{organisasi.nama}</td>
                    <td className="align-middle">{organisasi.alamat}</td>
                    <td className="text-center align-middle">
                            <img 
                              src={organisasi.logo} 
                              width="64px" 
                              height="64px" 
                            />
                        </td>         
                    <td align="center">
                        <button
                            onClick={() => this.setActiveOrganisasi(organisasi, index)}
                            key={index}
                            className="btn btn-primary mr-1 ml-1"
                            >
                              Detail
                          </button>
                        <Link
                          to={"/organisasi/" + organisasi.id}
                          className="btn btn-warning mr-1 ml-1"
                          >
                          Edit
                        </Link>
                        {/* <button
                            className="col-4 mr-1 ml-1 btn-md btn btn-danger"
                            onClick={() => this.deleteOrganisasi(organisasi.id)}
                            >
                              Delete 
                        </button> */}
                      </td>
                  </tr>
              ))}
            </thead>
          </table>
                    
            <div align="right">        
              <button
                className="col-3 btn-md btn btn-danger"
                onClick={this.removeAllOrganisasi}
              >
                Remove All Organisasi
              </button>
            </div>

              <div>
                    <Modal 
                      open={open} 
                      onClose={this.onCloseModal} 
                      center>
                      <div className="table-borderless">
                      {currentOrganisasi ? (
                              <div>
                                <h4 className="col-12 text-center align-middle">Detail Organisasi</h4>
                                <table>
                                  <th colspan="2" className="w-50 p-3 text-center align-middle">
                                    <img 
                                        src={currentOrganisasi.logo} 
                                      />
                                    </th>
                                  <tr>
                                    <td className="text-right align-middle w-50 p-1">
                                            <strong>Nama : &nbsp;</strong>
                                    </td>
                                    <td className="align-middle w-50 p-1 ">  
                                        {currentOrganisasi.nama}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-right align-middle w-50 p-1 ">
                                            <strong>Alamat : &nbsp;</strong>
                                    </td>
                                    <td className="align-middle w-50 p-1 ">  
                                        {currentOrganisasi.alamat}
                                    </td>
                                  </tr>
                                
                                  <tr>
                                    <td className="text-right align-middle w-50 p-1 ">
                                            <strong>Tempat Beriri : &nbsp;</strong>
                                    </td>
                                    <td className="align-middle w-50 p-1 ">  
                                        {currentOrganisasi.tempat_berdiri}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-right align-middle w-50 p-1 ">
                                            <strong>Tanggal Didirikan : &nbsp;</strong>
                                    </td>
                                    <td className="align-middle w-50 p-1 ">  
                                        {dateFormat(currentOrganisasi.tgl_berdiri,'dd-mm-yyyy')}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-right align-middle w-50 p-1 ">
                                            <strong>Jenis Perusahaan : &nbsp;</strong>
                                    </td>
                                    <td className="align-middle w-50 p-1 ">  
                                        {currentOrganisasi.jenis_organisasi}
                                    </td>
                                  </tr>
                                  
                                </table>
                              </div>
                      ): (<div></div>)}
                      </div>
                    </Modal>
              </div>

            <div>&nbsp;</div>
            
                                  

        </div>

        
       
        {/* <div>
          {currentOrganisasi ? (
            <div>
              <h4>Organisasi</h4>
              
              <div>
                <label>
                  <strong>Nama:</strong>
                </label>{" "}
                {organisasi.nama}
              </div>
              <div>
                <label>
                  <strong>Alamat:</strong>
                </label>{" "}
                {organisasi.alamat}
              </div>
              <div>
                <label>
                  <strong>Tempat Berdiri:</strong>
                </label>{" "}
                {organisasi.tempat_berdiri}
              </div>
              <div>
                <label>
                  <strong>Tanggal Berdiri:</strong>
                </label>{" "}
                {dateFormat(organisasi.tgl_berdiri,'dd-mm-yyyy')}
              </div>
              <div>
                <label>
                  <strong>Jenis:</strong>
                </label>{" "}
                {organisasi.jenis_organisasi}
              </div>
              <div>
                <label>
                  <strong>Logo:</strong>
                </label>{" "}
                {organisasi.logo}
              </div>

            </div>
          ) : (<div></div>)}
        </div> */}

        
      </div>
    ); 
  }
}

