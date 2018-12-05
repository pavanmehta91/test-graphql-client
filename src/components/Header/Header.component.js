import React from "react";
import { Query, graphql, compose } from "react-apollo";
import { GET_USER, LOGIN_POPOVER_STATUS } from "graphql/queries";
import { Navbar, NavbarBrand, NavLink, Nav } from "reactstrap";
import Loader from "components/Loader/Loader.component";
import { Link } from "react-router-dom";
import { TOGGLE_LOGIN_POPOVER } from "graphql/mutations";
import Composer from "react-composer";
import LoginPopOver from "components/Login/LoginPopover";
//const id = localStorage.getItem("userid");

class Header extends React.Component {
  render() {
    return (
      <Composer
        components={[
          <Query
            query={GET_USER}
          />,
          <Query query={LOGIN_POPOVER_STATUS} />
        ]}
      >
        {([GET_USER_RESULT, LOGIN_POPOVER_STATUS_RESULT]) => {
          const {
            error,
            loading,
            data: { user }
          } = GET_USER_RESULT;
          const {
            data: { isLoginPopOverVisible }
          } = LOGIN_POPOVER_STATUS_RESULT;
          if (error) {
            return "Some Error occured";
          }
          if (loading) {
            return <Loader />;
          }
          return (
            <Navbar color="dark" dark expand="md">
              <NavbarBrand to="/" tag={Link}>
                Q&A
              </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavLink tag={Link} to="/add-question">
                    Add Question
                </NavLink>
                {user ? (
                  <NavLink tag={Link} to="/me">
                    {user.name}
                  </NavLink>
                ) : (
                  <NavLink
                    id="nav-login"
                    className="pointer"
                    onClick={() => {
                      this.props.toggleLogin();
                      console.log("Enter Name");
                    }}
                  >
                    Enter Name
                  </NavLink>
                )}
              </Nav>
              {isLoginPopOverVisible && (
                <LoginPopOver
                  placement="bottom"
                  target="nav-login"
                  toggle={this.props.toggleLogin}
                  isOpen={isLoginPopOverVisible}
                />
              )}
            </Navbar>
          );
        }}
      </Composer>
    );
  }
}

export default compose(
  graphql(TOGGLE_LOGIN_POPOVER, {
    name: "toggleLogin"
  })
)(Header);
