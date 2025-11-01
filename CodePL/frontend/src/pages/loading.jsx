import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="stars">
        {/* Stars */}
        <div className="box-of-star1">{createStars()}</div>
        <div className="box-of-star2">{createStars()}</div>
        <div className="box-of-star3">{createStars()}</div>
        <div className="box-of-star4">{createStars()}</div>
      </div>

      {/* Astronaut */}
      <div data-js="astro" className="astronaut">
        <div className="head" />
        <div className="arm arm-left" />
        <div className="arm arm-right" />
        <div className="body">
          <div className="panel" />
        </div>
        <div className="leg leg-left" />
        <div className="leg leg-right" />
        <div className="schoolbag" />
      </div>

      {/* Text below astronaut */}
      <div className="loading-text">Loading the Universe...</div>
    </StyledWrapper>
  );
};

// Helper function for stars
const createStars = () =>
  Array.from({ length: 7 }, (_, i) => (
    <div key={i} className={`star star-position${i + 1}`} />
  ));

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: radial-gradient(circle at 20% 30%, #0f172a, #000);
  overflow: hidden;
  z-index: 9999;
  color: #fff;

  /* Star animations */
  @keyframes snow {
    0% {
      opacity: 0;
      transform: translateY(0px);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateY(650px);
    }
  }

  @keyframes astronaut {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .box-of-star1,
  .box-of-star2,
  .box-of-star3,
  .box-of-star4 {
    width: 100%;
    height: 700px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }

  .box-of-star1 {
    animation: snow 5s linear infinite;
  }
  .box-of-star2 {
    animation: snow 5s -1.64s linear infinite;
  }
  .box-of-star3 {
    animation: snow 5s -2.3s linear infinite;
  }
  .box-of-star4 {
    animation: snow 5s -3.3s linear infinite;
  }

  .star {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    opacity: 0.7;
  }

  .star-position1 {
    top: 30px;
    left: 20px;
  }
  .star-position2 {
    top: 110px;
    left: 250px;
  }
  .star-position3 {
    top: 60px;
    left: 570px;
  }
  .star-position4 {
    top: 120px;
    left: 900px;
  }
  .star-position5 {
    top: 20px;
    left: 1120px;
  }
  .star-position6 {
    top: 90px;
    left: 1280px;
  }
  .star-position7 {
    top: 30px;
    left: 1480px;
  }

  .astronaut {
    width: 250px;
    height: 300px;
    position: relative;
    z-index: 11;
    animation: astronaut 6s linear infinite;
  }

  /* Astronaut parts */
  .schoolbag {
    width: 100px;
    height: 150px;
    position: absolute;
    z-index: 1;
    top: calc(50% - 75px);
    left: calc(50% - 50px);
    background-color: #94b7ca;
    border-radius: 50px 50px 0 0 / 30px 30px 0 0;
  }

  .head {
    width: 97px;
    height: 80px;
    position: absolute;
    z-index: 3;
    background: linear-gradient(to right, #e3e8eb 50%, #fbfdfa 50%);
    border-radius: 50%;
    top: 34px;
    left: calc(50% - 47.5px);
  }

  .head:after {
    content: "";
    width: 60px;
    height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 30px);
    background: linear-gradient(to bottom, #15aece 50%, #0391bf 50%);
    border-radius: 15px;
  }

  .head:before {
    content: "";
    width: 12px;
    height: 25px;
    position: absolute;
    top: calc(50% - 12.5px);
    left: -4px;
    background-color: #618095;
    border-radius: 5px;
    box-shadow: 92px 0px 0px #618095;
  }

  .body {
    width: 85px;
    height: 100px;
    position: absolute;
    z-index: 2;
    background: linear-gradient(to right, #e3e8eb 50%, #fbfdfa 50%);
    border-radius: 40px / 20px;
    top: 105px;
    left: calc(50% - 41px);
  }

  .panel {
    width: 60px;
    height: 40px;
    position: absolute;
    top: 20px;
    left: calc(50% - 30px);
    background-color: #b7cceb;
  }

  .panel:before {
    content: "";
    width: 30px;
    height: 5px;
    position: absolute;
    top: 9px;
    left: 7px;
    background-color: #fbfdfa;
    box-shadow: 0px 9px 0px #fbfdfa, 0px 18px 0px #fbfdfa;
  }

  .panel:after {
    content: "";
    width: 8px;
    height: 8px;
    position: absolute;
    top: 9px;
    right: 7px;
    background-color: #fbfdfa;
    border-radius: 50%;
    box-shadow: 0px 14px 0px 2px #fbfdfa;
  }

  .arm {
    width: 80px;
    height: 30px;
    position: absolute;
    top: 121px;
    z-index: 2;
  }

  .arm-left {
    left: 30px;
    background-color: #e3e8eb;
    border-radius: 0 0 0 39px;
  }

  .arm-right {
    right: 30px;
    background-color: #fbfdfa;
    border-radius: 0 0 39px 0;
  }

  .leg {
    width: 30px;
    height: 40px;
    position: absolute;
    z-index: 2;
    bottom: 70px;
  }

  .leg-left {
    left: 76px;
    background-color: #e3e8eb;
    transform: rotate(20deg);
  }

  .leg-right {
    right: 73px;
    background-color: #fbfdfa;
    transform: rotate(-20deg);
  }

  /* Loading Text */
  .loading-text {
    position: relative;
    z-index: 12;
    font-size: 1.3rem;
    margin-top: 2rem;
    letter-spacing: 2px;
    font-weight: 500;
    color: #a0aec0;
    animation: fade 2s infinite alternate;
  }

  @keyframes fade {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Loader;
