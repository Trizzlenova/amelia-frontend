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
        method: 'GET',
        endpoint: '/appointments/:reason',
        description: 'Find a specific appointment by its reason (e.g., "Consultation")',
        fields: ['reason'],
        isPathParams: true, // Custom flag to handle /endpoint/:value logic
        schema: {
            "_id": "67fe4aaa46ec1625f92a5164",
            "patient": "string",
            "status": "string",
            "reason": [{ "text": "Consultation" }],
            "minutesDuration": 30
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
      },
    ]
  },
  appointmentsScheduled: {
    title: 'Appointments Scheduled',
    actions: [
      {
        method: 'GET',
        endpoint: '/appointments_scheduled',
        description: 'Retrieve all scheduled patient appointments',
        fields: ['patientName', 'doctor', 'department'],
        schema: {
          "_id": "65f6d5b2e1a7b8c9d0e1f2a3",
          "patientName": "string",
          "patientDOB": "string",
          "doctor": "string",
          "date1": "string",
          "time1": "string",
          "location": "string"
        }
      },
      {
        method: 'GET',
        endpoint: '/appointments_scheduled/:patientName',
        description: 'Search appointments by Patient Name',
        fields: ['patientName'],
        isPathParams: true,
        schema: {
          "appointments": [
            { "patientName": "John Doe", "doctor": "Dr. Smith", "date1": "2026-04-12" }
          ],
          "error": null
        }
      },
      {
        method: 'POST',
        endpoint: '/appointments_scheduled',
        description: 'Schedule a new patient appointment with multiple date options',
        fields: [
          'patientName', 'patientDOB', 'phoneNumber', 'department', 'doctor', 'location',
          'date1', 'time1', 'date2', 'time2', 'date3', 'time3', 'date4', 'time4'
        ]
      }
    ]
  },
  beneficiary: {
    title: "Beneficiary",
    actions: [
        {
            method: 'GET',
            endpoint: '/beneficiary',
            description: 'List all beneficiary records',
            fields: ['emailOfPolicyHolder'],
            schema: {
                "_id": "65f4b2a1c3d4e5f6a7b8c9d0",
                "nameOfBeneficiary": "string",
                "emailOfPolicyHolder": "string",
                "emailOfBeneficiary": "string",
                "addressOfBeneficiary": "string",
                "phoneNumberOfBeneficiary": "string"
            }
        },
        {
            method: 'GET',
            endpoint: '/beneficiary/:email',
            description: 'Find a beneficiary by Policy Holder Email',
            fields: ['email'],
            isPathParams: true,
            schema: { "beneficiary": { "nameOfBeneficiary": "John Doe", "emailOfBeneficiary": "john@doe.com" } }
        },
        {
            method: 'POST',
            endpoint: '/beneficiary',
            description: 'Create a new beneficiary entry',
            fields: ['nameOfBeneficiary', 'emailOfPolicyHolder', 'emailOfBeneficiary', 'addressOfBeneficiary', 'phoneNumberOfBeneficiary']
        },
        {
            method: 'PUT',
            endpoint: '/beneficiary/email',
            description: 'Update beneficiary details using Policy Holder Email',
            fields: ['emailOfPolicyHolder', 'nameOfBeneficiary', 'emailOfBeneficiary', 'addressOfBeneficiary', 'phoneNumberOfBeneficiary'],
            schema: { "result": "The post to your database was successful" }
        }
    ]
  },
  claimStatus: {
    title: "Claim Status",
    actions: [
      {
        method: 'GET',
        endpoint: '/claim_status',
        description: 'Retrieve all petitioner claim statuses',
        fields: ['petitionerEmail', 'status'],
        schema: {
          "_id": "65f5c3a2b1d4e5f6a7b8c9d0",
          "nameOfPetitioner": "string",
          "petitionerEmail": "string",
          "status": "In process",
          "notes": "string",
          "createdAt": "2026-03-11T12:00:00Z"
        }
      },
      {
        method: 'GET',
        endpoint: '/claim_status/:email',
        description: 'Check status for a specific petitioner via email',
        fields: ['email'],
        isPathParams: true,
        schema: {
          "claim_status": {
            "nameOfPetitioner": "Jane Doe",
            "status": "In process",
            "notes": "Awaiting document verification"
          }
        }
      },
      {
        method: 'POST',
        endpoint: '/claim_status',
        description: 'Create a new claim status entry',
        fields: ['nameOfPetitioner', 'petitionerEmail', 'status', 'notes']
      }
    ]
  }, 
  insurable: {
    title: "Insurable Items",
    actions: [
      {
        method: 'GET',
        endpoint: '/insurable',
        description: 'Fetch all insurable records and premium status',
        fields: ['name', 'email'],
        schema: {
          "_id": "65f7e4c2a1b7c8d9e0f1a2b3",
          "name": "string",
          "email": "string",
          "notes": "Notes go here",
          "premium": false,
          "createdAt": "2026-03-11T14:00:00Z"
        }
      },
      {
        method: 'POST',
        endpoint: '/insurable',
        description: 'Register a new insurable item or client',
        fields: ['name', 'email', 'notes', 'premium'],
        schema: {
          "name": "string",
          "email": "string",
          "notes": "string",
          "premium": "boolean"
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
  paymentDetails: {
    title: "Payment Details",
    actions: [
      {
        method: 'GET',
        endpoint: '/payment_details',
        description: 'View all account payment methods and schedules',
        fields: ['accountEmail', 'accountNumber'],
        schema: {
          "_id": "65f8d9c2a1b7c8d9e0f1a2b3",
          "accountNumber": 123456789,
          "accountEmail": "billing@example.com",
          "paymentType": "Credit card",
          "paymentFrequency": "Monthly"
        }
      },
      {
        method: 'POST',
        endpoint: '/payment_details',
        description: 'Register new payment account details',
        fields: ['accountNumber', 'accountEmail', 'paymentType', 'paymentFrequency']
      },
      {
        method: 'PUT',
        endpoint: '/payment_details/:email',
        description: 'Update payment type or frequency using Account Email',
        fields: ['email', 'paymentType', 'paymentFrequency'],
        isPathParams: true,
        schema: {
          "result": "The post to your database was successful",
          "error": null
        }
      }
    ]
  },
  users: {
    title: "User Management",
    actions: [
      {
        method: 'GET',
        endpoint: '/',
        description: 'Fetch all registered users',
        fields: ['name', 'email', 'role'], 
        schema: {
          "_id": "65f3a1b2c3d4e5f6a7b8c9d0",
          "name": "string",
          "email": "user@example.com",
          "password": "password",
          "role": "Member",
          "phoneNumber": "123-867-5309",
          "pastDue": "true",
          "disconnected": "true",
          "createdAt": "2026-03-11T10:00:00Z",
          "updatedAt": "2026-03-11T10:00:00Z",
          "__v": 0
        }
      },
      {
        method: 'POST',
        endpoint: '/',
        description: 'Register a new user to the platform',
        fields: ['name', 'email', 'password', 'role', 'phoneNumber'],
        schema: {
          "name": "string",
          "email": "string",
          "password": "string",
          "role": "string"
        }
      },
      {
        method: 'PUT',
        endpoint: '/',
        description: 'Update user password via phone number or email',
        fields: ['email', 'phoneNumber', 'password'],
        schema: {
            "phoneNumber": "string",
            "email": "string",
            "password": "new_password_string",
        }
      },
      {
        method: 'DELETE',
        endpoint: '/clean-users',
        trueEndpoint: '/',
        description: 'DANGER: Wipe all users from the database',
        fields: [],
        schema: {
          "message": "User database cleared",
          "count": 0
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
      },
      {
        method: 'DELETE',
        endpoint: '/clean-wifi', 
        trueEndpoint: '/wifi-access',
        description: 'DANGER: Permanently delete all wifi access records from the database.',
        schema: {
          "message": "All wifi records have been successfully cleared",
          "count": 0
        }
      }
    ]
  }
};