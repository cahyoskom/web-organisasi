module.exports = (sequelize, Sequelize) => {
    const Organisasi = sequelize.define("organisasi",{
        
        nama:{
            type:Sequelize.STRING
        },
        alamat:{
            type:Sequelize.STRING
        },
        tempat_berdiri:{
            type:Sequelize.STRING
        },
        tgl_berdiri:{
            type:Sequelize.DATE
        },
        jenis_organisasi:{
            type:Sequelize.STRING
        },
        logo:{
            type:Sequelize.TEXT('long')
        }
    });

    return Organisasi;
};