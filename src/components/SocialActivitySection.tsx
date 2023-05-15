import styled, { css } from "styled-components";

import ISocialActivityData from "../interfaces/ISocialActivityData";
import ISocialActivityTitle from "../interfaces/ISocialActivityTitle";
import ISocialActivitySectionComponentProps from "../interfaces/ISocialActivitySectionComponentProps";

export default function SocialActivitySectionComponent(
  props: ISocialActivitySectionComponentProps
) {
  return (
    <>
      <SocialActivitySection>
        <SocialActivityIcon
          activitydata={props.activitydata || null}
          src={props.src}
          darktheme={props.darktheme}
        ></SocialActivityIcon>
        <SocialActivityTitle
          darktheme={props.darktheme}
          activitydata={props.activitydata || null}
          hashref={props.hashref}
          href={props.href ? `https://twitter.com/${props.href}` : undefined}
          target={props.target ? props.target : undefined}
        >
          {props.activitydata || "Not Available"}
        </SocialActivityTitle>
      </SocialActivitySection>
    </>
  );
}

const SocialActivitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SocialActivityIcon = styled.img<ISocialActivityData>`
  ${(props) => css`
    opacity: ${props.activitydata ? "1" : "0.5"};
    filter: brightness(${props.darktheme ? "100" : null});
  `}
`;

const SocialActivityTitle = styled.a<ISocialActivityTitle>`
  ${(props) => css`
    font-size: 1.3rem;
    line-height: 1.925rem;
    color: ${props.darktheme ? "#FFFFFF" : "#4B6A9B"};
    opacity: ${props.activitydata ? "1" : "0.5"};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: ${props.hashref === "true" ? "underline" : "none"};
    }

    @media (min-width: 48em) {
      font-size: 1.5rem;
      line-height: 2.222rem;
    }
  `}
`;
