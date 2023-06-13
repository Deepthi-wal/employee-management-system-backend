const router = require("express").Router();

//importing apps
const employeeApp = require("./employee/employee.route");
const adminApp = require("./admin/admin.route");

//middleware for routes
router.use("/employee", employeeApp);
router.use("/admin", adminApp);

//exporting route
module.exports = router;
