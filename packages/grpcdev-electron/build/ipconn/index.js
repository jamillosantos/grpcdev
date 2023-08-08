"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const electron_1 = require("electron");
const protoParse_1 = __importDefault(require("./protoParse"));
const init = () => {
    electron_1.ipcMain.handle("proto:parseFile", protoParse_1.default);
};
exports.init = init;
//# sourceMappingURL=index.js.map