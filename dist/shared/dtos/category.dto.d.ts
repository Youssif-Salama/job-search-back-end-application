import { Binary } from 'typeorm';
declare class MultiLangString {
    en: string;
    ar: string;
}
declare class MultiLangText {
    en: string;
    ar: string;
}
export declare class CategoryDto {
    title: MultiLangString;
    description: MultiLangText;
}
export declare class ImgDto {
    img: Binary;
}
export declare class ImgType {
    url: string;
    public_id: string;
}
export declare class addCategoryDto extends CategoryDto {
    img: Binary;
}
export declare class updateCategoryDto extends CategoryDto {
    img: Binary;
}
export declare class CategoryFormDataDto {
    title: string;
    description: string;
}
export {};
