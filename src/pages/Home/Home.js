import React, { useEffect, useState } from 'react';
import airplaneImage from './Airplane.png'



const Airplane = ({ x, y }) => (
  <img
    src={airplaneImage}
    alt="Airplane"
    style={{
      position: "absolute",
      left: x,
      top: y,
      zIndex: 2,
      width: "150px",
      transform: "scale(2)",
    }}
  />
);

const Banner = ({ x, y, visible }) => (
  <div
    style={{
      position: "absolute",
      left: x - 150,
      top: y - 20,
      zIndex: 1,
      opacity: visible ? 1 : 0,
      transform: "scale(4)",
    }}
  >
    <svg width="300" height="40" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 20C0 20 90 -20 150 0C210 20 300 20 300 20"/>
      <text x="100" y="15" fill="black" style={{ fontWeight: "bold", fontSize: "20px", textAnchor: "middle" }}>
        Special Offer!
      </text>
      <text x="75" y="30" fill="black" style={{ fontSize: "12px", textAnchor: "middle" }}>
      Get 20% off your first purchase when you sign up today.
      </text>
    </svg>
  </div>
);

const Home = () => {
  const [airplaneX, setAirplaneX] = useState(-200); // starting position for airplane
  const [bannerVisible, setBannerVisible] = useState(false); // flag to control banner visibility
  const [bannerX, setBannerX] = useState(-350); // starting position for banner
  const [bannerY, setBannerY] = useState(0); // starting position for banner

  useEffect(() => {
    const interval = setInterval(() => {
      // update airplane position every 50ms
      setAirplaneX((x) => {
        // move airplane to the left side of the screen once it reaches the right side
        if (x >= window.innerWidth) {
          return -200;
        } else {
          return x + 5;
        }
      });

      // show banner after airplane has flown a certain distance
      if (airplaneX >= 0) {
        setBannerVisible(true);
        setBannerX(airplaneX - 150);
        setBannerY(window.innerHeight / 2 - 20);
      }

      // move banner along with the airplane once it's visible
      if (bannerVisible) {
        setBannerX(airplaneX - 150);
      }
    }, 50);

    return () => clearInterval(interval); // cleanup interval on unmount
  }, [airplaneX, bannerVisible]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Airplane x={airplaneX} y={window.innerHeight / 2 - 75} />
      <Banner x={bannerX} y={bannerY} visible={bannerVisible} />
    </div>
  );
};


export default Home;