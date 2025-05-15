import styled from '@emotion/styled';

// Export styled components specific to desktop nav
export const DropdownLink = styled.div<{ bgHoverColor: string }>`
  &:hover {
    background-color: ${props => props.bgHoverColor};
  }
`;

export const NavItemsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const NavLinkContainer = styled.div`
  padding: 0.5rem;
`;

export const NavLinkText = styled.span<{ primaryColor: string }>`
  font-weight: 500;
  &:hover {
    color: ${props => props.primaryColor};
  }
  transition: all 0.3s ease;
`;