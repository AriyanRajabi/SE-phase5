//todo: we need static CRUD methods on Lists, same thing should be added to Class Diagram
const {
  getAllTreatmentPackagesNamesAndIds,
  addTreatmentPackage,
  getTreatmentPackageById
} = require('./db')
const Genrders = { male: 'male', female: 'female' }

class User {
  #password
  constructor (username, password, name) {
    this.username = username
    this.#password = password
    this.name = name
  }
}

class PatientList {
  #patients
  constructor () {
    this.#patients = [
      new Patient(
        'rezaahmadi',
        '1234',
        'رضا احمدی',
        28,
        Genrders.male,
        'پرونده درمانی رضا احمدی'
      ),
      new Patient(
        'zahraamiri',
        '1234',
        'زهرا امیری',
        22,
        Genrders.female,
        'پرونده درمانی زهرا امیری'
      ),
      new Patient(
        'mohamadgholizadeh',
        '1234',
        'محمد قلی زاده',
        35,
        Genrders.male,
        'پرونده درمانی محمد قلی زاده'
      ),
      new Patient(
        'maryamrezaei',
        '1234',
        'مریم رضایی',
        19,
        Genrders.female,
        'سابقه درمانی مریم رضایی'
      ),
      new Patient(
        'ehsanhosseini',
        '1234',
        'احسان حسینی',
        39,
        Genrders.male,
        'سابقه درمانی احسان حسینی'
      ),
      new Patient(
        'masomehrahmani',
        '1234',
        'معصومه رحمانی',
        45,
        Genrders.female,
        'سابقه درمانی معصومه رحمانی'
      ),
      new Patient(
        'atefehjahani',
        '1234',
        'عاطفه جهانی',
        60,
        Genrders.female,
        'سابقه درمانی عاطفه جهانی'
      ),
      new Patient(
        'ahmadpourali',
        '1234',
        'احمد پورعلی',
        65,
        Genrders.male,
        'سابقه درمانی احمد پور علی'
      )
    ]
  }
  getPatient (index) {
    //ideally by id
    return this.#patients[index]
  }
}
class HospitalList {
  #hospitals
  constructor () {
    this.#hospitals = [
      new Hospital('شریعتی', 'تهران'),
      new Hospital('بقیه الله', 'تهران'),
      new Hospital('امین', 'تهران'),
      new Hospital('امام علی', 'تبریز'),
      new Hospital('اما حمینی', 'اصفهان')
    ]
  }
}
class ServiceList {
  static services
  constructor () {
    ServiceList.services = [
      new Service('سرویس هتل و حمل و نقل', 1100),
      new Service('سرویس هتل و حمل و نقل و گردشگری', 1800),
      new Service('سرویس غذا', 300)
    ]
  }
  static getService (index) {
    //ideally by name
    return ServiceList.services[index]
  }
}
class Patient extends User {
  #healthConsultant
  constructor (username, password, name, age, gender, record) {
    super(username, password, name)
    this.age = age
    this.gender = gender
    this.medicalHistory = new MedicalHistory(record)
    this.#healthConsultant = null
  }
  requestTreatmentPackage (treatmentPackage) {
    //to be implemented
    this.medicalHistory.addTreatmentPackage(treatmentPackage)
  }
  assignHealthConsultant (healthConsultant) {
    this.#healthConsultant = healthConsultant // a 2 way relation between patient and healthConsultant
  }
}
class Hospital {
  constructor (name, location) {
    this.name = name
    this.location = location
  }
  defineTreatmentProcedure (name, description, estimatedDuration) {
    //returns new TreatmentProcedure
  }
  defineTreatmentPackage (treatmentProcedure, name, estimatedCost) {
    //returns TreatmentPackage
  }
}
class Service {
  constructor (name, cost) {
    this.name = name
    this.cost = cost
  }
}

async function initTreatmentPackages () {
  try {
    await TreatmentPackageList.createTreatmentPackage(
      'عمل مچ پا',
      5000,
      3,
      [TreatmentProcedureList.getProcudure(0)],
      [ServiceList.getService(0), ServiceList.getService(1)]
    )
    await TreatmentPackageList.createTreatmentPackage(
      'عمل جراحی فک',
      2000,
      9,
      [
        TreatmentProcedureList.getProcudure(0),
        TreatmentProcedureList.getProcudure(1)
      ],
      [ServiceList.getService(2), ServiceList.getService(1)]
    )
    await TreatmentPackageList.createTreatmentPackage(
      'عمل لیزر چشم',
      4000,
      8,
      [TreatmentProcedureList.getProcudure(0)],
      [ServiceList.getService(0), ServiceList.getService(2)]
    )
  } catch (error) {
    console.error(error)
  }
}

