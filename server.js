require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// **CORS BEFORE ROUTES**
app.use(cors({ origin: true, credentials: true }));


// register routes AFTER cors
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/employees', require('./employees/employee.controller'));
app.use('/departments', require('./departments/department.controller'));
app.use('/requests', require('./requests/requests.controller'));
app.use('/request-items', require('./requests/requestItem.controller'));


// swagger, error handler
app.use('/api-docs', require('_helpers/swagger'));
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
