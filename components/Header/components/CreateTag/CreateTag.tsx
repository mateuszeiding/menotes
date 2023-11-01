import React, {
    ChangeEvent,
    LegacyRef,
    forwardRef,
    useState,
    useContext,
} from 'react';
import { SwatchesPicker } from 'react-color';
import '../CreateLink/CreateLink.scss';
import { TagCreateDto } from '@/Models/TagCreateDto';
import Tag from '@/components/Tag/Tag';
import { TagsContext } from '@/context/useTagContext';
import { ITagDto, TagDto } from '@/Models/TagDto';

const CreateTag = forwardRef(function CreateLink(
    {},
    ref: LegacyRef<HTMLDivElement>
) {
    const [color, setColor] = useState('');
    const [name, setName] = useState('');
    const [disable, setDisable] = useState(false);
    const { setTags, tags } = useContext(TagsContext);

    const createTag = async () => {
        if (name && color) {
            setDisable(false);
            const payload: TagCreateDto = {
                name,
                color_hex: color,
            };

            const res = await fetch('api/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const body: ITagDto = await res.json();
            setTags([...tags, body]);
            document.dispatchEvent(new Event('closeCreateTag'));
        }
    };

    return (
        <div
            className='card'
            ref={ref}
        >
            <div className='d-flex justify-content-between'>
                <span>{'Preview -->'}</span>
                <Tag
                    text={name}
                    colorHex={color === '' ? '#23272f' : color}
                />
            </div>
            <div className='d-flex justify-content-between'>
                <div>Add new tag</div>
                <button
                    className='card-create'
                    disabled={disable}
                    onClick={createTag}
                >
                    Create
                </button>
            </div>
            <input
                className='card-input'
                type='text'
                placeholder='name'
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
                disabled={disable}
            ></input>
            <SwatchesPicker onChangeComplete={(color) => setColor(color.hex)} />
        </div>
    );
});

export default CreateTag;
