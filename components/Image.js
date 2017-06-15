import Imgix from "react-imgix";

export default ({ src, ...props }) => {
  return (
    <Imgix
      auto={[]}
      aggressiveLoad={true}
      customParams={{ format: "jpg" }}
      src={`https://www.datocms-assets.com${src}`}
      {...props}
    />
  );
};
