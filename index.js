const express = require('express');
const app = express();
const { typeError } = require('./middleware/error');
const PORT = 3000;

app.use(express.json())
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));

app.use(typeError);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));