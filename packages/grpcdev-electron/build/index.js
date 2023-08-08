"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_devtools_installer_1 = __importStar(require("electron-devtools-installer"));
const path = __importStar(require("path"));
const menu_1 = __importDefault(require("./menu"));
const ipconn = __importStar(require("./ipconn"));
require("@electron/remote/main").initialize();
ipconn.init();
(0, menu_1.default)();
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1600,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
    require("@electron/remote/main").enable(mainWindow.webContents);
}
electron_1.app.on("ready", () => {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
    (0, electron_devtools_installer_1.default)(electron_devtools_installer_1.REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
const fs_1 = require("fs");
(0, fs_1.readFile)("/Users/jota/tmp/test", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
//# sourceMappingURL=index.js.map