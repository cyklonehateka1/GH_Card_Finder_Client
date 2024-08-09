import cardIconBlack from "../assets/card_icon_black.svg";
import cards_icon_white from "../assets/cards_icon.svg";
import logout_black from "../assets/logout_black.svg";
import logout_white from "../assets/logout_white.svg";
import reports_black from "../assets/reports_black.svg";
import reports_white from "../assets/reports_white.svg";
export interface NavItemInterface {
  link: string;
  iconWhite: string;
  iconBlack: string;
  id: number;
}

export const navData: NavItemInterface[] = [
  {
    link: "cards",
    iconWhite: cards_icon_white,
    iconBlack: cardIconBlack,
    id: 1,
  },
  {
    link: "reports",
    iconWhite: reports_white,
    iconBlack: reports_black,
    id: 2,
  },
  {
    link: "logout",
    iconWhite: logout_white,
    iconBlack: logout_black,
    id: 3,
  },
];
