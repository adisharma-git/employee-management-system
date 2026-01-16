import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-box">
        <div className="newtons-cradle">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>

        <p className="loading-text">
          Aaah<span>.</span><span>.</span><span>.</span>
        </p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .loader-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  /* Newton Cradle */
  .newtons-cradle {
    --size: 48px;
    --speed: 1.2s;
    --color: #021f54;

    display: flex;
    width: var(--size);
    height: var(--size);
  }

  .dot {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    transform-origin: center top;
  }

  .dot::after {
    content: "";
    width: 100%;
    height: 25%;
    background: var(--color);
    border-radius: 50%;
  }

  .dot:first-child {
    animation: swing var(--speed) ease-in-out infinite;
  }

  .dot:last-child {
    animation: swing2 var(--speed) ease-in-out infinite;
  }

  @keyframes swing {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(70deg); }
    50% { transform: rotate(0deg); }
  }

  @keyframes swing2 {
    0% { transform: rotate(0deg); }
    75% { transform: rotate(-70deg); }
    100% { transform: rotate(0deg); }
  }

  /* Aaah Text Animation */
  .loading-text {
    font-size: 14px;
    font-weight: 600;
    color: #021f54;
    letter-spacing: 1px;
  }

  .loading-text span {
    animation: dots 1.5s infinite;
  }

  .loading-text span:nth-child(1) { animation-delay: 0s; }
  .loading-text span:nth-child(2) { animation-delay: 0.2s; }
  .loading-text span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes dots {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export default Loader;
