
import { useSelector } from "react-redux";
import React, { useState , useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { GiIronMask } from "react-icons/gi";
import { FaTimes, FaBars } from "react-icons/fa";
// import logo from '../../assets/vinayak.png'
// import * as ROUTES from '../../constants/routes'
import logo from "../../images/text_clear.png";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function Navbar({appDes, appDate, sosDes, sosType, setAppDes, setAppDate, setSosType, setSosDes}) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const account = useSelector((state) => state.Auth);

  const [click, setClick] = useState(false);

  const alanBtnContainer = useRef();

  useEffect(() => {
    try {
      alanBtn({
        key: '959794f6683b755cdafbf2ac0e7b47192e956eca572e1d8b807a3e2338fdd0dc/stage',
        rootEl: alanBtnContainer.current,
        onCommand: (commandData) => {
          console.log(commandData);
          if (commandData.command === 'APPO_DES') {
            setAppDes(commandData.description);
            navigate('/book_appointment')
          }
          else if (commandData.command === 'APPO_DES_DATE') {
            setAppDes(commandData.description);
            setAppDate(commandData.date);
            navigate('/book_appointment')
          }
          else if (commandData.command === 'SOS_DES') {
            setSosDes(commandData.description);
            navigate('/create_sos')
          }
          else if (commandData.command == 'SOS_TYPE') {
            console.log('create sos')
            setSosDes(commandData.description);
            setSosType(commandData.reason);
            navigate('/create_sos')
          }
          else if (commandData.command === 'GET_PRES') {
            navigate('/order_prescription')
          }
          else if (commandData.command === 'GO_BACK') {
            navigate(-1)
          }
          else if (commandData.command === 'SEARCH_MEDICINE') {
            navigate('/medicines')
          }
        }
      });
      
    } catch (error) {
      console.log(error)
    }
  }, []);

  const handleClick = () => {
    setClick(!click);
  };

  const handleLogout = () => {
    localStorage.removeItem("profile");

    navigate("/");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Nav>
        <NavBarContainer>
          <NavLogo to="/">
            <Logo src={logo} alt="" />
          </NavLogo>
          <Hamburger onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </Hamburger>
          <NavMenu onClick={handleClick} click={click}>
            <NavItem>
              <NavLinks to="/">Link 1</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/">Link 2</NavLinks>
            </NavItem>
            {/* <NavItem>
                            <NavLinks to="/">
                                Hire Me
                            </NavLinks>
                        </NavItem> */}
            <div className="mx-10" to="/login">
              {!user ? (
                <NavLinks to="/login">Login</NavLinks>
              ) : (
                <NavItem>
                  <div className="acc text-white bg-blue-400 px-2">
                    {user.fullName.slice(0, 3).toUpperCase()}
                  </div>
                  <NavLinks to='/editProfile'>Edit</NavLinks>
                </NavItem>
              )}
            </div>

            {user && (
              <NavItem>
                <NavLinks to="/" onClick={handleLogout}>
                  Logout
                </NavLinks>
              </NavItem>
            )}
          </NavMenu>
        </NavBarContainer>
      </Nav>
      <div ref={alanBtnContainer}></div>
    </React.Fragment>
  );
}

const Nav = styled.div`
  background-color: #fff;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;

const NavBarContainer = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  height: 80px;
  box-sizing: border-box;
`;

const NavLogo = styled(Link)`
  color: #000;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-self: start;
  text-decoration: none;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
`;

// const NavIcon = styled(GiIronMask)`
//     margin-right: 0.5rem;
// `;

// const NavPersonalLogo = styled.img``;

const Hamburger = styled.div`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.8rem;
  cursor: pointer;
  transform: translate(-100%, 60%);
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  left: -100%;
  background: rgba(0, 0, 0, 0.5);
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 80px;
  left: ${({ click }) => (click ? 0 : "-100%")};
  transition: all 0.5s ease;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.125rem;
`;

const NavLinks = styled(Link)`
    text-decoration: none;
    color: #fff;
    align-items: center;
    justify-content:center;
    font-weight: 600;
    height: fit-content;
    border-radius: 5px;
    letter-spacing: 0.1em;
    &:hover {
        background: rgba(130,130,130,0.5);  
    }
    text-align:center;
    padding: 2rem;
    width:100%;
    display:table;
    &:hover{
        color: #5f27cd;
        transition: all 0.3s ease-in;
    }     
    }
`;

