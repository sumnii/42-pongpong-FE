import * as color from "style/color";
import * as font from "style/font";

export const basicColor = `
  border: 0;
  background-color: ${color.darkMain};

  ${font.inBtn}
  color: white;

  cursor: pointer;

  :hover {
    background-color: ${color.lightMain};
    color: black;
  }

  :disabled {
    background-color: ${color.lightMain};
    color: white;
    cursor: not-allowed;
  }
`;

export const warningColor = `
  ${basicColor};
  color: black;
  background-color: ${color.lightPink};

  :hover {
    color: white;
    background-color: ${color.lightRed};
  }
`;

export const mini = `
  ${basicColor}
  
  width: 40px;
  height: 25px;
`;
