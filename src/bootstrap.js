import cors from "cors"
import { dbConnection } from "./dbConnection.js";
import { v1Router } from "./router/v1.router.js";

export function bootstrap(app) {
    app.use(cors());
    app.use("/api/v1/", v1Router)
    dbConnection.then(() => {
        console.log("data base connected !");
        app.use((error, req, res, next) => {
            console.log(error.stack)
            const { message, status } = error;
            res.status(status || 500).json({ message });
        })
        app.listen(10000, () => {
            console.log("server is listening on port 10000!");
        })
    }).catch(error => {
        console.error(error)
    })
}