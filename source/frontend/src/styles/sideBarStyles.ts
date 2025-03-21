import { Button } from '@chakra-ui/react';
import styled from 'styled-components';
import {ContentContainerProps} from '../components/sideBar/types';

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s;
`;

export const CollapsedSidebarContainer = styled.div`
  width: 60px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s;
`;

export const SidebarTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const SidebarItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

export const ToggleButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 20px;
  &:hover {
    background-color: #444;
  }
`;

export const DrawerButton = styled(Button)`
  variant: outline;
  size: sm;
`;


export const ContentContainer = styled.div<ContentContainerProps>`
  margin-left: 250px;
  padding: 20px;
  width: calc(100% - 250px);
  transition: margin-left 0.3s, width 0.3s;

  ${({ collapsed }) =>
    collapsed &&
    `
    margin-left: 60px;
    width: calc(100% - 60px);
  `}
`;