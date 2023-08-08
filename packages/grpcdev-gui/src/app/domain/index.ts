export namespace domain {
  export namespace grpc {
    export interface Field {
      name: string;
      type: string | Message;
      repeated: boolean;
      index: number;
      comment: string;
    }

    export interface Message {
      package: Package;
      name: string;
      fields: Field[];
      comments: string;
    }

    export interface Method {
      name: string;
      fullName: string;
      requestType?: Message;
      responseType?: Message;
      comments: string | null;
    }

    export interface Service {
      package: Package;
      name: string;
      definition: string;
      methods: Method[];
      comments: string | null;
    }

    export interface Package {
      parent: Package | null;
      name: string;
      services: Service[];
    }
  }

  export interface GRPCRequest {
    id: string;
    name: string;
    reference: string;
    selected?: boolean;
  }

  export interface SidebarEntry {
    id: string;
    name: string;
    collapsed?: boolean;
    items: SidebarItems;
  }

  export type SidebarItem = SidebarEntry | GRPCRequest;

  export type SidebarItems = SidebarItem[];

  export interface File {
    baseName: string;
    extension: string;
    path: string;
    services: grpc.Service[];
  }
}
