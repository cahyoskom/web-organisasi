import React, { Component } from "react";
import OrganisasiDataService from "../services/organisasi.service";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from 'dateformat';
import FileBase64 from 'react-file-base64';
import ReactDOM from 'react-dom';

export default class Organisasi extends Component {
  constructor(props) {
    super(props);
    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangeAlamat = this.onChangeAlamat.bind(this);
    this.onChangeTempatBerdiri = this.onChangeTempatBerdiri.bind(this);
    this.onChangeTglBerdiri = this.onChangeTglBerdiri.bind(this);
    this.onChangeJenis = this.onChangeJenis.bind(this);
    this.onChangeLogo = this.onChangeLogo.bind(this);

    this.updateOrganisasi = this.updateOrganisasi.bind(this);
    this.deleteOrganisasi = this.deleteOrganisasi.bind(this);


    this.state = {
      currentOrganisasi: {
        id:null,
        nama: "",
        alamat: "",
        tempat_berdiri: "",
        tgl_berdiri: new Date(),
        startDate: new Date(),
        jenis: "",
        logo: "",
        files:[],
        
      },
      // message: "Pesan-Pesan Dari Saya"
    };
  }
  

  componentDidMount() {
    this.getOrganisasi(this.props.match.params.id);
  }

   // Callback~On change logo
   getFiles(files){
    this.setState(function(prevState) {
      return {
        currentOrganisasi: {
          ...prevState.currentOrganisasi,
          logo: files.base64
        }
      };
    });
  }
  

  onChangeNama(e) {
    const nama = e.target.value;
    
    this.setState(prevState => ({
      currentOrganisasi: {
        ...prevState.currentOrganisasi,
        nama: nama
      }
    }));
  }

  onChangeTempatBerdiri(e) {
    const tempat_berdiri = e.target.value;
    console.log("on change tempat" + e.target.value)
    this.setState(function(prevState) {
      return {
        currentOrganisasi: {
          ...prevState.currentOrganisasi,
          tempat_berdiri: tempat_berdiri
        }
      };
    });
  }

  handleChange = date => {
    const tgl_berdiri = date;
    this.setState({
      tgl_berdiri: tgl_berdiri
    });
    
    this.setState(function(prevState) {
      return {
        currentOrganisasi: {
          ...prevState.currentOrganisasi,
          tgl_berdiri: tgl_berdiri
        }
      };
    });
  };

  onChangeTglBerdiri(e) {
    const tgl_berdiri = e.target.value;
   
    this.setState(function(prevState) {
      return {
        currentOrganisasi: {
          ...prevState.currentOrganisasi,
          tgl_berdiri: tgl_berdiri
        }
      };
    });
  }

  onChangeAlamat(e) {
    const alamat = e.target.value;

    this.setState(function(prevState) {
      return {
        currentOrganisasi: {
          ...prevState.currentOrganisasi,
          alamat: alamat
        }
      };
    });
  }

  onChangeJenis(e) {
    const jenis_organisasi = e.target.value;

    this.setState(function(prevState) {
      return {
        currentOrganisasi: {
          ...prevState.currentOrganisasi,
          jenis_organisasi: jenis_organisasi
        }
      };
    });
  }

  onChangeLogo(e) {
    alert('logo changed')
    const logo = e.target.value;
    this.setState(function(prevState) {
      return {
        currentOrganisasi: {
          ...prevState.currentOrganisasi,
          logo: logo
        }
      };
    });
  }

  getOrganisasi(id) {
    OrganisasiDataService.get(id)
      .then(response => {
        this.setState({
          currentOrganisasi: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateOrganisasi() {
    OrganisasiDataService.update(
      this.state.currentOrganisasi.id,
      this.state.currentOrganisasi
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Organisasi was updated successfully!"
        });
        this.props.history.push('/organisasi')
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteOrganisasi() {    
    OrganisasiDataService.delete(this.state.currentOrganisasi.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/organisasi')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    // ...

    const { currentOrganisasi } = this.state;

    return (
      <div>
        {currentOrganisasi ? (
          <div className="edit-form">
            <div>&nbsp;</div><div>&nbsp;</div>
            <h4>Edit Data Organisasi</h4>
            <div>&nbsp;</div>
            <form>
              <div className="form-group row">
                <label className="col-5 col-form-label" htmlFor="nama">Nama:</label>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="nama"
                            value={currentOrganisasi.nama}
                            onChange={this.onChangeNama}
                        />
                    </div>          
              </div>
              <div className="form-group row">
                <label className="col-5 col-form-label" htmlFor="alamat">Alamat:</label>
                    <div className="col">
                        <textarea
                            type="text"
                            className="form-control"
                            id="alamat"
                            value={currentOrganisasi.alamat}
                            onChange={this.onChangeAlamat}
                        ></textarea>
                    </div>          
              </div>
              <div className="form-group row">
                <label className="col-5 col-form-label" htmlFor="tempat_berdiri">Tempat Berdiri:</label>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            id="tempat_berdiri"
                            value={currentOrganisasi.tempat_berdiri}
                            onChange={this.onChangeTempatBerdiri}
                        />
                    </div>          
              </div>
              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="tgl_berdiri">Tanggal Berdiri:</label>
                <div className="col">
                  <DatePicker
                    isClearable
                    selected={this.state.tgl_berdiri}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="tgl_berdiri"
                    name="tgl_berdiri"
                    value={dateFormat(currentOrganisasi.tgl_berdiri,"dd-mm-yyyy")}
                   
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="jenis">Jenis</label>
                <div className="col">
                <select 
                  type="text"
                  className="form-control"
                  id="jenis"
                  required
                  value={currentOrganisasi.jenis_organisasi}
                  onChange={this.onChangeJenis}
                  name="jenis"
                  >
                    <option value='PT'>PT</option>
		                <option value='CV'>CV</option>
		                <option value='LSM'>LSM</option>
		                <option value='ORMAS'>ORMAS</option>
		                <option value='PEMERINTAH'>PEMERINTAH</option>
	              </select>
                </div>
              </div>
              
              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="logo">Upload Logo</label>
                  <div className="col">
                      <FileBase64
                          multiple={ false }
                          onDone={ this.getFiles.bind(this) } />
                  </div>
              </div>

              
            </form>
            <div align="right">
            <button
              className="mr-3 ml-3 btn-md btn btn-danger"
              onClick={this.deleteOrganisasi}
            >
              Delete
            </button>

            <button
              type="submit"
              className=" ml-3 btn-md btn btn-success"
              onClick={this.updateOrganisasi}
            >
              Update
            </button>
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            
          </div>
        )}
      </div>
    );
  }
}    