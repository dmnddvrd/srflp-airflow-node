const express = require('express'),
  authMW = require('../middleware/user-authentication'),
  reservationController = require('../controllers/reservation-controller');

const app = express.Router();


app.get('/all', async (req, res) => {
  const formData = req.query;
  return res.status(200).json({
    status: 'success',
    user: req.signedCookies.user,
    reservations: await reservationController.queryReservations(formData),
  });
});


app.use(authMW);

app.post('/create', async (req, res) => {
  const formData = req.body;
  if (!formData.schedule_id) {
    return res.status(400).json({
      status: 'error',
      error: 'req body missing parameters',
    });
  }
  if (!formData.user_id) {
    formData.user_id = req.signedCookies.user.id;
  }
  const id = await reservationController.createReservation(formData);
  console.log(id);
  if (id === -1 || id === false) {
    return res.status(500).json({
      status: 'error',
      error: 'could not create record',
    });
  }
  return res.status(200).json({
    status: 'success',
    user: req.signedCookies.user,
    reservationId: id,
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
  const resp =  await reservationController.removeReservation(formData);
  if (!resp) {
    return res.status(500).json({
      status: 'error',
      error: `could not delete record ${formData.id}`,
    });
  }
  return res.status(200).json({
    status: 'success',
    user: req.signedCookies.user,
    deleted: formData.id,
  });
});

module.exports = app;
