import { IpcMainInvokeEvent } from "electron";
import {load, Root} from "protobufjs";
import * as path from "path";

const protoParseFile = async (event: IpcMainInvokeEvent, dir:string, file: string) => {
    (Root as any).prototype.resolvePath = (origin:string, target:string) => {
        if (origin == "") return target;
        return path.join(dir, target);
    }
    console.log("proto:parseFile", event, dir, file);
    const loaded = await load(file);

    console.log(loaded.resolve());
    console.log(loaded);

    return loaded.toJSON();
}

export default protoParseFile;
