import styled from "styled-components";

import colors from "dakota-2-portal/src/themes/colors";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const Title = styled.Text`
  fontSize: 26;
  fontWeight: 600;
`;

export const Description = styled.Text`
  fontSize: 14;
  fontWeight: 500;
  color: ${colors.gray};
`;

export const LeftSide = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  width: 100%;
`;

export const RightSide = styled.View`
  flex: 0.5;
`;

export const Image = styled.Image`
  height: 100%;
  width: 100%;
  resizeMode: cover;
`;