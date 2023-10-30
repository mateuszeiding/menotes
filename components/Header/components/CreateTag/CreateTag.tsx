// import { TagsContext } from "@/context/useTagContext";
// import React, { LegacyRef, forwardRef, useContext, useState } from "react";

// const CreateTag = forwardRef(function CreateLink(
//     {},
//     ref: LegacyRef<HTMLDivElement>
// ) {
//     const [color, setColor] = useState('');
//     const { tags } = useContext(TagsContext);
//     const [disable, setDisable] = useState(false);

//     const createLink = () => {
//         if (name && link && selectedTagIds) {
//             setDisable(false);
//             const payload: LinkCreateDto = {
//                 name,
//                 href: link,
//                 tagIds: selectedTagIds,
//             };

//             fetch('api/links', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             }).then(() => document.dispatchEvent(new Event('closeCreate')));
//         }
//     };

//     return (
//         <div
//             className='card'
//             ref={ref}
//         >
//             <button
//                 className='card-create'
//                 disabled={disable}
//                 onClick={createLink}
//             >
//                 Create
//             </button>
//             <div
//                 className={['tag-container', disable && 'user-events-none']
//                     .filter(Boolean)
//                     .join(' ')}
//             >
//                 <div className='card-tags'>
//                     {tags
//                         .filter((t) => selectedTagIds.includes(t.id))
//                         .map((tag) => (
//                             <Tag
//                                 key={tag.id}
//                                 colorHex={tag.color_hex}
//                                 text={tag.name}
//                                 state={TagStateEnum.None}
//                             />
//                         ))}
//                 </div>
//             </div>
//         </div>
//     );
// });

// export default CreateTag;
