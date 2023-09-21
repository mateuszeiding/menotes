import { ITagDto } from './TagDto';

export interface ILinkDto {
    id: number;
    name: string;
    href: string;
    tags: ITagDto[];
}

export class LinkDto implements ILinkDto {
    constructor(link: Partial<ILinkDto>) {
        Object.assign(link);
    }

    id = 0;
    name = '';
    href = '';
    tags = [];
}
