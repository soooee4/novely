import {
    Favorite,
    FavoriteBorder,
    Close,
    Pets,
    Search,
  } from "@mui/icons-material";
  
  import { CODE } from "common";
  
  const _getIconComp = (type) => {
    let Component;
    switch (type) {
      case CODE.ICON.FILLHEART:
        Component = Favorite;
        break;
      case CODE.ICON.HEART:
        Component = FavoriteBorder;
        break;
      case CODE.ICON.CLOSE:
        Component = Close;
        break;
      case CODE.ICON.CAT:
        Component = Pets;
        break;
      case CODE.ICON.SEARCH:
        Component = Search;
        break;
    }
    return Component;
  };
  
  const Icons = (props) => {
    const Icon = _getIconComp(props.type);
  
    return (
      <Icon
        sx={{
          color: props.color !== undefined ? props.color : "transparent",
          ":hover": {
            cursor: "pointer",
            color: props.h_color,
          },
        }}
        type={props.type}
      />
    );
  };
  export default Icons;