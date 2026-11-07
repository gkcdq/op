import { DatagouvIngestService } from './script/datagouv/Datagouv.service';
import { ScriptCache } from './script/scriptCache.js';
export declare class AppController {
    private readonly datagouv;
    private readonly scriptCache;
    constructor(datagouv: DatagouvIngestService, scriptCache: ScriptCache);
    top(): import("./script/datagouv/pertinence").PublicationNotee[];
    brief(): any[];
}
