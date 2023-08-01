<h1 align="center">Connexa Backend</h1>

<h2>Description</h2>
<p>This repository contains the backend code for Connexa, a platform for online learning and networking exclusively for companies. The backend is developed using Node.js, Express, and MySQL with Sequelize. 🚀</p>

<h2>Database Tables</h2>
<ul>
  <li>Users</li>
  <li>Orders</li>
  <li>Courses</li>
  <li>Reviews</li>
</ul>

<h2>Relationships</h2>
<ul>
  <li>One Order belongs to One User (userId references Users Table) 🧑‍💼</li>
  <li>One Order belongs to One Course (courseId references Courses Table) 📝</li>
  <li>One Course belongs to One User (userId references Users Table) 📚</li>
  <li>One Course can have Many Orders (id references courseId in Orders Table) ✨</li>
  <li>One Course can have Many Reviews (id references courseId in Reviews Table) ✨</li>
  <li>One Review belongs to One User (userId references Users Table) 📝</li>
  <li>One Review belongs to One Course (courseId references Courses Table) 📚</li>
</ul>

<p>In this database design, we have established the following relationships:</p>
<ul>
  <li>Users can have multiple Courses and can also leave multiple Reviews for Courses they have taken.</li>
  <li>Courses can have multiple Orders from different Users, as well as multiple Reviews.</li>
  <li>Orders are linked to both Users and Courses, indicating which User has purchased which Course.</li>
</ul>

<h2>Model and Migration Creation 🛠️</h2>
<p>To implement this database design, we have created the necessary models and migrations using Sequelize.</p>

<h3>Model and Migration for the Users table 🧑‍💼</h3>
<pre><code>sequelize model:generate --name User --attributes name:string,email:string,password:string,role:string,company:string</code></pre>

<h3>Model and Migration for the Orders table 📝</h3>
<pre><code>sequelize model:generate --name Order --attributes userId:integer,courseId:integer,price:decimal</code></pre>

<h3>Model and Migration for the Courses table 📚</h3>
<pre><code>sequelize model:generate --name Course --attributes name:string,description:text,price:decimal,userId:integer,company:string,category:string</code></pre>

<h3>Model and Migration for the Reviews table ✨</h3>
<pre><code>sequelize model:generate --name Review --attributes userId:integer,courseId:integer,comment:text,score:integer</code></pre>

<p>With these migrations and models, we have created the necessary tables and relationships to implement the backend functionality for Connexa. Now the database is ready to be used by the REST API. Let's keep moving forward! 🚀</p>

<h2>Installation and Setup</h2>
<ol>
  <li>Clone the repository.</li>
  <li>Install Node.js and MySQL if not already installed.</li>
  <li>Install project dependencies using <code>npm install</code>.</li>
  <li>Set up your MySQL database and update the database configuration in <code>config/config.js</code>.</li>
  <li>Run database migrations using <code>npx sequelize db:migrate</code>.</li>
  <li>Seed the database with initial data using <code>npx sequelize db:seed:all</code>.</li>
  <li>Start the server using <code>npm start</code>.</li>
</ol>

<p>Feel free to customize this README according to your project's specific details and requirements. If you have any more questions or need further assistance, don't hesitate to ask! Happy coding! 😊</p>
