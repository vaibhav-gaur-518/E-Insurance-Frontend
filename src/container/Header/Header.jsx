import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { images } from "../../constants";
import "./Header.scss";

const scaleVariants = {
  whileInView:{
    scale:[0,1],
    opacity: [0,1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
} 

const Header = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Welcome To Our Web App Here We Care About Everyone"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(100 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
      // tick2();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);
    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <div id="home" className="app__header app__flex app__container">
      <motion.div
        whileInView={{ x: [-700, -600], opacity: [0, 1] }}
        transition={{ duration: 2 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className=" app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text" style={{color:"#f3f33f"}}>Hello, Welcome To</p>
              <h1 className="head-text" style={{color:"#f3f33f"}}>Insta Insurance Web App</h1>
            </div>
          </div>
          <div className="app__flex">
            <p className="p-text" style={{color:"#f3f33f"}}>{text}</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
export default Header