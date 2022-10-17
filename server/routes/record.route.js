const router = require('express').Router();
const { recordController } = require('../controllers');

router.get(
  '/get-top-records',
  recordController.getTopResult,
)

module.exports = router;
