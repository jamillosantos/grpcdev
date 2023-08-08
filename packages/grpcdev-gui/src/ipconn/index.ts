import { Root } from "protobufjs";

const wipconn = (window as any).ipconn;

const protoParseFile = async (dir: string, file: string) => {
    const r = await wipconn.proto.parseFile(dir, file);
    return Root.fromJSON(r);
}

const ipconn = {
    proto: {
        parseFile: protoParseFile,
    }
}

export default ipconn;