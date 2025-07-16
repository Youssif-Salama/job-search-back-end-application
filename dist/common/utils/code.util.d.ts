export declare class CodeUtilService {
    codeStart: string;
    codeEnd: string;
    makeAfliateCode(data: {
        id: number;
        fullName: {
            fname: string;
            lname: string;
        };
    }): string;
}
