const express = require('express'),
  authMW = require('../middleware/user-authentication'),
  scheduleController = require('../controllers/schedule-controller');

const app = express.Router();


app.get('/all', async (req, res) => {
  const formData = req.query;
  return res.status(200).json({
    status: 'success',
    // user: req.signedCookies.user,
    schedules: await scheduleController.queryRoutes(formData),
  });
});

app.use(authMW);

app.post('/create', async (req, res) => {
  const formData = req.body;
  if (!formData.from || !formData.to || !formData.days || !formData.hour
        || !formData.type || !formData.price) {
    return res.status(400).json({
      status: 'error',
      // user: req.signedCookies.user,
      error: 'req body missing parameters',
    });
  }
  const id = await scheduleController.createRoute(formData);
  if (id === false) {
    return res.status(400).json({
      status: 'error',
      error: 'could not create record',
    });
  }
  return res.status(200).json({
    status: 'success',
    // user: req.signedCookies.user,
    scheduleId: id,
  });
});

app.post('/delete', async (req, res) => {
  const formData = req.body;
  if (!formData.id) {
    return res.status(400).json({
      status: 'error',
      error: 'req body missing id parameter',
    });
  }
  const resp = await scheduleController.removeRoute(formData);
  if (!resp) {
    return res.status(500).json({
      status: 'error',
      error: `could not delete record ${formData.id}`,
    });
  }
  return res.status(200).json({
    status: 'success',
    // user: req.signedCookies.user,
    deleted: formData.id,
  });
});

module.exports = app;
