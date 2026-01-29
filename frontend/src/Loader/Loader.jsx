import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="section-center">
        <div className="section-path">
          <div className="globe">
            <div className="wrapper">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  z-index: 9999;

  .section-center {
    width: 100%;
    text-align: center;
  }

  .section-path {
    position: relative;
    width: 238px;
    height: 76px;
    border-radius: 35px;
    margin: 0 auto;
    background-color: #e6e6e6;
    box-shadow: inset -2px 20px 10px rgba(0,0,0,.06),
                inset -2px 30px 10px rgba(0,0,0,.04);
    border: 3px groove rgba(225,225,225,0.07);
    overflow: hidden;
  }

  .globe {
    position: relative;
    width: 66px;
    height: 66px;
    margin: 2px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.65);
    animation: rotateBall 4s ease infinite;
  }

  @keyframes rotateBall {
    0% { transform: translateX(0); }
    50% { transform: translateX(162px); }
    100% { transform: translateX(0); }
  }

  .globe::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 15px #1a252f;
    opacity: 0.4;
    z-index: 1;
  }

  .globe::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 12px;
    left: 40px;
    top: 15px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    box-shadow: 0 0 14px 7px rgba(255,255,255,0.1);
    z-index: 2;
  }

  .wrapper {
    position: absolute;
    width: 528px;
    height: 528px;
    top: 0;
    left: -462px;
    animation: moveBall 4s ease infinite;
  }

  @keyframes moveBall {
    0% { left: -462px; }
    50% { left: 0; }
    100% { left: -462px; }
  }

  .wrapper span {
    position: absolute;
    width: 33px;
    height: 528px;
    background: #5c477d;
    box-shadow: inset 0 0 25px #5c487c;
  }

  .wrapper span:nth-child(even) {
    background: #503e6d;
  }

  ${Array.from({ length: 16 }).map(
    (_, i) => `
    .wrapper span:nth-child(${i + 1}) {
      left: ${i * 33}px;
    }
  `
  )}
`;

export default Loader;
