import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class ScriptCache implements OnApplicationBootstrap
{
    private readonly logger = new Logger(ScriptCache.name);
    
    private brief: any[] = [];

    constructor(private readonly prisma: PrismaService) {}

    async onApplicationBootstrap()
    {
        await this.refreshCache();
    }

    @Cron(CronExpression.EVERY_5_MINUTES) 
    async refreshCache()
    {
        this.logger.log("Rafraîchissement du cache des brèves...");
        
        try {
            const dernieresBreves = await this.prisma.llmVerification.findMany({
                where: {
                    status: { in: ['OK', 'PARTIEL'] }
                },
                orderBy: {
                    publishedAt: 'desc'
                },
                take: 5
            });
            
            this.brief = dernieresBreves;
            this.logger.log(`Cache mis à jour avec ${this.brief.length} brèves.`);
        } catch (error) {
            this.logger.error("Erreur lors du rafraîchissement du cache", error);
        }
    }

    getBriefs(){return this.brief;}
}