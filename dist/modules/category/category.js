"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const category_controller_1 = require("./category.controller");
describe('CategoryController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [category_controller_1.CategoryController],
        }).compile();
        controller = module.get(category_controller_1.CategoryController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=category.js.map