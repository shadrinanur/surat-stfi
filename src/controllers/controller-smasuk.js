const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);


pool.on('error', (err) => {
    console.log(err)
});

module.exports = {
    
    getDatasmasuk(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM smasuk';
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

    getDetailsmasuk(req, res) {
        const no = req.params.no;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM smasuk WHERE no = ? ';
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

    addDatasmasuk(req, res) {
        // parse data
        const {
            tanggal_masuk,
            no_surat,
            tanggal_surat,
            pengirim,
            perihal,
            ditujukan,
        } = req.body

        pool.getConnection(function (err, connection) {
            if (err) console.log(err);

            const query = 'INSERT INTO smasuk (tanggal_masuk, no_surat,tanggal_surat ,pengirim ,perihal, ditujukan) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(query, [
                tanggal_masuk,
                no_surat,
                tanggal_surat,
                pengirim,
                perihal,
                ditujukan,
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

    editDatasmasuk(req, res) {
        const no = req.params.no;

        // parse data
        const data = {
                tanggal_masuk,
                no_surat,
                tanggal_surat,
                pengirim,
                perihal,
                ditujukan,
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'UPDATE smasuk SET ? WHERE no = ? ';
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

    deleteDatasmasuk(req, res) {
        const no = req.params.no;

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM smasuk WHERE no = ?';
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