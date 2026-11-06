import { OnApplicationBootstrap } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
export declare class ScriptCache implements OnApplicationBootstrap {
    private readonly prisma;
    private readonly logger;
    private brief;
    constructor(prisma: PrismaService);
    onApplicationBootstrap(): Promise<void>;
    refreshCache(): Promise<void>;
    getBriefs(): any[];
}
