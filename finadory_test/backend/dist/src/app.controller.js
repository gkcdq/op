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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const Datagouv_service_ts_js_1 = require("./script/datagouv/Datagouv.service.ts.js");
const scriptCache_js_1 = require("./script/scriptCache.js");
let AppController = class AppController {
    datagouv;
    scriptCache;
    constructor(datagouv, scriptCache) {
        this.datagouv = datagouv;
        this.scriptCache = scriptCache;
    }
    top() {
        return this.datagouv.top5publicationsTab;
    }
    brief() {
        return this.scriptCache.getBriefs();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "top", null);
__decorate([
    (0, common_1.Get)('brief'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "brief", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [Datagouv_service_ts_js_1.DatagouvIngestService, scriptCache_js_1.ScriptCache])
], AppController);
//# sourceMappingURL=app.controller.js.map