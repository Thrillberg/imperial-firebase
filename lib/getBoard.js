import imperialBoardConfigs from "~/imperialBoardConfigs";
import imperial2030BoardConfigs from "~/imperial2030BoardConfigs";
import imperialAsiaBoardConfigs from "~/imperialAsiaBoardConfigs";

import imperialBoard from "~/Domain/board";
import imperial2030Board from "~/Domain/board2030";
import imperialAsiaBoard from "~/Domain/boardAsia";

export default (baseGame) => {
  let boardConfig, board;
  if (baseGame === 'imperial' || baseGame === 'imperialEurope2030') {
    boardConfig = imperialBoardConfigs;
    board = imperialBoard;
  } else if (baseGame === 'imperial2030') {
    boardConfig = imperial2030BoardConfigs;
    board = imperial2030Board;
  } else if (baseGame === 'imperialAsia') {
    boardConfig = imperialAsiaBoardConfigs;
    board = imperialAsiaBoard;
  }

  return { boardConfig, board };
}