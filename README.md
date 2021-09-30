# Ticket to Ride

## Description

This project includes two parts.
The main part is inside ./backend wich is the required REST API
The other part is on optionnal front end React app, just for playing with some routes of the API but remain a rough draft (even if working)

## Documentation

The API documentation is created using librairy Swagger and accessible at 'http://localhost:4000/api-docs/' once the server is launched.

## Prerequisite

Before launching the frontend, if you wish so, you will have to use POST routes of this API so insert data to play with.

POST exemple:

- First:
  http://localhost:4000/api/astronaut/

with body:
{
"name": "Joseph M. Acaba",
"age": "54",
"picture_url": "https://upload.wikimedia.org/wikipedia/commons/8/83/Joseph_M._Acaba_in_2017.jpg",
}


## General setup
As the project is split in two parts, don't forget to navigate into the sub directories before launching $npm install


## Available Scripts
In total, three scripts:
- lauching the server
- testing the server
- launching the front app

### Frontend
React has been used, with simple custom components. Nothing fancy there!

### Backtend
Fist of all, it is an express API, split in standard architecture (model/route/controller)
Sequelize is the ORM chosen to conduct SQL queries and prevent from SQL injection
A security module has been added as advised on express doc: helmet
Test are performed using JEST, basically testing API behaviour with edge cases (200, 403 etc..). These tests are carried out based on supertest tool that provide great help to simulate server responses.