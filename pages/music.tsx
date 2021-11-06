import type {NextPage} from 'next';

const Music: NextPage = () => {
  return (
    <>
      <div id="example-widget-trigger"></div>
      <iframe
        title="wedding playlist"
        src="https://open.spotify.com/embed/playlist/4noEJArU0yMx9WXMOmMl9s"
        width="500"
        height="580"
        frameBorder="0"
        allowTransparency={true}
        allow="encrypted-media"
      ></iframe>
    </>
  );
};

export default Music;
