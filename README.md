# Social-Network-API

## My Task

My homework is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. I used Express.js for routing, a MongoDB database, and the Mongoose ODM. 

## User Story

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## The Criteria

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## The Work
For this project- it was completely back-end; so I used express, MongoDB, and insomnia to create and showcase this social-network api. I created controllers for the data so "users" and "thoughts" could be created and updated, and schema models for both users, thoughts, as well as reactions. Once a user is established, they can add friends, which then allows them and their friends to post and comment on each other's posts. Not only that, but thoughts and friends can be deleted as well. I created GET, POST, PUT, and DELETE routes to make all of this attainable, and utilized moment.js to create an accurate and up-to-date time stamp for reactions and posts.

## Review

I am submitting BOTH of the following for review:

* A walkthrough video demonstrating the functionality of the application and all of the acceptance criteria being met:
https://drive.google.com/file/d/1vvsdPb8zXGyz2IsI2C2er0MSv_q4AHbI/view

* The URL of the GitHub repository:
https://github.com/Paterma/Social-Network-API
