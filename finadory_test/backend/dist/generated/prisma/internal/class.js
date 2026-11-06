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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.1",
    "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Publication {\n  id          String   @id\n  issuer      String?\n  isin        String?\n  cac40       Boolean  @default(false)\n  type        String?\n  subtype     String?\n  status      String?\n  relatedTo   String?  @map(\"related_to\")\n  title       String?\n  publishedAt DateTime @map(\"published_at\")\n  url         String?\n  createdAt   DateTime @default(now()) @map(\"created_at\")\n\n  @@index([publishedAt(sort: Desc)])\n  @@index([subtype])\n  @@index([issuer])\n  @@map(\"publications\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Publication\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"issuer\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isin\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cac40\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subtype\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"relatedTo\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"related_to\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"publishedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"published_at\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"}],\"dbName\":\"publications\",\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Publication.findUnique\",\"Publication.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Publication.findFirst\",\"Publication.findFirstOrThrow\",\"Publication.findMany\",\"data\",\"Publication.createOne\",\"Publication.createMany\",\"Publication.createManyAndReturn\",\"Publication.updateOne\",\"Publication.updateMany\",\"Publication.updateManyAndReturn\",\"create\",\"update\",\"Publication.upsertOne\",\"Publication.deleteOne\",\"Publication.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"Publication.groupBy\",\"Publication.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"issuer\",\"isin\",\"cac40\",\"type\",\"subtype\",\"status\",\"relatedTo\",\"title\",\"publishedAt\",\"url\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\"]"),
    graph: "NQkQDxoAACkAMBsAAAQAEBwAACkAMB0BAAAAAR4BACsAIR8BACsAISAgACwAISEBACsAISIBACsAISMBACsAISQBACsAISUBACsAISZAAC0AIScBACsAIShAAC0AIQEAAAABACABAAAAAQAgDxoAACkAMBsAAAQAEBwAACkAMB0BACoAIR4BACsAIR8BACsAISAgACwAISEBACsAISIBACsAISMBACsAISQBACsAISUBACsAISZAAC0AIScBACsAIShAAC0AIQgeAAAuACAfAAAuACAhAAAuACAiAAAuACAjAAAuACAkAAAuACAlAAAuACAnAAAuACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAMHQEAAAABHgEAAAABHwEAAAABICAAAAABIQEAAAABIgEAAAABIwEAAAABJAEAAAABJQEAAAABJkAAAAABJwEAAAABKEAAAAABAQgAAAkAIAwdAQAAAAEeAQAAAAEfAQAAAAEgIAAAAAEhAQAAAAEiAQAAAAEjAQAAAAEkAQAAAAElAQAAAAEmQAAAAAEnAQAAAAEoQAAAAAEBCAAACwAwAQgAAAsAMAwdAQAyACEeAQAzACEfAQAzACEgIAA0ACEhAQAzACEiAQAzACEjAQAzACEkAQAzACElAQAzACEmQAA1ACEnAQAzACEoQAA1ACECAAAAAQAgCAAADgAgDB0BADIAIR4BADMAIR8BADMAISAgADQAISEBADMAISIBADMAISMBADMAISQBADMAISUBADMAISZAADUAIScBADMAIShAADUAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgCxUAAC8AIBYAADEAIBcAADAAIB4AAC4AIB8AAC4AICEAAC4AICIAAC4AICMAAC4AICQAAC4AICUAAC4AICcAAC4AIA8aAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAcACEfAQAcACEgIAAdACEhAQAcACEiAQAcACEjAQAcACEkAQAcACElAQAcACEmQAAeACEnAQAcACEoQAAeACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIA8aAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAcACEfAQAcACEgIAAdACEhAQAcACEiAQAcACEjAQAcACEkAQAcACElAQAcACEmQAAeACEnAQAcACEoQAAeACEOFQAAIAAgFgAAKAAgFwAAKAAgKQEAAAABKgEAAAAEKwEAAAAELAEAAAABLQEAAAABLgEAAAABLwEAAAABMAEAJwAhMQEAAAABMgEAAAABMwEAAAABDhUAACUAIBYAACYAIBcAACYAICkBAAAAASoBAAAABSsBAAAABSwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACQAITEBAAAAATIBAAAAATMBAAAAAQUVAAAgACAWAAAjACAXAAAjACApIAAAAAEwIAAiACELFQAAIAAgFgAAIQAgFwAAIQAgKUAAAAABKkAAAAAEK0AAAAAELEAAAAABLUAAAAABLkAAAAABL0AAAAABMEAAHwAhCxUAACAAIBYAACEAIBcAACEAIClAAAAAASpAAAAABCtAAAAABCxAAAAAAS1AAAAAAS5AAAAAAS9AAAAAATBAAB8AIQgpAgAAAAEqAgAAAAQrAgAAAAQsAgAAAAEtAgAAAAEuAgAAAAEvAgAAAAEwAgAgACEIKUAAAAABKkAAAAAEK0AAAAAELEAAAAABLUAAAAABLkAAAAABL0AAAAABMEAAIQAhBRUAACAAIBYAACMAIBcAACMAICkgAAAAATAgACIAIQIpIAAAAAEwIAAjACEOFQAAJQAgFgAAJgAgFwAAJgAgKQEAAAABKgEAAAAFKwEAAAAFLAEAAAABLQEAAAABLgEAAAABLwEAAAABMAEAJAAhMQEAAAABMgEAAAABMwEAAAABCCkCAAAAASoCAAAABSsCAAAABSwCAAAAAS0CAAAAAS4CAAAAAS8CAAAAATACACUAIQspAQAAAAEqAQAAAAUrAQAAAAUsAQAAAAEtAQAAAAEuAQAAAAEvAQAAAAEwAQAmACExAQAAAAEyAQAAAAEzAQAAAAEOFQAAIAAgFgAAKAAgFwAAKAAgKQEAAAABKgEAAAAEKwEAAAAELAEAAAABLQEAAAABLgEAAAABLwEAAAABMAEAJwAhMQEAAAABMgEAAAABMwEAAAABCykBAAAAASoBAAAABCsBAAAABCwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACgAITEBAAAAATIBAAAAATMBAAAAAQ8aAAApADAbAAAEABAcAAApADAdAQAqACEeAQArACEfAQArACEgIAAsACEhAQArACEiAQArACEjAQArACEkAQArACElAQArACEmQAAtACEnAQArACEoQAAtACELKQEAAAABKgEAAAAEKwEAAAAELAEAAAABLQEAAAABLgEAAAABLwEAAAABMAEAKAAhMQEAAAABMgEAAAABMwEAAAABCykBAAAAASoBAAAABSsBAAAABSwBAAAAAS0BAAAAAS4BAAAAAS8BAAAAATABACYAITEBAAAAATIBAAAAATMBAAAAAQIpIAAAAAEwIAAjACEIKUAAAAABKkAAAAAEK0AAAAAELEAAAAABLUAAAAABLkAAAAABL0AAAAABMEAAIQAhAAAAAAE0AQAAAAEBNAEAAAABATQgAAAAAQE0QAAAAAEAAAAAAxUABhYABxcACAAAAAMVAAYWAAcXAAgBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIYGAUZGQk"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js")));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map