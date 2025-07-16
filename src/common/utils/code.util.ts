export class CodeUtilService {
    codeStart = "#drs#";
    codeEnd = new Date().getFullYear + "-" + new Date().getMonth;

    makeAfliateCode(data: {
        id: number, fullName: {
            fname: string, lname: string
        }
    }) {
        const fullNameAsString = data.fullName.fname + data.fullName.lname;
        const parsedFullName = fullNameAsString.split("");
        const randomNo = (Math.random()) * 10;
        let fullName = [...new Set(parsedFullName)];
        fullName.join(`${randomNo}`);

        let code = this.codeStart + fullName + this.codeEnd;
        return code;
    }
}