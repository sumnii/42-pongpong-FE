import * as color from "style/color";
import * as font from "style/font";

export const basicColor = `
  border: 1.5px solid ${color.darkMain};
  background-color: ${color.darkMain};

  ${font.inBtn}
  color: white;

  cursor: pointer;

  :hover {
    background-color: ${color.lightMain};
    border: 1.5px solid ${color.lightMain};
    color: black;
  }

  :disabled {
    background-color: ${color.lightMain};
    border: 1.5px solid ${color.lightMain};
    color: black;
    cursor: default;
  }
`;

export const disabled = `
  background-color: ${color.lightMain};
  border: 1.5px solid ${color.lightMain};

  cursor: not-allowed;
  ${font.inBtn};
`;

export const mini = `
  ${basicColor}
  
  width: 40px;
  height: 25px;
`;
