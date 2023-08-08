import { ipcMain } from "electron";
import protoParseFile from "./protoParse";

export const init = () => {
    ipcMain.handle("proto:parseFile", protoParseFile);
}
