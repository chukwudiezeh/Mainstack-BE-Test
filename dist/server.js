"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
//import routes
const auth_1 = __importDefault(require("./routes/auth"));
const product_1 = __importDefault(require("./routes/product"));
dotenv_1.default.config();
const app = (0, express_1.default)();
let port = 4000;
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/products', product_1.default);
app.get('/', (req, res) => {
    res.status(200).send({ success: true, message: 'Hello, Chukwudi\'s Store front API' });
});
app.listen(port, () => {
    // console.log(`Server is running on http://localhost:${port}`);
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
