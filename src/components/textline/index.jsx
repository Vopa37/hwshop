import React, { useState, useEffect } from "react";
import { Main, Text, Line, AnimationWrapper } from "./styled";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import rocketLight from "../../images/rocketLight.svg";
import rocketDark from "../../images/rocketDark.svg";

const TextLine = (props) => {
  const { scrollYProgress } = useViewportScroll();

  let horizontalMaxValues = 10;

  if (typeof window !== `undefined`) {
    if (window.innerWidth < 1440) {
      horizontalMaxValues = window.innerWidth / 2.2;
    } else {
      horizontalMaxValues = 650;
    }
  }

  const horizontalMovement = useTransform(
    scrollYProgress,
    [props.animationStart, props.animationEnd],
    [horizontalMaxValues, (horizontalMaxValues + 10) * -1]
  );

  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      function handleScroll() {
        const yPos = window.scrollY;
        const scrollUp = yPos < lastYPos;

        setIsScrollingUp(scrollUp);
        setLastYPos(yPos);
      }
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastYPos]);

  return (
    <>
      <Main>
        <Text color={props.textcolor}>{props.onLineText}</Text>

        <Line color={props.linecolor}>
          <AnimationWrapper>
            <motion.div style={{ horizontalMovement }}>
              <motion.div
                style={{
                  position: "relative",
                  left: horizontalMovement,
                  top: "-17px",
                  scale: 1,
                }}
              >
                <img
                  src={props.lightType === true ? rocketLight : rocketDark}
                  alt="Rocket"
                  style={{
                    transform: isScrollingUp
                      ? "rotate(50deg)"
                      : "rotate(-130deg)",
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimationWrapper>
        </Line>

        <Text
          color={props.textcolor}
          style={{ fontSize: "120%", marginTop: "10px" }}
        >
          {props.underLineText}
        </Text>
      </Main>
    </>
  );
};

export default TextLine;
