# Arnica Project - SCM Security Analysis API

## Project Overview

This is a sample assignment for Arnica that accepts a git url and fetches basic repository information as well as security vulnerabilities via Gitleaks and outputs the results to a json report.

## Table of Contents

- [Setup Instructions](#project-setup)
- [Compile and Run the project](#compile-and-run-the-project)

## Project setup

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

The project has 2 main API endpoints based on the requirements as follows:

### Git Repo Basic Information Endpoint

There is one Source Code Management (SCM) Repository supported in the current version of this project, but the code is written to easily allow for additional SCMs to be added.

The Github repository endpoint is at **_https://localhost:3000/repo?url=https://github.com/{owner}/{repository}_**. This endpoint will fetch the basic information about the repository including the name, description, default branch, and the last commit information of the repository. This information is returned directly and not output to the report as I was not able to complete that but would be something that I would like to add. This would allow for a single report to be generated as an output for both the basic repo and security scan.

### Security Scanner Endpoint

There is one security scanner endpoint implemented in this version of the code. The only support scanner is Gitleaks.

The scan repository endpoint is at **_https://localhost:3000/scan?url=https://github.com/{owner}/{repository}_**. This endpoint will clone the repo in a temporary directory, run the scan using the Gitleaks CLI, delete the repo and finally output the results to a json report titled **{repository}-report.json**.

## Development Notes

### Project Thoughts

This was a challenge as I have never worked with Nest.js in the past. A lot of the decisions made during my development of the API was based on information learned as I went as well as online tutorials and resources. The main goal was to just get a working project with the thought of optimization after the basic functionality was completed. This means some of the code may not be the best optimized as that would happen at a later stage. The biggest challenge of the project was working within my time constraints as I only had about 1 - 2 hours a night to both learn and execute on the project.

### Unit Tests

Unit tests were not created due to time constraints and the use of a new framework. In an ideal situation I would create unit tests to ensure proper code coverage but due to this assignment requiring a lot of learning in a short time frame, I decided to forgo unit tests.

### Code Abstraction and Scaling

I began work on abstracting the code to easily scale up the amount of support SCM Repositories and Scanners. I was able to complete the code for implementing multiple SCMs but creating an interface service as well as a selector service that would allow for adding additional repositories. I would do the same for the scanners but was not able to complete it due to time constraints.

Additionally I would want to structure the output report a little better by ensuring both endpoints output to a single report file and the information was formatted nicely to be easily read and acted upon.

### Containerization and CI/CD Pipeline

Containerizing the code would be the next major feature I would want to work on. This would be the last part of the project I would focus on to ensure feature functionality was complete error-free. Although containerization is something I have experience in due to my past work, I was unable to complete due to time constraints.

## Final thoughts

This was a very interesting project to work on and I feel like I learned a lot. I would love to keep improving on this (time permitting) and gain more expertise in Nest.js. I have work with Node and Express in the past and I feel that Nest.js make creating API and working with endpoints so much easier than the former. This has definitely been a great experience for me and I hope to gain more knowledge and expertise in the future.
