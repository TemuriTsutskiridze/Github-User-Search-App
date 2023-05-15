import { GlobalStyles } from "./components/Globals";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import DarkThemeIcon from "./assets/icon-moon.svg";
import LightThemeIcon from "./assets/icon-sun.svg";
import SearchIcon from "./assets/icon-search.svg";
import LocationIcon from "./assets/icon-location.svg";
import WebsiteIcon from "./assets/icon-website.svg";
import TwitterIcon from "./assets/icon-twitter.svg";
import CompanyIcon from "./assets/icon-company.svg";

import IGithubUserData from "./interfaces/IGithubUserData";
import IThemeToggle from "./interfaces/IThemeToggle";
import ISearchInput from "./interfaces/ISearchInput";

import ActivityInfoComponent from "./components/ActivityInfo";
import SocialActivitySectionComponent from "./components/SocialActivitySection";

function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<null | IGithubUserData>(null);
  const [user, setUser] = useState<null | string>(null);

  const getGithubUserData = async (user: string | null) => {
    try {
      const url = "https://api.github.com/users/" + user;
      const response = await axios.get(url);
      const data: IGithubUserData = response.data;
      setData(data);
      setError(false);
      console.log(data);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const getDate = (date: string) => {
    const dateObj = new Date(date);
    const dateString = dateObj.toDateString();
    const [, month, day, year] = dateString.split(" ");
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    getGithubUserData("octocat");
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("THEME");
    setDarkTheme(storedTheme ? JSON.parse(storedTheme) : false);
  }, []);

  useEffect(() => {
    localStorage.setItem("THEME", JSON.stringify(darkTheme));
  }, [darkTheme]);

  return (
    <>
      <GlobalStyles darktheme={darkTheme} />
      <Header>
        <Logo darktheme={darkTheme}>devfinder</Logo>
        <ThemeToggleContainer>
          <ThemeToggleText darktheme={darkTheme}>
            {darkTheme ? "LIGHT" : "DARK"}
          </ThemeToggleText>
          <ThemeToggleImage
            src={!darkTheme ? DarkThemeIcon : LightThemeIcon}
            onClick={() => {
              setDarkTheme(!darkTheme);
            }}
          ></ThemeToggleImage>
        </ThemeToggleContainer>
      </Header>

      <SearchContainer darktheme={darkTheme}>
        <SearchInput
          placeholder="Search GitHub username…"
          darktheme={darkTheme}
          searchicon={SearchIcon}
          value={user || ""}
          onChange={(event) => setUser(event.target.value)}
        ></SearchInput>
        <SearchButton
          onClick={() => {
            if (user === "" || user === null) {
              return;
            }
            getGithubUserData(user);
            setUser("");
          }}
        >
          Search
        </SearchButton>
        {error ? <UserError>No results</UserError> : null}
      </SearchContainer>

      <MainContainer darktheme={darkTheme}>
        <MainInfoContainer>
          <UserProfileImage
            src={data?.avatar_url || undefined}
          ></UserProfileImage>
          <MainInfo>
            <NameAndTagContainer>
              <UserName darktheme={darkTheme}>{data?.name}</UserName>
              <UserTag>{"@" + data?.login}</UserTag>
            </NameAndTagContainer>
            <CreatedAt darktheme={darkTheme}>
              {data ? getDate(data.created_at) : null}
            </CreatedAt>
          </MainInfo>
        </MainInfoContainer>

        <Bio darktheme={darkTheme}>
          {data?.bio || "This profile has no bio"}
        </Bio>

        <Avtivity darktheme={darkTheme}>
          <ActivityInfoComponent
            darktheme={darkTheme}
            title={"Repos"}
            data={data?.public_repos}
          />
          <ActivityInfoComponent
            darktheme={darkTheme}
            title={"Followers"}
            data={data?.followers}
          />
          <ActivityInfoComponent
            darktheme={darkTheme}
            title={"Following"}
            data={data?.following}
          />
        </Avtivity>

        <SocialActivity>
          <SocialActivitySectionContainer>
            <SocialActivitySectionComponent
              activitydata={data?.location || null}
              src={LocationIcon}
              darktheme={darkTheme}
              hashref={"false"}
              href={undefined}
              target={undefined}
            />
            <SocialActivitySectionComponent
              activitydata={data?.blog || null}
              src={WebsiteIcon}
              darktheme={darkTheme}
              hashref={"true"}
              href={data?.blog}
              target="_blank"
            />
          </SocialActivitySectionContainer>

          <SocialActivitySectionContainer>
            <SocialActivitySectionComponent
              activitydata={data?.twitter_username || null}
              src={TwitterIcon}
              darktheme={darkTheme}
              hashref={"true"}
              href={data?.twitter_username}
              target="_blank"
            />
            <SocialActivitySectionComponent
              activitydata={data?.company || null}
              src={CompanyIcon}
              darktheme={darkTheme}
              hashref={"false"}
              href={undefined}
              target={undefined}
            />
          </SocialActivitySectionContainer>
        </SocialActivity>
      </MainContainer>
    </>
  );
}

