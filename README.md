# Getting Started with Agribank Vietnam Online application

The frontend is written in React, using Formik for the application form. Navigation is handled via routing. Inline styling is also made easier via Tailwind.

The application form is connected to a Firebase project using Firestore. Applications are sent to a collection and stored as documents, where they are accessed from a mock-up application viewer. The URL of each application is parametrically decided from its ID in the database, making them all unique.

The purpose of this project is to simplify the application process, minimizing paper usage, and the extra step of printing photos to put on the application. Utilizing this process will save a lot of time for both candidates and recruiters. 

## How to run

1. Clone the repo into a directory
2. In the project directory, you can run:
### `yarn install` (if needed)
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
This is where you can fill out the job application, which then will be saved into a Firebase database.

To see the list of applications submitted, open [http://localhost:3000/applications](http://localhost:3000/applications) \
This page will include a list of applications, which a recruiter could open and see. The recruiter could also delete an application, which will also delete information of the application on Firebase automatically.
