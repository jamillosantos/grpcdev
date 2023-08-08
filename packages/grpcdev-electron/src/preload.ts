const {ipcRenderer, contextBridge} = require('electron');

const protoParseFile = async (dir: string, file: string) => {
    return await ipcRenderer.invoke("proto:parseFile", dir, file);
}

const ipconn = {
    proto: {
        parseFile: protoParseFile,
    }
}

contextBridge.exposeInMainWorld('ipconn', ipconn);