const Header = styled.div`
  width: 32.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 48em) {
    width: 57.3rem;
  }

  @media (min-width: 90em) {
    width: 73rem;
  }
`;

const Logo = styled.h1<IThemeToggle>`
  ${(props) => css`
    font-size: 2.6rem;
    line-height: 1.5em;
    color: ${!props.darktheme ? "#222731" : "#FFFFFF"};
    font-weight: 700;
  `}
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const ThemeToggleText = styled.p<IThemeToggle>`
  ${(props) => css`
    font-size: 1.3rem;
    line-height: 1.5em;
    color: ${!props.darktheme ? "#4B6A9B" : "#FFFFFF"};
    font-weight: 700;
    letter-spacing: 2.5px;
  `}
`;

const ThemeToggleImage = styled.img`
  cursor: pointer;
`;

const SearchContainer = styled.div<IThemeToggle>`
  ${(props) => css`
    width: 32.7rem;
    padding: 0.65rem 0.7rem 0.75rem 1.6rem;
    display: flex;
    border-radius: 15px;
    background-color: ${!props.darktheme ? "#FEFEFE" : "#1E2A47"};
    box-shadow: ${!props.darktheme
      ? "0px 16px 30px -10px rgba(70, 96, 187, 0.198567)"
      : null};
    margin-top: 3.5rem;
    position: relative;

    @media (min-width: 48em) {
      width: 57.3rem;
      padding: 0.95rem 1rem 0.95rem 3.2rem;
    }

    @media (min-width: 90em) {
      width: 73rem;
    }
  `}
`;

const SearchInput = styled.input<ISearchInput>`
  ${(props) => css`
    width: 100%;
    font-size: 1.3rem;
    line-height: 2.5rem;
    color: ${!props.darktheme ? "#222731" : "#FFFFFF"};
    caret-color: ${!props.darktheme ? "#222731" : "#FFFFFF"};
    background-color: ${!props.darktheme ? "#FEFEFE" : "#1E2A47"};
    background-image: url(${props.searchicon});
    background-repeat: no-repeat;
    background-size: 2rem 2rem;
    background-position: top 50% left 0;
    border: none;
    outline: none;
    padding: 0 1rem 0 3rem;

    &::placeholder {
      color: ${!props.darktheme ? "#4B6A9B" : "#FFFFFF"};
      font-size: 1.3rem;
    }

    @media (min-width: 48em) {
      font-size: 1.8rem;
      padding: 0 15rem 0 5rem;
      background-size: 2.4rem 2.4rem;

      &::placeholder {
        font-size: 1.8rem;
      }
    }
  `}
