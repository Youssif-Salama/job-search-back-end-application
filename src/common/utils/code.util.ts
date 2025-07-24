export class CodeUtilService {
    codeStart = "drs";
    codeEnd = `${new Date().getFullYear()}${new Date().getMonth() + 1}`;

    makeAfliateCode(data: {
        id: number;
        fullName: {
            fname: string;
            lname: string;
        };
    }) {
        const fullNameAsString = data.fullName.fname + data.fullName.lname;
        const parsedFullName = fullNameAsString.split("");
        const randomNo = Math.floor(Math.random() * 10000);
        const uniqueLetters = [...new Set(parsedFullName)];
        const nameCode = uniqueLetters.join("");

        const code = `${this.codeStart}${nameCode}${randomNo}${this.codeEnd}`;
        return code;
    }
}
