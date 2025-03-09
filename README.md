```markdown
# Job Board Backend API (MongoDB)

A complete backend system for managing jobs and applications with REST and GraphQL APIs,
built with Express.js, MongoDB, and TypeScript.

## Features

- **REST API** 
- **GraphQL API** with queries and mutations
- **MongoDB** database integration
- **TypeScript** type safety
- **Zod** validation schemas
- MVC architecture pattern
- Comprehensive error handling
- Environment configuration

## Technologies

- Node.js 
- Express.js
- TypeScript
- MongoDB
- Zod
- Apollo Server (GraphQL)
- Postman (Testing)
- Mongoose (ODM)
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-board-backend-mongodb.git
   cd job-board-mongodb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file in root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/job-board
   PORT=4000
   ```

## MongoDB Setup

### For macOS Users

1. **Install MongoDB**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start Service**
   ```bash
   brew services start mongodb-community
   ```

3. **Create Database**
   ```bash
   mongosh
   use job-board
   exit
   ```

### For Windows Users

1. Download installer from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. Open bash:
```bash
mkdir C:\data\db  # Create the data directory

"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe"  # Start MongoDB server (replace 5.0 with your version)

"C:\Program Files\MongoDB\Server\5.0\bin\mongosh.exe"  # Access MongoDB shell

# Optional: Run MongoDB as a service
"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\5.0\mongod.cfg" --install  # Install MongoDB as service
net start MongoDB  # Start MongoDB service
```

## Running the Server

**Development mode:**
```bash
npm run start:dev
```

**Production build:**
```bash
npm run build
npm run start:prod
```

## Testing with Postman

1. Import the Postman collection from `/postman` directory
- Download the [Postman Job Board collection](./postman/job-board-backend.postman_collection.json) and import it into Postman.
- Download the [Postman Job Board Environment](./postman/job-board.postman_environment.json) and import it into Postman.
2. Or Manually Set up environment variables 
   after importing job board collection:
   - `jb-local-url`: `http://localhost:4000/api/v1`

## REST API Documentation

### Base URL
`http://localhost:4000/api/v1`

### Jobs Endpoints

#### Create Job
**POST** `/jobs`  
Request Body:
```json
{
  "title": "Senior Developer",
  "description": "Node.js backend development position",
  "company": "Tech Corp",
  "location": "Remote"
}
```

Success Response (201):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Job created successfully",
  "data": {
    "_id": "65d5f8a9c8b93912b4f4a491",
    "title": "Senior Developer",
    "description": "Node.js backend development position",
    "company": "Tech Corp",
    "location": "Remote",
    "created_at": "2025-03-08T23:10:59.118Z"
  }
}
```

#### Get All Jobs
**GET** `/jobs`  
Success Response (200):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Jobs retrieved successfully",
  "data": [
    {
      "_id": "65d5f8a9c8b93912b4f4a491",
      "title": "Senior Developer",
        "description": "Node.js backend development position",
      "company": "Tech Corp",
      "location": "Remote",
       "applications": [
                "67cd9805a04a24129c2dcd23",
                "67cd9812a04a24129c2dcd27"
            ],
    }
  ]
}
```

#### Get A Single Job
**GET** `/jobs/:id`  
Success Response (200):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Job Found!",
  "data": 
    {
      "_id": "65d5f8a9c8b93912b4f4a491",
      "title": "Senior Developer",
        "description": "Node.js backend development position",
      "company": "Tech Corp",
      "location": "Remote",
       "applications": [
                {
                "_id": "67cd9805a04a24129c2dcd23",
                "job_id": "67cd97929b9d82646b2f383b",
                "applicant_name": "Tom",
                "applicant_email": "rex@example.com",
                "cover_letter": "I have 1 years of experience...",
                "submitted_at": "2025-03-09T13:30:45.444Z",
                "__v": 0
                },
            ],
    }
  
}
```

### Applications Endpoints

#### Submit Application
**POST** `/applications`  
Request Body:
```json
{
  "job_id": "65d5f8a9c8b93912b4f4a491",
  "applicant_name": "John Doe",
  "applicant_email": "john@example.com",
  "cover_letter": "I have 5 years experience..."
}
```

Success Response (201):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Application submitted successfully",
  "data": {
    "_id": "65d5f8e3c8b93912b4f4a492",
    "job_id": "65d5f8a9c8b93912b4f4a491",
    "applicant_name": "John Doe",
    "applicant_email": "john@example.com",
    "cover_letter": "I have 5 years experience...",
    "submitted_at": "2025-03-08T23:12:03.456Z"
  }
}
```

#### Get All Application for a Specific Job
**POST** `/applications/:job_id`  

