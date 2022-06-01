const db = require("../models");
const { response } = require("express");
const Organisasi = db.organisasi;
const Op = db.Sequelize.Op;

// Create and Save a new Organisasi
exports.create = (req, res)=>{
     // Validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

    // Create a organisasi
    const organisasi = {
      nama: req.body.nama,
      tempat_berdiri: req.body.tempat_berdiri,
      tgl_berdiri: req.body.tgl_berdiri,
      alamat: req.body.alamat,
      jenis_organisasi: req.body.jenis ,
      logo: req.body.logo
    };
    console.log(organisasi);
console.log(organisasi);
    // Save Organisasi in the database
    Organisasi.create(organisasi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organisasi."
      });
    });

};

// Retrieve all Organisasi from the database
exports.findAll = (req, res) => {
    const nama = req.query.nama;
    var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
  
    Organisasi.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving organisasi."
        });
      });
  };


  
// Find a single Organisasi with and id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Organisasi.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ORGANISASI with id=" + id
        });
      });
  };

// Update a Organisasi by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Organisasi.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Organisasi was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Organisasi with id=${id}. Maybe Organisasi was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Organisasi with id=" + id
        });
      });
  };

// Delete a Organisasi with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Organisasi.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Organisasi was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Organisasi with id=${id}. Maybe Organisasi was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Organisasi with id=" + id
        });
      });
  };

// Delete all Organisasi from the database.
exports.deleteAll = (req, res) => {
    Organisasi.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Organisasi were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all e-ktp."
        });
      });
  };

// Find all status jenis_organisasi Organisasi
exports.findAllPublished = (req, res) => {
    Organisasi.findAll({ where: { jenis_organisasi: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Organisasi."
        });
      });
  };

  // Find all Organisasi no Foto
exports.findNoCoverImage = (req, res) => {
  Organisasi.findAll({ where: { foto: "no Files" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisasi."
      });
    });
};

