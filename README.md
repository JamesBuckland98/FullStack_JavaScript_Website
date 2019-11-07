# CM6311 Commercial Frameworks Languages and Tools
## How To Start the project
1. Make sure you run npm i in the backend and front end directory to 
get all the modules
2. In the root directory of the project run npm start. This will use concurrently to cd into both 
the front endand back end directory and fire their start scripts
3. Goto [http://localhost:3000/](http://localhost:3000/) once the server has started running.(Please note that you have to be connected to eduroam or the vpn in order to connect to the cardiff uni database server).

## Running Tests
### Frontend
1. cd into frontend directory
2. npm test

### Backend
1. cd into backend directory
2. npm test

## Assumptions Made
* Users don't know the tempurature of the location they're at. In order to deal with this I have linked the project up to Open Weather API to get the temperature base on latituade and longitude.
* Users don't know the exact location of their position. In order to deal with this I have used reat-geolocated library to get their latitude and longitude base on their devices location.
* Users can type up thier species instead of choosing from a set list. This assumption was made due to the amount of different species of frogs found in the rainforest.

## Aspects Mocked 
* During testing the frontend, I have mocked the react-geolocated latitude and longitude to give a fake location when testing. This is used in the chat and message input tests.
* When testing the back end, I have created a testing environment for tests using dotenv-flow. This allows you to have multiple different environments and switch between them based on the NODE_ENV. In this testing evironment, I have a test databse so I can mock post and get requests to the database without affecting the real database.

## Coding Paradigms
### Functional programming 
I seperated each computational business logic into functions and seperated into their own files with similar functionality. For example, In ChatAPI.js all functions in the file are realated to chat functionality. The advantage of desinging the project using functional programming means that functions can be imported across multiple modules thoughout the application. This improves the seperation of concern and makes it easier to build a large scale application as different business logic are seperated from each other making it easier to find each javascript function. Moreover, each function can be reused by other modules helping to reduce the amount of code.
### Object-Oriented programming
React is object-orientated by defining each component as a class. In the constructor of the class is where state is created. React allows the use of life cycle components such as componetDidMount and componetDidUpdate. for each class, I impoprted any business logic function into the class to use as a method. Moreover, using objects, I was able to seperate each component state to stop a crossover of state and too many prop types being passed down into child components. This helps with building a large scale project by keeping a good seperation between each component meaning that later down the line we can remove a component without affecting the rest of the code base.

## Justification of styling
In order to keep a consistant styling, I installed ESlint which is a tool for identifying patterns found in Javascript and report any errors and irregularity, helping to keep code conistent and reducing bugs. ESlint  is good when working with a large team with more than one person in order to keep coding style consistent making  it easier to understand each others code.

## Testing
### Frontend:
For testing the front end, I used a combination of Jest and Enzyme. The rason for using Jest is that Jest come automatically installed with the create-react-app. Jest is a testing framework that can use snapshots to make sure components can load and certain functions can run when invoked. The reason I am also using Enzyme alongside jest is because Enzyme makes it easier to travrse my components as well as only being able to render cerntain parts of my components when needed to depending on the test compared to getting the whole tree of the component to render when running a test. Enzyme is able to do this by using the shallow method. Making it easier to find and interact with elements. 

When testing the front end, I want to make sure that components load when called. As well as any functionality that the componets have such as a button etc. The reason I am not testing the form functionality is because I'm using an external moduel called Formik which handles form validation and is already tested by a third party,therefore I feel like I would not need to test if the formik functions work in the project as long as I have used Formik correctly.

### Backend
For testing the backend, I used a combination of Jest and superTest. The reason I am using Jest is because the front end is also using Jest and it helps to keep a consistency between the backend and frontend test. SuperTest is a testing module that enables tests to perform HTTP requests. This enables me to test end points with get and post requests to test getting and inserting data to the database. When performing end point tests I need to set the database used to the test database. In order to do this, when the tests the NODE_ENV is changed to testing. dotenv-flow enables us to use multiple environments and switch between them based on the NODE_ENV. I have written a env.testing file to overwrite the database name to the test database.

## Imported Moduels
* concurrently : enables to run the backend and frontend server at the same time by running npm start in the root folder of the project. This makes it easier to start and stop the project instead of having two terminals open for the backend and frontend. 
### Frontend
* Axios : Axios is a promise based HTTP client that makes HTTP requests simple and easy to use. Axios has built in CRSF protection and performs automatic JSON data transformation. This makes Axios a better choice than the native fetch function. 
* Dotenv : dotenv allows to create a .env file and store enviroment variables. This is good as we can store variables that will be used throughout the front end in the .env file so that when needing to change the variable, it can be easily changes in the .evn file and each file accessing the variable will be updated. Another benefit of using dotenv is that it can hide sensitive data. Usually you would exlude the .env file in the git ignore file and you have data such as API keys and database username and passwords. I have not excluded the .env file in this situation due to needing the  database password and username and api key to make the project run for Kathryn. However, when working within a team I could share the .env file between each other and keep sensitive data from the public.
* Formik : Formik is lightweight library that helps by getting values in and out of state, perform validation and produce error messages as well as handling form submition. Formik is good as it standardizing the way to write a form as well as handling errors and displaying erros messages.
* Socket.io-client : Socket.io-client is needed to link up the socket.io in the backend with the front end. Socket.io is good to enable realtime bidirectional event based communitcation and is good in this project due to the messaging aspect. 
### Backend
* cors : cors enables cross origins to be enables so the front end server for react can talk to the backend server
* dotenv-flow : dotenv-flow enables for multiple environment  and allows to switch between enviroments bases on the NODE_ENV. This means that we can set up a testing environment and a  production environment and switch between them when running either npm start or npm test. Dotenv-flow allows use to create .env.* files that will inherit the .env file. The reason to use dotenv-flow is the same reason as using dotenv in the frontend as it makes it easy to change variables being used throughout the application as well as protecting sensitive data by includeing the .env files in the git ignore. 
* mysql : mysql module enables node.js to create a connection to a mysql database. The reason I selected a Mysql database over mongoose is because Mysql is one of the largest database managers used throughout the industry and has alot of documentation. If I had another chance, I would like to try out mongoose as that will connect node.js to MongoDB which is part of the MERN stack.
* socket.io : socket.io enables real-time event based communication and enables messaging between clients connected to the server.

## Other personal choices
### Gitlab CI/CD pipeline
In this project I did not include a pipeline in my Gitlab repository. This is because I felt that it was not necessary with a project that I am just working on. If the project was being worked on between multiple people, then I would consider using a CI/CD pipeline as it can be set up to run tests and catch any errors that could cause a merge conflict.
### Sailsjs
Sailsjs is a MVC version of Nodejs. This would be a good way to organise the project and create modles based on tables in the databse. MVC is a good arcitectural design when creating a web based application with a clear frontend, backend, and database. This helps seperate the controller, modle and view as well as add an extra layer for business logic to better seperate the application. This would be the prefered way of doing the project if given another chance. 
### Sequelize 
Sequelize is a promise-based Node.js ORM. This means that we can map te database to the model easier. The main benefit sequelize has that I was missing in my project that I would like to of added in was the ability to perform migrations. This means that when updating the database, it is easier to create, alter, delete and reseed the database then currently is. Morever the abiltiy to refresh the database is much needed function when performing tests that add to the database as we can always garuntee that the test database will have a default state everytime we run a test as it will rollback to that state after inserting into the database, therefore will not affect future tests.