`;

const SearchButton = styled.button`
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 700;
  color: #ffffff;
  padding: 1.25rem 1.4rem 1.25rem 1.8rem;
  background-color: #0079ff;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s;

  &:hover {
    background-color: #60abff;
  }

  @media (min-width: 48em) {
    font-size: 1.6rem;
    line-height: 2.37rem;
    padding: 1.25rem 2.3rem 1.35rem 2.4rem;
  }
`;

const UserError = styled.p`
  font-size: 1.5rem;
  line-height: 2.222rem;
  color: #f74646;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 50%);

  @media (min-width: 48em) {
    top: 50%;
    width: 10ch;
    left: 34rem;
    transform: translateY(-50%);
    font-size: 1.8rem;
  }

  @media (min-width: 90em) {
    left: 48rem;
  }
`;

const MainContainer = styled.div<IThemeToggle>`
  ${(props) => css`
    width: 32.7rem;
    padding: 3.2rem 2.4rem 4.8rem;
    background-color: ${!props.darktheme ? "#FEFEFE" : "#1E2A47"};
    border-radius: 15px;
    margin-top: 5rem;
    box-shadow: ${!props.darktheme
      ? "0px 16px 30px -10px rgba(70, 96, 187, 0.198567)"
      : null};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;

    @media (min-width: 48em) {
      width: 57.3rem;
      padding: 4rem;
      margin-top: 2.4rem;
    }

    @media (min-width: 90em) {
      width: 73rem;
      padding: 4.4rem 4.8rem 5.2rem 20.2rem;
    }
  `}
`;

const MainInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.9rem;

  @media (min-width: 48em) {
    gap: 4.1rem;
  }
`;

const UserProfileImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;

  @media (min-width: 48em) {
    width: 11.7rem;
    height: 11.7rem;
  }

  @media (min-width: 90em) {
    position: absolute;
    left: 4.8rem;
    top: 4.8rem;
  }
`;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 1.3rem;
  line-height: 1.925rem;

  @media (min-width: 48em) {
    font-size: 1.6rem;
    line-height: 2.37rem;
  }

  @media (min-width: 90em) {
    flex-direction: row;
    gap: 13.8rem;
  }
`;

const NameAndTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const UserName = styled.h2<IThemeToggle>`
  ${(props) => css`
    font-size: 1.6rem;
    line-height: 2.37rem;
    font-weight: 700;
    color: ${props.darktheme ? "#FFFFFF" : "#222731"};

    @media (min-width: 48em) {
      font-size: 2.6rem;
      line-height: 3.851rem;
    }
  `}
`;

const UserTag = styled.h3`
  color: #0079ff;
`;

const CreatedAt = styled.p<IThemeToggle>`
  ${(props) => css`
    color: ${props.darktheme ? "#FFFFFF" : "#697C9A"};
  `}
`;

const Bio = styled.p<IThemeToggle>`
  ${(props) => css`
    font-size: 1.3rem;
    line-height: 2.5rem;
    color: ${props.darktheme ? "#FFFFFF" : "#4B6A9B"};
    margin-top: 3.3rem;

    @media (min-width: 48em) {
      margin-top: 2.4rem;
      font-size: 1.5rem;
    }

    @media (min-width: 90em) {
      margin-top: 2rem;
    }
  `}
`;

const Avtivity = styled.div<IThemeToggle>`
  ${(props) => css`
    width: 100%;
    padding: 1.8rem 1.4rem 1.9rem 1.5rem;
    border-radius: 10px;
    background-color: ${props.darktheme ? "#141D2F;" : "#F6F8FF"};
    margin-top: 2.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 48em) {
      padding: 1.5rem 9.6rem 1.7rem 3.2rem;
    }
  `}
`;

const SocialActivity = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 2.4rem;
  width: 20rem;

  @media (min-width: 48em) {
    width: 45rem;
    gap: 6.5rem;
  }
`;

const SocialActivitySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default App;
