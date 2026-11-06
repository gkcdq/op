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
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"./generated\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel publication {\n  id          String   @id\n  issuer      String?\n  isin        String?\n  cac40       Boolean  @default(false)\n  type        String?\n  subtype     String?\n  status      String?\n  relatedTo   String?  @map(\"related_to\")\n  title       String?\n  publishedAt DateTime @map(\"published_at\")\n  url         String?\n  createdAt   DateTime @default(now()) @map(\"created_at\")\n\n  @@index([publishedAt(sort: Desc)])\n  @@index([subtype])\n  @@index([issuer])\n  @@map(\"publication\")\n}\n\nmodel llmVerification {\n  id          Int      @id @default(autoincrement())\n  isin        String\n  publishedAt DateTime @map(\"published_at\")\n  documentUrl String   @map(\"document_url\")\n  model       String\n  status      String\n  briefJson   Json?    @map(\"brief_json\")\n  error       String?\n  generatedAt DateTime @default(now()) @map(\"generated_at\")\n\n  @@unique([isin, publishedAt, documentUrl, model], name: \"cle_unique\")\n  @@map(\"llm\")\n}\n",
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
config.runtimeDataModel = JSON.parse("{\"models\":{\"publication\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"issuer\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isin\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cac40\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subtype\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"relatedTo\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"related_to\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"publishedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"published_at\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"}],\"dbName\":\"publication\",\"schema\":null},\"llmVerification\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"isin\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"publishedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"published_at\"},{\"name\":\"documentUrl\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"document_url\"},{\"name\":\"model\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"briefJson\",\"kind\":\"scalar\",\"type\":\"Json\",\"dbName\":\"brief_json\"},{\"name\":\"error\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"generatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"generated_at\"}],\"dbName\":\"llm\",\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"publication.findUnique\",\"publication.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"publication.findFirst\",\"publication.findFirstOrThrow\",\"publication.findMany\",\"data\",\"publication.createOne\",\"publication.createMany\",\"publication.createManyAndReturn\",\"publication.updateOne\",\"publication.updateMany\",\"publication.updateManyAndReturn\",\"create\",\"update\",\"publication.upsertOne\",\"publication.deleteOne\",\"publication.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"publication.groupBy\",\"publication.aggregate\",\"llmVerification.findUnique\",\"llmVerification.findUniqueOrThrow\",\"llmVerification.findFirst\",\"llmVerification.findFirstOrThrow\",\"llmVerification.findMany\",\"llmVerification.createOne\",\"llmVerification.createMany\",\"llmVerification.createManyAndReturn\",\"llmVerification.updateOne\",\"llmVerification.updateMany\",\"llmVerification.updateManyAndReturn\",\"llmVerification.upsertOne\",\"llmVerification.deleteOne\",\"llmVerification.deleteMany\",\"_avg\",\"_sum\",\"llmVerification.groupBy\",\"llmVerification.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"isin\",\"publishedAt\",\"documentUrl\",\"model\",\"status\",\"briefJson\",\"error\",\"generatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"not\",\"string_contains\",\"string_starts_with\",\"string_ends_with\",\"array_starts_with\",\"array_ends_with\",\"array_contains\",\"cle_unique\",\"issuer\",\"cac40\",\"type\",\"subtype\",\"relatedTo\",\"title\",\"url\",\"createdAt\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "XhMgDywAAE8AMC0AAAQAEC4AAE8AMC8BAAAAATABAEkAITFAAEcAITQBAEkAIUoBAEkAIUsgAFAAIUwBAEkAIU0BAEkAIU4BAEkAIU8BAEkAIVABAEkAIVFAAEcAIQEAAAABACABAAAAAQAgDywAAE8AMC0AAAQAEC4AAE8AMC8BAEYAITABAEkAITFAAEcAITQBAEkAIUoBAEkAIUsgAFAAIUwBAEkAIU0BAEkAIU4BAEkAIU8BAEkAIVABAEkAIVFAAEcAIQgwAABRACA0AABRACBKAABRACBMAABRACBNAABRACBOAABRACBPAABRACBQAABRACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAMLwEAAAABMAEAAAABMUAAAAABNAEAAAABSgEAAAABSyAAAAABTAEAAAABTQEAAAABTgEAAAABTwEAAAABUAEAAAABUUAAAAABAQgAAAkAIAwvAQAAAAEwAQAAAAExQAAAAAE0AQAAAAFKAQAAAAFLIAAAAAFMAQAAAAFNAQAAAAFOAQAAAAFPAQAAAAFQAQAAAAFRQAAAAAEBCAAACwAwAQgAAAsAMAwvAQBXACEwAQBZACExQABYACE0AQBZACFKAQBZACFLIABeACFMAQBZACFNAQBZACFOAQBZACFPAQBZACFQAQBZACFRQABYACECAAAAAQAgCAAADgAgDC8BAFcAITABAFkAITFAAFgAITQBAFkAIUoBAFkAIUsgAF4AIUwBAFkAIU0BAFkAIU4BAFkAIU8BAFkAIVABAFkAIVFAAFgAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgCxUAAFsAIBYAAF0AIBcAAFwAIDAAAFEAIDQAAFEAIEoAAFEAIEwAAFEAIE0AAFEAIE4AAFEAIE8AAFEAIFAAAFEAIA8sAABLADAtAAAXABAuAABLADAvAQA1ACEwAQA4ACExQAA2ACE0AQA4ACFKAQA4ACFLIABMACFMAQA4ACFNAQA4ACFOAQA4ACFPAQA4ACFQAQA4ACFRQAA2ACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIA0sAABEADAtAAAdABAuAABEADAvAgAAAAEwAQBGACExQABHACEyAQBGACEzAQBGACE0AQBGACE1AABIACA2AQBJACE3QABHACFJAABKACABAAAAGgAgAQAAABoAIAwsAABEADAtAAAdABAuAABEADAvAgBFACEwAQBGACExQABHACEyAQBGACEzAQBGACE0AQBGACE1AABIACA2AQBJACE3QABHACECNQAAUQAgNgAAUQAgAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgCS8CAAAAATABAAAAATFAAAAAATIBAAAAATMBAAAAATQBAAAAATWAAAAAATYBAAAAATdAAAAAAQEIAAAiACAJLwIAAAABMAEAAAABMUAAAAABMgEAAAABMwEAAAABNAEAAAABNYAAAAABNgEAAAABN0AAAAABAQgAACQAMAEIAAAkADAJLwIAWgAhMAEAVwAhMUAAWAAhMgEAVwAhMwEAVwAhNAEAVwAhNYAAAAABNgEAWQAhN0AAWAAhAgAAABoAIAgAACcAIAkvAgBaACEwAQBXACExQABYACEyAQBXACEzAQBXACE0AQBXACE1gAAAAAE2AQBZACE3QABYACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAcVAABSACAWAABVACAXAABUACAoAABTACApAABWACA1AABRACA2AABRACAMLAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMAEANQAhMUAANgAhMgEANQAhMwEANQAhNAEANQAhNQAANwAgNgEAOAAhN0AANgAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAMLAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMAEANQAhMUAANgAhMgEANQAhMwEANQAhNAEANQAhNQAANwAgNgEAOAAhN0AANgAhDRUAAD4AIBYAAD4AIBcAAD4AICgAAEMAICkAAD4AIDgCAAAAATkCAAAABDoCAAAABDsCAAAAATwCAAAAAT0CAAAAAT4CAAAAAUICAEIAIQ4VAAA-ACAWAABBACAXAABBACA4AQAAAAE5AQAAAAQ6AQAAAAQ7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQBAACELFQAAPgAgFgAAPwAgFwAAPwAgOEAAAAABOUAAAAAEOkAAAAAEO0AAAAABPEAAAAABPUAAAAABPkAAAAABQkAAPQAhDxUAADoAIBYAADwAIBcAADwAIDiAAAAAATuAAAAAATyAAAAAAT2AAAAAAT6AAAAAAUKAAAAAAUMBAAAAAUQBAAAAAUUBAAAAAUaAAAAAAUeAAAAAAUiAAAAAAQ4VAAA6ACAWAAA7ACAXAAA7ACA4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQA5ACEOFQAAOgAgFgAAOwAgFwAAOwAgOAEAAAABOQEAAAAFOgEAAAAFOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAAAABQAEAAAABQQEAAAABQgEAOQAhCDgCAAAAATkCAAAABToCAAAABTsCAAAAATwCAAAAAT0CAAAAAT4CAAAAAUICADoAIQs4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQA7ACEMOIAAAAABO4AAAAABPIAAAAABPYAAAAABPoAAAAABQoAAAAABQwEAAAABRAEAAAABRQEAAAABRoAAAAABR4AAAAABSIAAAAABCxUAAD4AIBYAAD8AIBcAAD8AIDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAUJAAD0AIQg4AgAAAAE5AgAAAAQ6AgAAAAQ7AgAAAAE8AgAAAAE9AgAAAAE-AgAAAAFCAgA-ACEIOEAAAAABOUAAAAAEOkAAAAAEO0AAAAABPEAAAAABPUAAAAABPkAAAAABQkAAPwAhDhUAAD4AIBYAAEEAIBcAAEEAIDgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAEAAIQs4AQAAAAE5AQAAAAQ6AQAAAAQ7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBAQAAAAFCAQBBACENFQAAPgAgFgAAPgAgFwAAPgAgKAAAQwAgKQAAPgAgOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABQgIAQgAhCDgIAAAAATkIAAAABDoIAAAABDsIAAAAATwIAAAAAT0IAAAAAT4IAAAAAUIIAEMAIQwsAABEADAtAAAdABAuAABEADAvAgBFACEwAQBGACExQABHACEyAQBGACEzAQBGACE0AQBGACE1AABIACA2AQBJACE3QABHACEIOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABQgIAPgAhCzgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBAEEAIQg4QAAAAAE5QAAAAAQ6QAAAAAQ7QAAAAAE8QAAAAAE9QAAAAAE-QAAAAAFCQAA_ACEMOIAAAAABO4AAAAABPIAAAAABPYAAAAABPoAAAAABQoAAAAABQwEAAAABRAEAAAABRQEAAAABRoAAAAABR4AAAAABSIAAAAABCzgBAAAAATkBAAAABToBAAAABTsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAAAAAUEBAAAAAUIBADsAIQQwAQAAAAExQAAAAAEyAQAAAAEzAQAAAAEPLAAASwAwLQAAFwAQLgAASwAwLwEANQAhMAEAOAAhMUAANgAhNAEAOAAhSgEAOAAhSyAATAAhTAEAOAAhTQEAOAAhTgEAOAAhTwEAOAAhUAEAOAAhUUAANgAhBRUAAD4AIBYAAE4AIBcAAE4AIDggAAAAAUIgAE0AIQUVAAA-ACAWAABOACAXAABOACA4IAAAAAFCIABNACECOCAAAAABQiAATgAhDywAAE8AMC0AAAQAEC4AAE8AMC8BAEYAITABAEkAITFAAEcAITQBAEkAIUoBAEkAIUsgAFAAIUwBAEkAIU0BAEkAIU4BAEkAIU8BAEkAIVABAEkAIVFAAEcAIQI4IAAAAAFCIABOACEAAAAAAAABUgEAAAABAVJAAAAAAQFSAQAAAAEFUgIAAAABUwIAAAABVAIAAAABVQIAAAABVgIAAAABAAAAAVIgAAAAAQAAAAADFQAGFgAHFwAIAAAAAxUABhYABxcACAAAAAUVAA4WABEXABIoAA8pABAAAAAAAAUVAA4WABEXABIoAA8pABABAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIYGAUZGQkaGwobHAocHwodIAoeIQofIwogJQIhJgsiKAojKgIkKwwlLAomLQonLgIqMQ0rMhM"
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