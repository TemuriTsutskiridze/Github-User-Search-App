import styled, { css } from "styled-components";

import IThemeToggle from "../interfaces/IThemeToggle";
import IActivityInfoComponentProps from "../interfaces/IActivityInfoComponentProps";

export default function ActivityInfoComponent(
  props: IActivityInfoComponentProps
): JSX.Element {
  return (
    <>
      <ActivityInfo>
        <ActivityInfoTitle darktheme={props.darktheme}>
          {props.title}
        </ActivityInfoTitle>
        <ActivityInfoNumber darktheme={props.darktheme}>
          {props.data}
        </ActivityInfoNumber>
      </ActivityInfo>
    </>
  );
}

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;

  @media (min-width: 48em) {
    align-items: flex-start;
  }
`;

const ActivityInfoTitle = styled.p<IThemeToggle>`
  ${(props) => css`
    font-size: 1.1rem;
    line-height: 1.629rem;
    color: ${props.darktheme ? "#FFFFFF" : "#4B6A9B"};

    @media (min-width: 48em) {
      font-size: 1.3rem;
      line-height: 1.925rem;
    }
  `}
`;

const ActivityInfoNumber = styled.p<IThemeToggle>`
  ${(props) => css`
    font-size: 1.6rem;
    line-height: 2.37rem;
    color: ${props.darktheme ? "#FFFFFF" : "#2B3442"};
    font-weight: 700;

    @media (min-width: 48em) {
      font-size: 2.2rem;
      line-height: 3.258rem;
    }
  `}
`;
