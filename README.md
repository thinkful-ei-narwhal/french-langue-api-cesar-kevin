## Application
french-langue

## Links
live site: https://spaced-rep-french.vercel.app<br />
backend: https://damp-bastion-87075.herokuapp.com/

## Using The API
Currently the API supports GET and POST endpoints.

- Unprotected Endpoints<br />
+ SignUp: POST (https://url/api/api/user)<br />

- Protected Endpoints<br />
    + Login: POST (https://url/api/auth/token)<br />
    + Get Words: GET (https://url/api/auth/language)<br />
    + Get Head: GET (https://url/api/auth/language/head)<br />
    + POST Guess: POST (https://url/api/auth/language/guess)<br />

## Screen Shots
![signUp](images/signUp.png)<br />
![logIn](images/logIn.png)<br />
![dashboard](images/dashboard.png)<br />
![practice](images/practice.png)<br />
![feedback](images/feedback.png)<br />

### Summary
This app helps users implement the spaced repetition technique to help users learn ten preloaded French words.
New Users can create an account. Returning users can log in and begin practicing with instant feedback and
reinforcement.

## Technologies
  - React
  - Node.js
  - JavaScript
  - Postgresql 
  - Mocha, Chai
  - Express
  - Jest
