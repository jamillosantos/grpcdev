import * as monaco from "monaco-editor";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import { useCallback, useEffect } from "react";
import {
  PlusIcon,
  XCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/20/solid";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import Dropdown from "../../components/Dropdown";
import { toDomainFile } from "../../app/transformer/protobuf";
import ipconn from "../../ipconn";
import WorkspaceSidebar from "../../components/WorkspaceSidebar";
import RequestSelector from "../../components/RequestTab/RequestSelector";
import {useWorkspace} from "../../app/features/workspace/store";

loader.config({ monaco });

const Main = () => {

  const {addServices} = useWorkspace();

  const mountHandler = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: "http://myserver/foo-schema.json",
            fileMatch: ["*"],
            schema: {
              type: "object",
              properties: {
                p1: {
                  enum: ["v1", "v2"],
                },
                p2: {
                  $ref: "http://myserver/bar-schema.json",
                },
              },
            },
          },
        ],
      });
    },
    []
  );

  const handleProtoParseFileClick = useCallback(async () => {
    const r = await ipconn.proto.parseFile(
      "/Users/jota/Code/setare/protorepo/proto",
      "/Users/jota/Code/setare/protorepo/proto/setare/rpc/users/v1/usersservice.proto"
    );
    const domainFile = toDomainFile(r);
    addServices(domainFile.services);
  }, []);

  return (
    <div className="flex min-h-screen select-none">
      <div className="flex flex-shrink-0 w-64 border-r flex-col bg-gray-100 divide-y">
        <div>
          HEADER!
          <hr />
          <button
            className="bg-red-500 text-white rounded px-3 py-2 m-3"
            onClick={handleProtoParseFileClick}
          >
            LOAD
          </button>
        </div>
        <div className="flex p-2 space-x-2">
          <div className="flex flex-grow">
            <input
              type="text"
              className="w-full rounded-full border px-3 py-1 text-gray-500 text-sm"
              placeholder="Filter"
            />
          </div>
          <button className="rounded-full p-1 bg-sky-500">
            <PlusIcon className="w-6 text-white" />
          </button>
        </div>
        <WorkspaceSidebar />
      </div>
      <div className="flex direction-col flex-col flex-1">
        <div className="flex bg-gray-100 justify-between">
          <ul className="flex space-x-1 pt-5 px-3 text-sm">
            <li className="px-3 py-1 pr-1 bg-white rounded-t border-t-2 border-b-1 border-b-white border-t-sky-500 z-10 flex">
              Content 1 <XCircleIcon className="h-5 ml-1" aria-hidden="true" />
            </li>
            <li className="px-3 py-1 bg-white opacity-50 rounded-t border-t-4 border-b-1 border-b-white border-t-transparent">
              Content 2
            </li>
            <li className="px-3 py-1 bg-white opacity-50 rounded-t border-t-4 border-b-1 border-b-white border-t-transparent">
              Content 3
            </li>
          </ul>
          <nav className="flex p-2 space-x-2">
            <Dropdown label="Environment" />
            <button className="p-2 rounded-md hover:bg-gray-200">
              <Cog6ToothIcon className="w-5" />
            </button>
          </nav>
        </div>
        <div className="py-2 px-3 border-t mt-[-1px] flex justify-between">
          <div className="flex flex-row flex-wrap text-sm space-x-1">
            <div className="flex items-center font-bold">User Service</div>
            <div className="flex items-center text-gray-200">/</div>
            <div className="flex items-center text-gray-400">Create</div>
          </div>
          <div className="flex space-x-2">
            <span className="block px-1 text-sm rounded bg-black text-white">
              unary
            </span>
          </div>
        </div>
        <RequestSelector />
        <div className="border-t basis-full flex flex-col divide-y">
          <div className="basis-1/2 flex flex-col">
            <div>
              <ul className="flex px-2 space-x-2 text-sm">
                <li className="my-2 px-1 pb-1 border-transparent border-b-4 text-gray-400 hover:border-gray-300">
                  Docs
                </li>
                <li className="my-2 px-1 pb-1 border-sky-500 border-b-4">
                  Request
                </li>
                <li className="my-2 px-1 pb-1 border-transparent border-b-4 text-gray-400 hover:border-gray-300">
                  Metadata
                </li>
                <li className="my-2 px-1 pb-1 border-transparent border-b-4 text-gray-400 hover:border-gray-300">
                  Variables
                </li>
                <li className="my-2 px-1 pb-1 border-transparent border-b-4 text-gray-400 hover:border-gray-300">
                  Scripts
                </li>
              </ul>
            </div>
            <Editor
              height="100%"
              defaultLanguage="json"
              defaultValue={`{\n\t"name": "John Doe",\n\t"age": 42\n}`}
              onMount={mountHandler}
              options={{
                minimap: {
                  enabled: false,
                },
                scrollbar: {
                  vertical: "auto",
                },
              }}
            />
          </div>
          <div className="basis-1/2 flex flex-col">
            <div className="flex justify-between">
              <div className="text-sm text-gray-400 p-2">Response</div>
              <div className="flex space-x-4 content-center pr-2">
                <PresentationChartBarIcon className="w-5" />
                <div className="flex items-center text-xs text-gray-500">
                  Status: <span className="text-green-500 ml-2">Ok</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  Time: <span className="text-green-500 ml-2">0.3s</span>
                </div>
              </div>
            </div>
            <Editor
              height="100%"
              defaultLanguage="json"
              defaultValue={``}
              options={{
                readOnly: true,
                renderLineHighlight: "none",
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
