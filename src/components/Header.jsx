import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
        <MenuIcon className="menu" />
      </h1>
    </header>
  );
}

export default Header;
