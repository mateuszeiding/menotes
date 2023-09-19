import Tag from './components/Tag/Tag';
import { TagStateEnum } from './components/Tag/TagStateEnum';

export default function App() {
    return (
        <>
            <Tag
                colorHex='#FF322F'
                text='test'
                state={TagStateEnum.Active}
            />
        </>
    );
}
