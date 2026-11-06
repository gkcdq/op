"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const publications_service_1 = require("./publications/publications.service");
const pertinence_1 = require("./script/api/datagouv/pertinence");
function toInt(value, name) {
    if (value === undefined || value === '')
        return undefined;
    const n = Number(value);
    if (!Number.isInteger(n))
        throw new common_1.BadRequestException(`"${name}" doit être un entier`);
    return n;
}
let AppController = class AppController {
    publications;
    pertinence;
    constructor(publications, pertinence) {
        this.publications = publications;
        this.pertinence = pertinence;
    }
    health() {
        return { status: 'ok' };
    }
    list(issuer, subtype, from, to, limit, offset) {
        return this.publications.list({
            issuer,
            subtype,
            from,
            to,
            limit: toInt(limit, 'limit'),
            offset: toInt(offset, 'offset'),
        });
    }
    subtypes() {
        return this.publications.subtypes();
    }
    top() {
        return this.pertinence.getTop();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "health", null);
__decorate([
    (0, common_1.Get)('publications'),
    __param(0, (0, common_1.Query)('issuer')),
    __param(1, (0, common_1.Query)('subtype')),
    __param(2, (0, common_1.Query)('from')),
    __param(3, (0, common_1.Query)('to')),
    __param(4, (0, common_1.Query)('limit')),
    __param(5, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('publications/subtypes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "subtypes", null);
__decorate([
    (0, common_1.Get)('top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "top", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [publications_service_1.PublicationsService, pertinence_1.PertinenceService])
], AppController);
//# sourceMappingURL=app.controller.js.map