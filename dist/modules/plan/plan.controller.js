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
exports.PlanController = void 0;
const common_1 = require("@nestjs/common");
const plan_dto_1 = require("../../shared/dtos/plan.dto");
const plan_service_1 = require("./plan.service");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const localization_interceptor_1 = require("../../common/interceptors/localization.interceptor");
let PlanController = class PlanController {
    planService;
    constructor(planService) {
        this.planService = planService;
    }
    addPlan(data, req) {
        const { price } = data;
        if (price.en !== price.ar) {
            throw new common_1.BadRequestException('price and price_ar should be same');
        }
        return this.planService.addPlan({ ...data, lsUpBy: req['user']?.id });
    }
    updatePlan(id, data, req) {
        if (data.price?.en !== data.price?.ar) {
            throw new common_1.BadRequestException('price and price_ar should be same');
        }
        return this.planService.updatePlan({ ...data, lsUpBy: req['user']?.id }, +id);
    }
    deletePlan(id) {
        return this.planService.deletePlan(+id);
    }
    deleteAllPlans() {
        return this.planService.deleteAllPlans();
    }
    getAllPlans(query, req) {
        return this.planService.getAllPlans(+query.page, +query.limit, req['localeCode']);
    }
    getOnePlan(id, req) {
        return this.planService.getOnePlan(+id, req['localeCode']);
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.addPlanDto, Request]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "addPlan", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: Number }),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, plan_dto_1.updatePlanDto,
        Request]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "updatePlan", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: Number }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "deletePlan", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "deleteAllPlans", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(localization_interceptor_1.default),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiQuery)({ name: 'page', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: true, type: Number }),
    (0, swagger_1.ApiHeader)({
        name: 'locale-code',
        description: 'The language code (e.g., en, ar)',
        required: false,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "getAllPlans", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(localization_interceptor_1.default),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiHeader)({
        name: 'locale-code',
        description: 'The language code (e.g., en, ar)',
        required: false,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Request]),
    __metadata("design:returntype", Promise)
], PlanController.prototype, "getOnePlan", null);
exports.PlanController = PlanController = __decorate([
    (0, common_1.Controller)('plan'),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map