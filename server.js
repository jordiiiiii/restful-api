const config = require("./config");
const app = require("./app");
// // LISTEN FOR REQUESTS
app.listen(config.PORT, () => console.log("Server Up and Running"));
