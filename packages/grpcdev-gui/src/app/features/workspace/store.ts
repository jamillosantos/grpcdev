import {domain} from "../../domain";
import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {ulid} from "ulid";

interface ToggleSelectedRequest {
    id: string;
    multiSelect: boolean;
}

interface Workspace {
    name: string;
    importPath: string[];
    items: domain.SidebarItems;
    services: domain.grpc.Service[];
    addServices: (services: domain.grpc.Service[]) => void;
    toggleCollapse: (id: string) => void;
    toggleSelected: (req: ToggleSelectedRequest) => void;
}

export const useWorkspace = create<Workspace>()(devtools((set) => ({
    name: "",
    importPath: [],
    items: [
        {
            id: ulid(),
            name: "Users",
            collapsed: false,
            items: [
                {
                    id: ulid(),
                    name: "Errors",
                    items: [
                        {
                            id: ulid(),
                            name: "Validation: Missing name",
                            reference: "setare.rpc.users.v1.UsersService.Create",
                        },
                        {
                            id: ulid(),
                            name: "Validation: Invalid e-mail",
                            reference: "setare.rpc.users.v1.UsersService.Create",
                        },
                    ],
                },
                {
                    id: ulid(),
                    name: "Create",
                    reference: "setare.rpc.users.v1.UsersService.Create",
                },
                {
                    id: ulid(),
                    name: "List",
                    reference: "setare.rpc.users.v1.UsersService.List",
                },
            ],
        },
    ],
    services: [
        {
            name: "setare.rpc.users.v1.UsersService",
            comments: null,
            definition: "",
            package: {
                name: "setare.rpc.users.v1",
                parent: null,
                services: [],
            },
            methods: [
                {
                    name: "Create",
                    fullName: "setare.rpc.users.v1.UsersService.Create",
                    comments: null,
                    requestType: {
                        package: {
                            parent: null,
                            name: "setare.rpc.users.v1",
                            services: [],
                        },
                        name: "setare.rpc.users.v1.CreateRequest",
                        fields: [],
                        comments: "",
                    },
                    responseType: {
                        package: {
                            parent: null,
                            name: "setare.rpc.users.v1",
                            services: [],
                        },
                        name: "setare.rpc.users.v1.CreateResponse",
                        fields: [],
                        comments: "",
                    },
                },
                {
                    name: "Update",
                    fullName: "setare.rpc.users.v1.UsersService.Update",
                    comments: null,
                    requestType: {
                        package: {
                            parent: null,
                            name: "setare.rpc.users.v1",
                            services: [],
                        },
                        name: "setare.rpc.users.v1.UpdateRequest",
                        fields: [],
                        comments: "",
                    },
                    responseType: {
                        package: {
                            parent: null,
                            name: "setare.rpc.users.v1",
                            services: [],
                        },
                        name: "setare.rpc.users.v1.UpdateResponse",
                        fields: [],
                        comments: "",
                    },
                },
                {
                    name: "Delete",
                    fullName: "setare.rpc.users.v1.UsersService.Delete",
                    comments: null,
                    requestType: {
                        package: {
                            parent: null,
                            name: "setare.rpc.users.v1",
                            services: [],
                        },
                        name: "setare.rpc.users.v1.DeleteRequest",
                        fields: [],
                        comments: "",
                    },
                    responseType: {
                        package: {
                            parent: null,
                            name: "setare.rpc.users.v1",
                            services: [],
                        },
                        name: "setare.rpc.users.v1.DeleteResponse",
                        fields: [],
                        comments: "",
                    },
                },
            ],
        },
    ],
    setWorkspaceName: (name: string) => set({name}),
    addImportPath: (path: string) => set((state) => ({importPath: [...state.importPath, path]})),
    removeImportpath: (path: string) => set((state) => ({importPath: state.importPath.filter((p) => p !== path)})),
    addServices: (services: domain.grpc.Service[]) => set((state) => ({services: [...state.services, ...services]})),
    toggleCollapse: (id: string) => {
        // set((state) => {
        //     const items = state.items.map((item) => {
        //         if (item.id === id) {
        //             item.collapsed = !item.collapsed
        //         }
        //         return item
        //     })
        //     return {items}
        // })
    },
    toggleSelected: (req: ToggleSelectedRequest) => {
        //
    },
})));


interface WalkSidebarItemsRequest {
    path?: string;
    items: domain.SidebarItems;
}

interface WalkSidebarItemsVisitor {
    path: string;
    item: domain.SidebarItem;
}

function walkSidebarItems(
    { path, items }: WalkSidebarItemsRequest,
    cb: (req: WalkSidebarItemsVisitor) => void
): boolean {
    var arrpath = [path ?? ""];
    for (const item of items) {
        arrpath.push(item.name);
        try {
            const thispath = arrpath.join("/");
            cb({
                path: thispath,
                item: item,
            });
            if (
                (item as domain.SidebarEntry).items &&
                !walkSidebarItems(
                    {
                        path: arrpath.join("/"),
                        items: (item as domain.SidebarEntry).items,
                    },
                    cb
                )
            ) {
                return false;
            }
        } finally {
            arrpath.pop();
        }
    }
    return true;
}
