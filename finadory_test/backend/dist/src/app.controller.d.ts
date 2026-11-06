import { PertinenceService } from './script/datagouv/pertinence';
export declare class AppController {
    private readonly pertinence;
    constructor(pertinence: PertinenceService);
    health(): {
        status: string;
    };
    top(): import("./script/datagouv/pertinence").PublicationNotee[];
}
