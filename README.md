Local Office Day 2016 Hardware Workshop
=========

[![Build Status](https://travis-ci.org/RosyTucker/LocalOfficeDay2016.svg?branch=master)](https://travis-ci.org/RosyTucker/LocalOfficeDay2016)

An express application for the local office day hardware workshop, to relay messages between agents.

Run
-------

`npm start`

This will build the dist folder and then start an express app server at [localhost:5005](http://localhost:5005).

Test
------

`npm test`

This will install all required packages, run the lint and the tests. Are are written using mocha + sinon + chai.


Deployment
------

`npm run deploy`

The app is currently deployed on AWS using elastic beanstalk.