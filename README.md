<h1>Course Management Project - README</h1>

<h2>Installation</h2>
<p>To install dependencies, run the following command in the terminal:</p>
<pre><code>npm install</code></pre>

<h2>Configuration</h2>
<p>Before running the project, make sure to configure the database connection in <code>config/config.json</code>.</p>

<h2>Multer - File Upload</h2>
<p>Multer is used to handle file uploads, such as user profile images or attachments in courses.</p>
<p>The Multer middleware can be found in <code>middleware/multer.js</code>, and it's configured to save files in the <code>uploads/</code> folder.</p>

<h2>CORS - Cross-Origin Resource Sharing</h2>
<p>CORS is implemented to allow requests from different domains.</p>

<h2>Endpoints</h2>
<p>The following endpoints are available:</p>
<ul>
A RELLENAR
</ul>

<h2>Models and Migrations</h2>
<p>Models and migrations are located in the <code>models/</code> and <code>migrations/</code> folders respectively.</p>
<p>To create a migration, run:</p>
<pre><code>npx sequelize-cli migration:generate --name MigrationName</code></pre>
<p>To run migrations:</p>
<pre><code>npx sequelize-cli db:migrate</code></pre>

<h2>Seeders</h2>
<p>Seeders are scripts that insert initial data into the database. Run the following commands to execute seeders:</p>
<pre><code>npx sequelize-cli db:seed:all</code></pre>
<p>Available seeders:</p>
<ul>
  <li><code>20230808085603-demo-users.js</code>: Creates example users.</li>
  <li><code>20230808085638-demo-courses.js</code>: Creates example courses.</li>
  <li><code>20230808085646-demo-categories.js</code>: Creates example categories.</li>

</ul>

<h2>Contribute</h2>
<p>All contributions are welcome! If you'd like to contribute to the project, please follow the contribution guidelines in <code>CONTRIBUTING.md</code>.</p>

<h2>License</h2>
<p>This project is under the MIT License. Refer to the <code>LICENSE</code> file for more details.</p>

