const moment = require("moment");
const { getUser, updateUser } = require("../../models/user/user.data");

async function updateUserAppointments(data) {
  // Add the booking to barber's 2WeeksBooking projection
  // TODO also have it take out past booking
  let user = await getUser(data.customer._id);
  user.appointments.push(data);
  // remove past appointments
  user = filterUserAppointments(user);
  console.log("updated user appointments");
  return user;
}

async function filterUserAppointments(user) {
  user.appointments = user.appointments.filter((appointment) => {
    return moment(appointment.startTime).isAfter(moment());
  });
  updateUser(user);
  return user;
}

module.exports = { updateUserAppointments, filterUserAppointments };
