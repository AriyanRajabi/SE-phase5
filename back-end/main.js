const express = require('express')
const app = express()
const port = 3000
const { System, TreatmentPackageList } = require('./classes')
const system = new System()
const cors = require('cors')
app.use(cors())

app.get('/package/:id', async (req, res) => {
  const package = await TreatmentPackageList.getPackageById(req.params.id)
  res.json(package)
})

app.get('/packages', async (req, res) => {
  const packages = await TreatmentPackageList.getTreatmentPackages()
  res.json({ packages })
})

app.post('/submit-package/:id', (req, res) => {
  //assuming we can detect the patient by their JWT token (we assume it's patient 0)
  //assuming docs are gotten and saved and updated here
  const name = system.assignHealthConsultant(0)
  res.json({ success: true, name })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
