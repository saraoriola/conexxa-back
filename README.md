## Connexa Backend

#**Description**

This repository contains the backend code for Connexa, a platform for online learning and networking exclusively for companies. The backend is developed using Node.js, Express, and MySQL with Sequelize.

#**Database Tables**
- Users
- Orders
- Courses
- Reviews

#**Relationships**
- One Order belongs to One User (userId references Users Table)
- One Order belongs to One Course (courseId references Courses Table)
- One Course belongs to One User (userId references Users Table)
- One Course can have Many Orders (id references courseId in Orders Table)
- One Course can have Many Reviews (id references courseId in Reviews Table)
- One Review belongs to One User (userId references Users Table)
- One Review belongs to One Course (courseId references Courses Table)

In this database design, we have established the following relationships:
- Users can have multiple Courses and can also leave multiple Reviews for Courses they have taken.
- Courses can have multiple Orders from different Users, as well as multiple Reviews.
- Orders are linked to both Users and Courses, indicating which User has purchased which Course.

#**Installation and Setup**

1. Clone the repository.
2. Install Node.js and MySQL if not already installed.
3. Install project dependencies using `npm install`.
4. Set up your MySQL database and update the database configuration in `config/config.js`.
5. Run database migrations using `npx sequelize db:migrate`.
6. Seed the database with initial data using `npx sequelize db:seed:all`.
7. Start the server using `npm start`.

Feel free to customize this README according to your project's specific details and requirements. If you have any more questions or need further assistance, don't hesitate to ask! Happy coding!


