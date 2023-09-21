export interface ITagDto {
    id: number;
    name: string;
    color_hex: string;
}

export class TagDto implements ITagDto {
    constructor(tag: Partial<ITagDto>) {
        Object.assign(tag);
    }

    id = 0;
    name = '';
    color_hex = '';
}
