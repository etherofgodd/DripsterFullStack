import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </div>
  );
};

Meta.defaultProps = {
  title: "Welcome to Dripster | Home",
  description: "We sell the best products for cheap prices",
  keywords: "drip, get the best quality products to drip all day",
};

export default Meta;
