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
  },
  wifiAccess: {
    title: "Wifi Access",
    actions: [
      {
        method: 'GET',
        endpoint: '/wifi-access',
        description: 'Retrieve all guest and vendor wifi credentials',
        fields: ['vendor', 'number'], 
        schema: {
          "_id": "65f2d4e5f6a7b8c9d0e1f2a3",
          "number": "string",
          "password": "string",
          "vendor": "string",
          "startDate": "2026-03-10T15:00:00Z",
          "endDate": "2026-03-17T15:00:00Z",
          "duration": "7 days",
          "createdAt": "2026-03-10T15:18:00Z",
          "updatedAt": "2026-03-10T15:18:00Z",
          "__v": 0
        }
      },
      {
        method: 'POST',
        endpoint: '/wifi-access',
        description: 'Generate new wifi access credentials',
        fields: ['number', 'password', 'vendor', 'startDate', 'endDate', 'duration'],
        schema: {
          "number": "string",
          "password": "string",
          "vendor": "string",
          "startDate": "string",
          "endDate": "string",
          "duration": "string"
        }
      }
    ]
  }
};