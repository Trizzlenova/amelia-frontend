// src/apiConfig.js
export const API_CONFIG = {
  appointmentsList: {
    label: "View Appointments",
    endpoint: '/appointments',
    fields: ['page'], // Search params only
    method: 'GET'
  },
  appointmentsCreate: {
    label: "Add Appointment",
    endpoint: '/appointments',
    fields: ['patient', 'status', 'appointmentType', 'reason'],
    method: 'POST'
  }
};