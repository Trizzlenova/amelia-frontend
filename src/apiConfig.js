export const API_CONFIG = {
  appointments: {
    title: "Appointments",
    actions: [
      {
        method: 'GET',
        endpoint: '/appointments',
        description: 'List of scheduled appointments',
        fields: ['patient', 'status'],
        schema: {
          "_id": "67fe4aaa46ec1625f92a5164",
          "patient": "string",
          "status": "string",
          "appointmentType": "string",
          "reason": "string",
          "minutesDuration": "number",
          "createdAt": "2025-04-15T12:01:46.838Z",
          "__v": 0
        }
      },
      {
        method: 'POST',
        endpoint: '/appointments',
        description: 'Create a new appointment entry',
        fields: ['patient', 'status', 'appointmentType', 'reason', 'start', 'end', 'minutesDuration', 'comment', 'doctor'],
        schema: {
            "patient": "string",
            "status": "string",
            "appointmentType": "string",
            "reason": "string"
        }
      }
    ]
  },
  onboarding: {
    title: "Onboarding",
    actions: [
      {
        method: 'GET',
        endpoint: '/onboarding',
        description: 'Search and list all employee onboarding records',
        fields: ['employeeName', 'typeOfEmployee'], 
        schema: {
          "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
          "employeeName": "string",
          "ssn": "string",
          "dob": "string",
          "typeOfEmployee": "string",
          "photo": "string (base64)",
          "photoType": "string",
          "email": "string",
          "city": "string",
          "createdAt": "2026-03-10T14:15:00.000Z",
          "updatedAt": "2026-03-10T14:15:00.000Z",
          "__v": 0
        }
      },
      {
        method: 'POST',
        endpoint: '/onboarding',
        description: 'Register a new employee into the onboarding system',
        // These are the fields that will appear in your DynamicForm
        fields: ['employeeName', 'ssn', 'dob', 'typeOfEmployee', 'email', 'city'],
        schema: {
          "employeeName": "string",
          "ssn": "string",
          "dob": "string",
          "typeOfEmployee": "string",
          "email": "string",
          "city": "string"
        }
      }
    ]
  }
};