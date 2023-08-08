import { Method, Namespace, ReflectionObject, Root, Service } from "protobufjs";
import { domain } from "../domain";

export function toDomainFile(root: Root): domain.File {
  const f: domain.File = {
    baseName: "baseName",
    extension: ".proto",
    path: "path",
    services: [],
  };
  console.group("toDomainFile");
  const ctx: ParseContext = {
    file: f,
    packages: [],
  };
  for (const k in root.nested!) {
    const v = root.nested[k];
    parseReflectionObject(ctx, v);
  }
  console.groupEnd();
  return f;
}

interface ParseContext {
  file: domain.File;
  packages: domain.grpc.Package[];
}

function toDomainService(): domain.grpc.Service | null {
  return null;
}

function parseReflectionObject(ctx: ParseContext, v: ReflectionObject) {
  console.group(v.name, (v as any).constructor);
  try {
    console.log(v);
    console.log((v as any).resolveAll());
    if (v instanceof Service) {
      parseService(ctx, v as Service);
    } else if (v instanceof Namespace) {
      parseNamespace(ctx, v as Namespace);
    } else {
      console.log("unknown type", v, typeof v);
    }
  } finally {
    console.groupEnd();
  }
}

function parseNamespace(ctx: ParseContext, ns: Namespace) {
  console.group("namespace", ns.name);
  try {
    const p: domain.grpc.Package = {
      parent: ctx.packages[ctx.packages.length - 1] || null,
      name: ns.name,
      services: [],
    };
    ctx.packages.push(p);
    for (const k in ns.nested!) {
      const v = ns.nested[k];
      parseReflectionObject(ctx, v);
    }
  } finally {
    console.groupEnd();
  }
}

function parseService(ctx: ParseContext, s: Service) {
  console.group("service", s.name);
  try {
    const svc: domain.grpc.Service = {
      package: ctx.packages[ctx.packages.length - 1],
      name: s.name,
      definition: s.toString(),
      methods: s.methodsArray.map((m) => parseMethod(ctx, m)),
      comments: s.comment,
    };
    ctx.file.services.push(svc);
    for (const k in s.methods) {
      const v = s.methods[k];
      parseMethod(ctx, v);
    }
  } finally {
    console.groupEnd();
  }
}

function parseMethod(ctx: ParseContext, m: Method) {
  console.group("method", m.name);
  try {
    const method: domain.grpc.Method = {
      name: m.name,
      fullName: m.fullName,
      requestType: {} as domain.grpc.Message,
      responseType: {} as domain.grpc.Message,
      comments: m.comment || null,
    };
    return method;
  } finally {
    console.groupEnd();
  }
}
