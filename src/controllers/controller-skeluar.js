const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);


pool.on('error', (err) => {
    console.log(err)
});

module.exports = {
    
    getDataskeluar(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM surat_keluar';
            connection.query(query, function (err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },

    getDetailskeluar(req, res) {
        const no = req.params.no;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM surat_keluar WHERE no = ? ';
            connection.query(query ,[no], function (err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },

    addDataskeluar(req, res) {
        // parse data
        const {
            no,
            tanggal,
            no_surat,
            perihal,
            ditujukan,
            keterangan,
        } = req.body

        pool.getConnection(function (err, connection) {
            if (err) console.log(err);

            const query = 'INSERT INTO surat_keluar (no, tanggal, no_surat, perihal, ditujukan, keterangan) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(query, [
            no,
            tanggal,
            no_surat,
            perihal,
            ditujukan,
            keterangan,
                cover], function (err, result) {
                    if (err) console.log(err);

                    res.send({
                        success: true,
                        message: 'Your record has been saved successfully',
                    })
                })

            connection.release();
        })
    },

    editDataskeluar(req, res) {
        const no = req.params.no;

        // parse data
        const data = {
            no: req.body.no,
            tanggal: req.body.tanggal,
            no_surat: req.body.no_surat,
            perihal: req.body.perihal,
            ditujukan: req.body.ditujukan,
            keterangan: req.body.keterangan,
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'UPDATE surat_keluar SET ? WHERE no = ? ';
            connection.query(query, [data, no], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    },

    deleteDataskeluar(req, res) {
        const no = req.params.no;

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM surat_keluar WHERE no = ?';
            connection.query(query, [no], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Deleted successfully',
                })
            })
            connection.release();
        })
    }
}