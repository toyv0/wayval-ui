import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink, Link } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  const styles = {
    menu: {
      display: "flex",
      fontSize: "17px",
      fontWeight: "500",
      width: "30%",
      justifyContent: "center",
      background: "#212E42",
      color: "#17202D",
      borderBottom: "0px",
      paddingLeft: "210px",
    },
  };

  return (
    <Menu
      mode="horizontal"
      style={styles.menu}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/mint">
        <NavLink to="/mint">✨ mint</NavLink>
      </Menu.Item>
      <Menu.Item key="/waves">
        <NavLink to="/waves">🌊 waves</NavLink>
      </Menu.Item>
      <Menu.Item key="/manage">
        <NavLink to="/manage">🏃 manage</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
