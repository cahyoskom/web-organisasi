import React, { Component } from "react";
import OrganisasiDataService from "../services/organisasi.service";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FileBase64 from 'react-file-base64';
import ReactDOM from 'react-dom';



export default class AddOrganisasi extends Component {

  constructor(props) {
    super(props);
    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangeAlamat = this.onChangeAlamat.bind(this);
    this.onChangeTempatBerdiri = this.onChangeTempatBerdiri.bind(this);
    this.onChangeTglBerdiri = this.onChangeTglBerdiri.bind(this);
    this.onChangeJenis = this.onChangeJenis.bind(this);
    this.onChangeLogo = this.onChangeLogo.bind(this);

    this.saveOrganisasi = this.saveOrganisasi.bind(this);
    this.newOrganisasi = this.newOrganisasi.bind(this);


    this.state = {
        nama: "",
        alamat: "",
        tempat_berdiri: "",
        tgl_berdiri: new Date(),
        jenis: "",
        logo:"",
        startDate: new Date(),
        files: [],

      submitted: false
    };
  }

  // Callback~
  getFiles(files){
    //this.setState({ logo: files[0].base64 }) multiple file
    this.setState({ logo: files.base64}) 
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/organisasi' />
    }
  }

  onChangeNama(e) {
    this.setState({
      nama: e.target.value
    });
  }

  onChangeTempatBerdiri(e) {
    this.setState({
      tempat_berdiri: e.target.value
    });
  }

  onChangeTglBerdiri(e) {
    this.setState({ 
      tgl_berdiri : e
    });
  }

  onChangeAlamat(e) {
    this.setState({
      alamat: e.target.value
    });
  }

  onChangeJenis(e) {
    this.setState({
      jenis: e.target.value
    });
  }

  onChangeLogo(e) {
    this.setState({
      logo: e.target.value
    });

  }

  saveOrganisasi() {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
          var data = {
            nama: this.state.nama,
            alamat: this.state.alamat,
            tempat_berdiri: this.state.tempat_berdiri,
            tgl_berdiri: this.state.startDate,
            jenis: this.state.jenis,
            logo: this.state.logo
          };
      
          OrganisasiDataService.create(data)
            .then(response => {
              this.setState({
                id: response.data.id,
                nama: response.data.nama,
                alamat: response.data.alamat,
                tempat_berdiri: response.data.tempat_berdiri,
                tgl_berdiri: response.data.tgl_berdiri,
                jenis: response.data.jenis,
                logo: response.data.logo,
      
                submitted: true
              });
              //this.props.history.push('/organisasi') // buat redirect
            })
            .catch(e => {
            });
          }
          
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });

  };

  newOrganisasi() {
    this.setState({
      id: null,
      nama: "",
      alamat: "",
      tempat_berdiri: "",
      tgl_berdiri: "",
      jenis_organisasi: "",
      logo: null,

      submitted: false
    });
  }

 

    render() {
    // ...
      return (
        
        <div className="submit-form">
          {this.state.submitted ? (
            <div align="center">
              <div>&nbsp;</div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success m-3" onClick={this.newOrganisasi}>
                Add
              </button>
                {this.renderRedirect()}
                <button className="btn btn-success m-3" onClick={this.setRedirect}>View Data</button>
            </div>
          ) : (
            <div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <h4 align="center">Create New Organisasi</h4>
              <div>&nbsp;</div>
              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="nama">Nama</label>
                <div className="col">
                  <input
                  type="text"
                  className="form-control"
                  id="nama"
                  required
                  value={this.state.nama}
                  onChange={this.onChangeNama}
                  name="nama"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="alamat">Alamat</label>
                <div className="col">
                  <textarea
                  type="text"
                  className="form-control"
                  id="alamat"
                  value={this.state.alamat}
                  onChange={this.onChangeAlamat}
                  name="alamat"
                  ></textarea>
                </div>
              </div>
              

              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="tempat_berdiri">Tempat Berdiri:</label>
                <div className="col">
                  <input
                  type="text"
                  className="form-control"
                  id="tempat_berdiri"
                  required
                  value={this.state.tempat_berdiri}
                  onChange={this.onChangeTempatBerdiri}
                  name="tempat_berdiri"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="tgl_berdiri">Tanggal Berdiri:</label>
                <div className="col">
                  <DatePicker
                    isClearable
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="tgl_berdiri"
                    name="tgl_berdiri"
                    onSelect={this.handleSelect} //when day is clicked
                    dateFormat="dd-MM-yyyy"
                    
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-5 col-form-label"  htmlFor="jenis">Jenis</label>
                <div className="col">
                <select 
                  selected="PT"
                  type="text"
                  className="form-control"
                  id="jenis"
                  required
                  value={this.state.jenis_organisasi}
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
                <div align="right">
                  <button onClick={this.saveOrganisasi}  className="col-3 btn btn-success">
                   Submit
                  </button>
                </div>
            </div>
          )}
        </div>
      );
    }
}

