import React from 'react';
import { NavbarProps } from './types';
import { 
  NavContainer, 
  NavLink, 
  NavFlex, 
  NavLinkContainer 
} from '../../styles/navbarStyles';
import { useNavbar } from '../../hooks/useNavbar';

const Navbar: React.FC<NavbarProps> = (props) => {
  const { 
    bgColor, 
    borderColor, 
    handleLinkClick, 
    isActive 
  } = useNavbar(props);

  return (
    <NavContainer bg={bgColor} borderColor={borderColor}>
      <NavFlex>
        <NavLinkContainer>
          <NavLink 
            href="#" 
            className={isActive("Cloud Computing") ? "active" : ""}
            onClick={() => handleLinkClick("Cloud Computing")}
          >
            Cloud Computing
          </NavLink>
          <NavLink 
            href="#" 
            className={isActive("Cloud Certifications") ? "active" : ""}
            onClick={() => handleLinkClick("Cloud Certifications")}
          >
            Cloud Certifications
          </NavLink>
          <NavLink 
            href="#" 
            className={isActive("Cloud Development") ? "active" : ""}
            onClick={() => handleLinkClick("Cloud Development")}
          >
            Cloud Development
          </NavLink>
        </NavLinkContainer>
      </NavFlex>
    </NavContainer>
  );
};

export default Navbar;