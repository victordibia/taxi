/**
 * @license
 * Copyright 2019 Fast Forward Labs.
 * Written by / Contact : https://github.com/victordibia
 * NeuralQA - NeuralQA: Question Answering on Large Datasets with BERT.
 * Licensed under the MIT License (the "License");
 * =============================================================================
 */

import React from "react";
import { NavLink } from "react-router-dom";
import Icons from "../helperfunctions/Icons";
import "./header.css";

const Header = () => {
  const appName = "NYC Taxi Trip Advisor";
  const appDescription =
    "Example prototype application on predicting taxi fare/trip time with Machine Learning";
  const navlinks = [
    { label: "Fare Predictor", url: "/" },
    // { label: "docs", url: "/docs" },
    // { label: "docs", url: "/docs" },
  ];

  const navList = navlinks.map((data, i) => {
    return (
      <div
        key={"navrow" + i}
        className="navbarlinks   h-full flex flex-col mr-2  text-sm justify-center "
      >
        <NavLink exact to={data.url}>
          <span className="h-full">{data.label}</span>
        </NavLink>
      </div>
    );
  });

  return (
    <div>
      <div className="headermain" aria-label={appDescription}>
        <div className="  w-full  container-fluid   headerrow pl-1 ">
          <div className="flex  h-full">
            <div className="h-full   flex flex-col justify-center mr-2 ml-2  ">
              <a href={process.env.PUBLIC_URL + "/#"}>
                <img
                  className="h-8 w-8"
                  src={process.env.PUBLIC_URL + "/images/icon.png"}
                  alt={appDescription}
                />
              </a>
            </div>
            <div className="apptitle  flex flex-col justify-center  mr-1">
              <div className="text-white  font-semibold text-sm  iblock mr-2 ml-1">
                {" "}
                {appName}{" "}
              </div>
            </div>
            <div className="flex flex-grow">{navList}</div>
            <div className="  text-white flex flex-col justify-center  mr-3">
              <div>
                <a
                  rel="noreferrer"
                  href="https://github.com/victordibia/taxi/"
                  target="_blank"
                  className="group text-white -mt-2 inline-block   transition duration-1000 hover:text-indigo-200"
                >
                  <span className="hidden md:inline-block transform transition duration-700  group-hover:-translate-x-2 text-xs mr-2">
                    {" "}
                    Github{" "}
                  </span>

                  <Icons icon="github" size={6} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="headerboost"> </div>
    </div>
  );
};

export default Header;
