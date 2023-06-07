import React from 'react'

// type propsType = {
//     feed: {
//         id: string,
//         caption: string,
//         media_type: string,
//         media_url: string
//     }
// }

const InstagramFeed = (props /*: propsType*/) => {
    const { id, caption, media_type, media_url} = props.feed
    
    let post;

    switch (media_type) {
        case "VIDEO":
            post = (
                <video
                    width='100%'
                    height='auto' 
                    src={media_url} 
                    type="video/mp4" 
                    controls playsInline>
                </video>
            )
            break;
        case "CAROUSEL_ALBUM":
            post = (
                <img 
                    width='100%'
                    height='auto'
                    id={id} 
                    src={media_url} 
                    alt={caption} 
                />
            );
            break;
        default:
            post = (
                <img 
                    width='100%'
                    height='auto'
                    id={id} 
                    src={media_url} 
                    alt={caption} 
                />
            );
    }       

    return (
        <React.Fragment>
            {post}
        </React.Fragment>
    );
}

export default InstagramFeed;