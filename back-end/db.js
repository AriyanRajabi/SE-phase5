// Import sqlite3 module
const sqlite3 = require('sqlite3').verbose()
const TableNames = { TreatmentPackage: 'TreatmentPackage' }
// Open the database
let db = new sqlite3.Database('./db.db', err => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the database.')
})

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run(
    `CREATE TABLE IF NOT EXISTS ${TableNames.TreatmentPackage}(id INTEGER PRIMARY KEY, name TEXT, cost INT, duration INT, procedures TEXT, services TEXT)`,
    err => {
      if (err) {
        // This should show the error if something goes wrong.
        console.log(err)
      } else {
        console.log('Table created successfully')
      }
    }
  )
})

async function getAllTreatmentPackagesNamesAndIds () {
  let sql = `SELECT id, name FROM ${TableNames.TreatmentPackage}`
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

async function addTreatmentPackage (name, cost, duration, procedures, services) {
  let sql = `INSERT INTO ${TableNames.TreatmentPackage}(name, cost, duration, procedures, services) VALUES(?, ?, ?, ?, ?)`

  return new Promise((resolve, reject) => {
    db.run(sql, [name, cost, duration, procedures, services], function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id: this.lastID })
      }
    })
  })
}

async function getTreatmentPackageById (id) {
  let sql = `SELECT * FROM ${TableNames.TreatmentPackage} WHERE id = ?`

  return new Promise((resolve, reject) => {
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

module.exports = {
  getTreatmentPackageById,
  getAllTreatmentPackagesNamesAndIds,
  addTreatmentPackage
}
