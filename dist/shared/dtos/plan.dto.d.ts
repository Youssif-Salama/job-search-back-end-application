declare class MultiLangString {
    en: string;
    ar: string;
}
declare class MultiLangText {
    en: string;
    ar: string;
}
declare class MultiLangPrice {
    en: number;
    ar: number;
}
export declare class addPlanDto {
    title: MultiLangString;
    description: MultiLangText;
    price: MultiLangPrice;
}
export declare class updatePlanDto {
    title: MultiLangString;
    description: MultiLangText;
    price: MultiLangPrice;
}
export {};
