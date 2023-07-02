import React from 'react';
import ReactPlayer from 'react-player';

const InstagramFeed = (props) => {
  const { id, caption, media_type, media_url } = props.feed;

  let post;

  switch (media_type) {
    case 'VIDEO':
      post = (
        <ReactPlayer
          url={media_url}
          width="100%"
          height="auto"
          controls
          playsinline
        />
      );
      break;
    case 'CAROUSEL_ALBUM':
      post = (
        <img
          width="100%"
          height="auto"
          id={id}
          src={media_url}
          alt={caption}
        />
      );
      break;
    default:
      post = (
        <img
          width="100%"
          height="auto"
          id={id}
          src={media_url}
          alt={caption}
        />
      );
  }

  return <React.Fragment>{post}</React.Fragment>;
};

export default InstagramFeed;
