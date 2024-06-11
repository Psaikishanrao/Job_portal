# Job_portal
A job portal web app with login/signup for recruiters and candidates. Recruiters can manage job postings and view candidate applications. Candidates can create profiles, browse jobs, and apply. Built with React.js, Node.js, Express.js, and MongoDB. Features JWT authentication.





## To Use This Project

1. Fork and Clone the Repository
   - [Fork it in your repository](https://github.com/Psaikishanrao/job_portal)
   - Clone it in your local folder using HTTPS/SSH link: `https://github.com/Psaikishanrao/job_portal.git`
   - Open your terminal and navigate to the directory where you want to clone the repository, then run:
     ```bash
     git clone https://github.com/Psaikishanrao/job_portal.git
     ```

2. Navigate to the Project Directory
   - Change directory to the project folder:
     ```bash
     cd job_portal
     ```

3. Install Dependencies for Frontend
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install all dependencies:
     ```bash
     npm install
     ```

4. Install Dependencies for Backend
   - Navigate to the backend directory:
     ```bash
     cd ../backend
     ```
   - Install all dependencies:
     ```bash
     npm install
     ```

5. Start the Frontend Server
   - Navigate back to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Start the React app:
     ```bash
     npm start
     ```

6. Start the Backend Server
   - Navigate to the backend directory:
     ```bash
     cd ../backend
     ```
   - Start the backend server using nodemon:
     ```bash
     npm run server
     ```

## Detailed Steps

### 1. Set Up the Project

1. Create a new folder on your system where you want to keep the project.
2. Open the new folder in Visual Studio Code (VS Code) or your preferred code editor.

### 2. Clone the Repository

1. Open a terminal in the new folder.
2. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/Psaikishanrao/job_portal.git
   ```
3. Navigate to the cloned project folder:
   ```bash
   cd job_portal
   ```

### 3. Install and Run Frontend

1. Change directory to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

### 4. Install and Run Backend

1. Open a new terminal or use the existing one and navigate to the backend folder:
   ```bash
   cd ../backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the backend server using nodemon:
   ```bash
   npm run server
   ```

By following these steps, you should have both the frontend and backend servers running. The React app will be available at `http://localhost:3000` by default, and the backend server will be running at `http://localhost:5000`.

Now you can start working with the job portal application, adding and viewing job postings as needed.

Steps to make your own branch and commit:-
1. git branch branch-name (to create your own branch)
2. git checkout branch-name (to move to your branch, now you can work in that branch)
3. git branch(to see all the branches , green colour will show in which branch you are currently)
4. To cimmit any changes-
  a. git add .
  b. git commit -m "message"
  c. git push origin branch-name(to push in your branch)
5. Incase there is any error in your changes you can move to the previous uncommited code by
  git stash


#Project Overview
Technologies Used:

Frontend:
React: For building the user interface.
Chakra UI: For UI components and styling.
Backend:
Node.js: Server-side JavaScript runtime.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database for storing job posts and user data.
Mongoose: ODM for MongoDB to interact with the database.
Others:
Axios: For making HTTP requests from the frontend.
npm/yarn: Package managers.
Project Structure
Frontend:

src/components/JobBoard.jsx: Displays the list of job postings and handles exporting job applicant data.
src/components/JobForm.jsx: Provides a form for adding or updating job postings.
src/App.js: Main application component that integrates JobBoard and JobForm.
![image](https://github.com/Psaikishanrao/Job_portal/assets/110697349/706b0665-c640-4f7a-94be-039cb2b434b5)

![image](https://github.com/Psaikishanrao/Job_portal/assets/110697349/96aeb726-7f14-4bfd-b4e5-49de4fa0f8bf)
![image](https://github.com/Psaikishanrao/Job_portal/assets/110697349/38e4b238-a8d6-4c5c-9bf8-8358a546d4f3)



Backend:

models/JobPost.js: Mongoose schema and model for job postings.
controllers/jobController.js: Functions for handling CRUD operations for job postings.
routes/jobRoutes.js: Defines API routes for job operations.
server.js: Sets up and starts the Express server, connecting to the MongoDB database.
