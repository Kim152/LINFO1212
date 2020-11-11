const {Router} = require('express')
const router = Router()
const Incident = require('../models/incidents')

const {rendernote,create, incidents} = require('../controllers/incontrollers')

router.get('/summit',rendernote);

router.post('/submit', create);

router.get('/incident', incidents);

module.exports = router