"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeUtilService = void 0;
class CodeUtilService {
    codeStart = "drs";
    codeEnd = `${new Date().getFullYear()}${new Date().getMonth() + 1}`;
    makeAfliateCode(data) {
        const fullNameAsString = data.fullName.fname + data.fullName.lname;
        const parsedFullName = fullNameAsString.split("");
        const randomNo = Math.floor(Math.random() * 10000);
        const uniqueLetters = [...new Set(parsedFullName)];
        const nameCode = uniqueLetters.join("");
        const code = `${this.codeStart}${nameCode}${randomNo}${this.codeEnd}`;
        return code;
    }
}
exports.CodeUtilService = CodeUtilService;
//# sourceMappingURL=code.util.js.map