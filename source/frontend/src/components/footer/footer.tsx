import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Icon } from "@chakra-ui/react";
import {
  FooterContainer,
  FooterContent,
  FooterText,
  FooterLinks,
  FooterLink,
  SocialIconsContainer,
  SocialIcon
} from "../../styles/mainLayoutStyle";
import { FOOTER_LINKS, SOCIAL_LINKS, useFooterColors, getExternalLinkProps,getSocialIcon } from "./index";
import { FooterProps } from "./types";

const Footer: React.FC<FooterProps> = ({
  borderColor,
  textColor,
  primaryColor,
  bgColor,
}) => {
  // Get default colors from our hook
  const defaultColors = useFooterColors();

  // Use provided colors or defaults
  const finalBgColor = bgColor || defaultColors.bgColor;
  const finalTextColor = textColor || defaultColors.textColor;
  const finalBorderColor = borderColor || defaultColors.borderColor;
  const finalPrimaryColor = primaryColor || defaultColors.primaryColor;
  const externalLinkProps = getExternalLinkProps();

  return (
    <FooterContainer bgColor={finalBgColor} borderColor={finalBorderColor}>
      <FooterContent>
        <Box>
          <FooterText textColor={finalTextColor}>
            {defaultColors.copyrightText}
          </FooterText>
          
          <SocialIconsContainer mt={4}>
            {SOCIAL_LINKS.map((social) => (
              <SocialIcon 
                key={social.platform}
                href={social.href}
                color={finalPrimaryColor}
                {...externalLinkProps}
              >
                <Icon as={getSocialIcon(social.platform)} boxSize="20px" />
              </SocialIcon>
            ))}
          </SocialIconsContainer>
        </Box>

        <FooterLinks>
          {FOOTER_LINKS.map((link) => (
            <FooterLink
              key={link.label}
              as={RouterLink}
              to={link.href}
              primaryColor={finalPrimaryColor}
            >
              {link.label}
            </FooterLink>
          ))}
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;