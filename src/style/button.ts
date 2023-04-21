import * as color from "style/color";
import * as font from "style/font";

export const basicColor = `
  border-radius: 8px;
  border: none;
  background-color: ${color.darkMain};

  ${font.inBtn}
  color: white;

  cursor: pointer;
`;

export const mini = `
  ${basicColor}
  
  width: 40px;
  height: 25px;
`;
