import 'dotenv/config';
import { PublicationNotee } from "./pertinence";
import { PrismaService } from "../../../prisma/prisma.service";
export declare class BriefService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    genererBrief(pub: PublicationNotee): Promise<any>;
}
