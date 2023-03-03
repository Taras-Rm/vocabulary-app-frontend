import { NavLink } from "react-router-dom";

const MyButton = ({ children, to, icon, ...props }) => {
  return (
    <NavLink exact to={to} style={{color: "white", marginLeft: "20px"}}>
      <div {...props} style={{display: "flex", alignItems: "center"}}>
        {icon} <div style={{marginLeft: "5px"}}>{children}</div>
      </div>
    </NavLink>
  );
};

export default MyButton;
