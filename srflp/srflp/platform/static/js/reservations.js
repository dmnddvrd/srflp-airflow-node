let schedules = [];

const createReservation = (data) => {
  $.ajax('/reservations/create', {
    type: 'post',
    data,
    dataType: 'json',
    success(response) {
      console.log(response);
      $.alert({
        title: 'Success!',
        content: 'Reservation has been stored in our system',
        onClose: () => {
          window.location.reload();
        },
      });
      return response;
    },
    error(err) {
      console.log(err);
      $.alert({
        title: 'Error!',
        content: 'Could not delete schedule',
      });
      return false;
    },
  });
};

const getSchedules = () => {
  $.ajax('/schedules/all', {
    type: 'get',
    dataType: 'json',
    success(response) {
      schedules = response.schedules;
    },
    error(err) {
      console.log(err);
      return false;
    },
  });
};

const deleteReservation = (id) => {
  $.ajax('/reservations/delete', {
    type: 'post',
    data: {
      id,
    },
    dataType: 'json',
    success(response) {
      console.log(response);
      $.alert({
        title: 'Success!',
        content: 'Reservation canceled successfully',
        onClose: () => {
          $(`tr.reservations#${id}`).remove();
        },
      });
      return response;
    },
    error(err) {
      console.log(err);
      $.alert({
        title: 'Error!',
        content: 'Could not cancel reservation',
      });
      return false;
    },
  });
};

const createSelectInputFromData = (data) => {
  let content = '<select id="schedule">';
  data.forEach((entry) => {
    content += `<option value="${entry.id}">${entry.id}. ${entry.from}->${entry.to} | ${entry.hour}:00 | ${entry.price}RON </option>`;
  });
  content += '</select>';
  return content;
};

$(document).ready(() => {
  getSchedules();
  $('.reservations').click((e) => {
    const resrvationId = e.target.parentNode.id;
    $.confirm({
      title: 'Cancel reservation',
      content: 'Are you sure you want to cancel the reservation?',
      buttons: {
        formSubmit: {
          text: 'Yes',
          btnClass: 'btn-blue',
          action() {
            deleteReservation(resrvationId);
          },
        },
        cancel() {
        },
      },
    });
  });
  $('#reservation-btn').click(() => {
    const input = createSelectInputFromData(schedules);
    const content = `${'</form>'
  + '<form action="" class="formName">'
  + '<div class="form-group" style ="display:flex; flex-direction: column;">'
  + ''}${input}<label>Provide a note for your reservation</label>`
  + '<input type="text" placeholder="Note" class="name form-control" required />'
  + ''
  + '</div>';


    $.confirm({
      title: 'Create a reservation',
      content,
      buttons: {
        formSubmit: {
          text: 'Submit',
          btnClass: 'btn-blue',
          action() {
            createReservation({
              schedule_id: $('#schedule').val(),
              reservation_for: $('.name').val(),
            });
          },
        },
        cancel() {
        // close
        },
      },
    });
  });
});