class TreatmentPackageList {
  //in sqlite3 this class is considered DAO
  static async getTreatmentPackages () {
    try {
      const packages = await getAllTreatmentPackagesNamesAndIds()

      return packages
    } catch (error) {
      console.error(error)
      return []
    }
  }

  static async getPackageById (id) {
    try {
      const treatmentPackage = await getTreatmentPackageById(id)
      treatmentPackage.procedures = JSON.parse(treatmentPackage.procedures)
      treatmentPackage.services = JSON.parse(treatmentPackage.services)
      return treatmentPackage
    } catch (error) {
      console.error(error)
    }
  }

  static async createTreatmentPackage (
    name,
    cost,
    duration,
    procedures,
    services
  ) {
    try {
      /*console.log(
        name,
        cost,
        duration,
        JSON.stringify(procedures),
        JSON.stringify(services)
      )*/
      await addTreatmentPackage(
        name,
        cost,
        duration,
        JSON.stringify(procedures),
        JSON.stringify(services)
      )
      return new TreatmentPackage(name, cost, duration, procedures, services)
    } catch (error) {
      console.error(error)
    }
  }
}

class TreatmentPackage {
  //just to show schema
  constructor (name, cost, duration, procedures = [], services = []) {
    this.name = name
    this.cost = cost
    this.duration = duration
    this.procedures = procedures
    this.services = services
  }
}

class TreatmentProcedureList {
  static procedures
  constructor () {
    TreatmentProcedureList.procedures = [
      new TreatmentProcedure('ویزیت', 'توضیحات ویزیت', 'فاکتور ویزیت'),
      new TreatmentProcedure(
        'آزمایش خون',
        'توضیحات آزمایش خون',
        'نتیجه آزمایش خون'
      )
    ]
    TreatmentProcedureList.procedures.forEach(p => p.approve())
  }
  static getProcudure (index) {
    //ideally search by name or id
    return TreatmentProcedureList.procedures[index]
  }
}

class TreatmentProcedure {
  #approved
  constructor (name, description, documents) {
    this.name = name
    this.description = description
    this.#approved = false
    this.documents = documents
  }
  approve () {
    this.#approved = true
  }
}
class CommiteeList {
  #comittes
  constructor () {
    this.#comittes = [
      new Commitee('alirezaei', '1234', 'علی رضایی'),
      new Commitee('hosseinamini', '1234', 'حسین امینی')
    ]
  }
}
class Commitee extends User {
  constructor (username, password, name) {
    super(username, password, name)
  }
  approveTreatmentProcedure (procedure) {}
}
class MedicalHistory {
  #treatmentPackages
  constructor (record) {
    this.record = record
    this.#treatmentPackages = []
  }
  addTreatmentPackage (treatmentPackage) {
    this.#treatmentPackages.push(treatmentPackage)
  }
}

class HealthConsultantList {
  #consultants
  constructor () {
    this.#consultants = [
      new HealthConsultant('mohammadataei', '1234', 'محمد عطایی'),
      new HealthConsultant('fatemehGholi', '1234', 'فاطمه قلی')
    ]
  }
  getRandomHealthConsultant () {
    //ideally by some logic
    const randomIndex = Math.floor(Math.random() * this.#consultants.length)

    return this.#consultants[randomIndex]
  }
}

class HealthConsultant extends User {
  #patients
  constructor (username, password, name) {
    super(username, password, name)
    this.#patients = []
  }
  assignPatient (patient) {
    this.#patients.push(patient)
  }
  removePatient (patient) {
    this.#patients = this.#patients.filter(p => p.username === patient.username)
  }
}

class System {
  constructor () {
    this.patientList = new PatientList()
    this.hospitalList = new HospitalList()
    this.treatmentPackageList = new TreatmentPackageList()
    this.serviceList = new ServiceList()
    this.commiteeList = new CommiteeList()
    this.treatmentProcedureList = new TreatmentProcedureList()
    this.healthConsultantList = new HealthConsultantList()
    //initTreatmentPackages()
  }
  getPatients () {}
  getHospitals () {}
  getTreatmentPackages () {}
  getServices () {}
  displayAvailableTreatmentPackages () {}
  chooseTreatmentPackage (treatmentPackage) {}
  assignHealthConsultant (patientIndex) {
    //ideally it's name
    const patient = this.patientList.getPatient(patientIndex)
    const healthConsultant =
      this.healthConsultantList.getRandomHealthConsultant()
    patient.assignHealthConsultant(healthConsultant)
    healthConsultant.assignPatient(patient)
    return healthConsultant.name
    //create the relation
  }
  provideRequiredDocuments (patient, receiver) {}
  attachServicesToPatientFile (patient, service) {}
}

module.exports = {
  System,
  HealthConsultant,
  Hospital,
  HospitalList,
  MedicalHistory,
  Patient,
  PatientList,
  Service,
  ServiceList,
  TreatmentPackage,
  TreatmentPackageList,
  TreatmentProcedure
}