Success Response (200):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Applications retrieved successfully",
  "data": [
  {
    "_id": "65d5f8e3c8b93912b4f4a492",
    "job_id": "65d5f8a9c8b93912b4f4a491",
    "applicant_name": "John Doe",
    "applicant_email": "john@example.com",
    "cover_letter": "I have 5 years experience...",
    "submitted_at": "2025-03-08T23:12:03.456Z"
  },
       {
            "_id": "67cd9805a04a24129c2dcd23",
            "job_id": "65d5f8a9c8b93912b4f4a491",
            "applicant_name": "Tom",
            "applicant_email": "rex@example.com",
            "cover_letter": "I have 1 years of experience...",
            "submitted_at": "2025-03-09T13:30:45.444Z",
        },
]
}
```


## GraphQL API Documentation

Access Playground: Open `http://localhost:4000/graphql` in Google Chrome 
or any modern browser to test your GraphQL queries. 🚀

### Queries

#### Get All Jobs with Applications
```graphql
query {
  jobs {
    id
    title
    description
    applications {
      applicant_name
      submitted_at
    }
  }
}
```

Response:
```json
{
  "data": {
    "jobs": [
      {
        "id": "65d5f8a9c8b93912b4f4a491",
        "title": "Senior Developer",
        "description": "Node.js position",
        "applications": [
          {
            "applicant_name": "John Doe",
            "submitted_at": "2025-03-08T23:12:03.456Z"
          }
        ]
      }
    ]
  }
}
```


#### Get Single Job by ID
```graphql
query {
  job(id: "65d5f8a9c8b93912b4f4a491") {
    id
    title
    description
    company
    applications {
      applicant_name
      submitted_at
    }
  }
}
```

Response:
```json
{
  "data": {
    "job": {
      "id": "65d5f8a9c8b93912b4f4a491",
      "title": "Senior Developer",
      "description": "Node.js position",
      "company": "Tech Corp",
      "applications": [
        {
          "applicant_name": "John Doe",
          "submitted_at": "2023-10-05T12:45:00.000Z"
        }
      ]
    }
  }
}
```

#### Get All Applications for a Specific Job
```graphql
query {
  applications(job_id: "65d5f8a9c8b93912b4f4a491") {
    id
    applicant_name
    applicant_email
    submitted_at
  }
}
```

Response:
```json
{
  "data": {
    "applications": [
      {
        "id": "65d5f8e3c8b93912b4f4a492",
        "applicant_name": "John Doe",
        "applicant_email": "john@example.com",
        "submitted_at": "2023-10-05T12:45:00.000Z"
      }
    ]
  }
}
```


### Mutations

#### Create Job
```graphql
mutation {
  createJob(input: {
    title: "Frontend Developer",
    description: "React specialist",
    company: "Web Corp",
    location: "Hybrid"
  }) {
    id
    title
    company
  }
}
```

Response:
```json
{
  "data": {
    "createJob": {
      "id": "65d5f9b2c8b93912b4f4a493",
      "title": "Frontend Developer",
      "company": "Web Corp"
    }
  }
}
```


#### Create Application
```graphql
mutation {
  createApplication(input: {
    job_id: "65d5f9b2c8b93912b4f4a493",
    applicant_name: "Alice Smith",
    applicant_email: "alice@example.com",
    cover_letter: "Experienced developer..."
  }) {
    id
    applicant_name
  }
}
```

Response:
```json
{
  "data": {
    "createApplication": {
      "id": "65d5f9b2c8b93912b4f4a499",
      "applicant_name": "Alice Smith"
    }
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error",
  "error": [
    {
      "path": "body.job_id",
      "message": "Invalid Job ID"
    }
  ]
}
```
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error",
  "error": [
     {
        "path": "body.company",
        "message": "Expected string, received number"
    }
  ]
}
```
```json
{
    "success": false,
    "statusCode": 400,
    "message": "Validation Error",
    "data": null,
    "error": [
        {
            "path": "body.company",
             "message": "Company name must be at least 2 characters long"
        }
    ]
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "statusCode": 404,
  "message": "No job record found for the provided Job ID!"
}
```

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Job not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

## Scripts

```json
{
  "start:prod": "node ./dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "lint": "eslint 'src/**/*.ts'",
  "lint:fix": "npx eslint src --fix",
  "prettier": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
  "prettier:fix": "npx prettier --write src",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Troubleshooting

**MongoDB Connection Issues:**
```bash
# Verify MongoDB service status
brew services list  # macOS
net start MongoDB   # Windows

# Test connection
mongosh --eval "db.runCommand({ping:1})"
```

**Reset Database:**
```bash
mongosh job-board --eval "db.dropDatabase()"
```

**Common Issues:**
- Ensure MongoDB service is running
- Verify connection string in .env file
- Check for duplicate document IDs
- Validate all request bodies match Zod schemas
```