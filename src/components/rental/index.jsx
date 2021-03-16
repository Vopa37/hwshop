import React from "react";
import { Icon, PlanetImg, Title, BoxTitle, BoxText } from "./styled";
import planet from "../../images/planet.svg";
import Image from "../optimizeMyImg";

const Rental = () => {
  return (
    <>
      <div className="mt-8">
        <div className="col-12 col-lg-5 float-lg-left">
          <PlanetImg src={planet} alt="Planet" />
        </div>
        <div className="col-12 col-lg-7 float-lg-left my-4">
          <Title>Co zapůjčujeme?</Title>
          <div className="mt-8">
            <div className="col-12 col-lg-6 float-lg-left my-4">
              <Icon size="85px">
                <Image alt="Apple icon" filename="appleIcon.png" />
              </Icon>
              <BoxTitle>Notebooky Apple</BoxTitle>
              <BoxText>
                Nabízíme velké množství notebooků Apple s operačním systémem
                macOS, pro profesionální práci.
              </BoxText>
            </div>
            <div className="col-12 col-lg-6 float-lg-left my-4">
              <Icon size="95px">
                <Image alt="Notebook icon" filename="notebookIcon.png" />
              </Icon>
              <BoxTitle>Notebooky jiných značek</BoxTitle>
              <BoxText>
                Máme k dispozici notebooky (DELL, HP) ostatních operačních
                systémů, předem připravené Windows stroje, ale je možné se
                domluvit i na instalaci jakékoliv Linux distribuce.
              </BoxText>
            </div>
            <div className="col-12 col-lg-6 float-lg-left my-4">
              <Icon size="85px">
                <Image alt="Projector icon" filename="projectorIcon.png" />
              </Icon>
              <BoxTitle>Projektory</BoxTitle>
              <BoxText>
                Poskytujeme projektory různých vzdáleností a rozlišení, které se
                hodí ke každé příležitosti.
              </BoxText>
            </div>
            <div className="col-12 col-lg-6 float-lg-left my-4">
              <Icon size="90px">
                <Image alt="Monitor icon" filename="monitorIcon.png" />
              </Icon>
              <BoxTitle>Monitory</BoxTitle>
              <BoxText>
                Pro potřeby profesionálních školení nabízíme monitory různých
                rozlišení.
              </BoxText>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rental;
