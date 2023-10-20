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
            const query = 'SELECT * FROM skeluar';
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
            const query = 'SELECT * FROM skeluar WHERE no = ? ';
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

            const query = 'INSERT INTO skeluar (no, tanggal, no_surat, perihal, ditujukan, keterangan) VALUES (?, ?, ?, ?, ?, ?)';
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
            no,
            tanggal,
            no_surat,
            perihal,
            ditujukan,
            keterangan
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'UPDATE skeluar SET ? WHERE no = ? ';
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

            const query = 'DELETE FROM skeluar WHERE no = ?';
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