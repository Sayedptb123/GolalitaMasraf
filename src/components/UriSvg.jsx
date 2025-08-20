import { SvgXml } from "react-native-svg";

import { useEffect, useState } from "react";
import base64 from "react-native-base64";
import { useSelector } from "react-redux";

const getBasse64SvgImg = (icon) => {
  let finalbase64String = "";
  finalbase64String = base64.decode(icon);

  return finalbase64String;
};
const UriSvg = ({ url }) => {
  const [imgXml, setImgXml] = useState("");
  const parentCategories = useSelector(
    (state) => state.merchantReducer.parentCategories
  );

  const fill = "red";
  const stroke = "red";
  const pieceSize = 25;

  useEffect(() => {
    getImgXml();
  }, [parentCategories]);

  const getImgXml = async () => {
    // const svg = await getTestSvg();
    // console.log(svg, "svg");
    setImgXml(parentCategories?.[0]?.x_gif_image);
  };

  if (!imgXml) {
    return null;
  }

  const iconText = getBasse64SvgImg(imgXml);

  //   const xml = iconText
  //     ?.replace(/fill="#[0-9a-f]{6}"/g, `fill="${fill}"`)
  //     ?.replace(/stroke="#[0-9a-f]{6}"/g, `stroke="${stroke}"`)
  //     ?.replace(/fill=(["'])(?:(?=(\\?))\2.)*?\1/g, `fill="${fill}"`)
  //     ?.replace(/stroke=(["'])(?:(?=(\\?))\2.)*?\1/g, `stroke="${stroke}"`);

  return <SvgXml xml={iconText} width={pieceSize} height={pieceSize} />;
};

export default UriSvg;
