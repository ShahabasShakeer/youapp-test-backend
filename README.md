# YouApp Test Backend Application

YouApp test backend application is built using Nest.js, MongoDB, and Node.js. It includes features such as user authentication, profile management, and real-time chat functionality. The application is containerized using Docker and uses JWT for authentication, DTO for data transfer objects, validations, Socket.IO for real-time communication, RabbitMQ for message queueing, and Swagger for API documentation.

## Features
* User Authentication (Register, Login)
* Profile Management (Create, Update, Get Profile)
* Real-time Chat Functionality
* JWT Authentication
* Data Validations
* Horoscope and Zodiac Calculation based on Birthday
* Dockerized Deployment
* RabbitMQ for Message Queueing
* Comprehensive API Documentation with Swagger
* Unit Tests

## Setup and Installation
1. Clone the repository and install Node JS Dependancies
```
npm install
```
2. Create a .env file in the root directory and add necessary environment variables.
```
MONGO_URI=mongodb://mongo:27017/youapp-test
JWT_SECRET=jwt_secret
RABBITMQ_URL=amqp://rabbitmq:5672
```
3. Build and run docker containers.
```
docker-compose up --build
```

## Running the Application
The application will be accessible at http://localhost:3000. Swagger API documentation will be available at http://localhost:3000/api.

## API Documentation
Swagger is used for API documentation. You can access the documentation at http://localhost:3000/api.
### Endpoints
* Register: POST /auth/register
* Login: POST /auth/login
* Create Profile: POST /profile
* Get Profile: GET /profile/:userId
* Update Profile: PUT /profile/:userId
* Send Message: POST /chat/send
* Get Messages: GET /chat/messages?senderId=USER_ID_1&receiverId=USER_ID_2

## Testing
Unit tests are written using Jest. To run the tests, use the following command:
```
npm run test
```

## Summary
This project is built for the sole purpose of interview selection process at YouApp.
