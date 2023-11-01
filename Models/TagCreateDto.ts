export interface ITagCreateDto {
    name: string;
    color_hex: string;
}

export class TagCreateDto implements ITagCreateDto {
    constructor(tag: Partial<ITagCreateDto>) {
        Object.assign(tag);
    }

    name = '';
    color_hex = '';
}
