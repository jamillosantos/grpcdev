"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ipcRenderer, contextBridge } = require('electron');
const protoParseFile = async (dir, file) => {
    return await ipcRenderer.invoke("proto:parseFile", dir, file);
};
const ipconn = {
    proto: {
        parseFile: protoParseFile,
    }
};
contextBridge.exposeInMainWorld('ipconn', ipconn);
//# sourceMappingURL=preload.js.map