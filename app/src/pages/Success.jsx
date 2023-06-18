import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";

const Success = () => {

  return (
    <div>
        <p>Prabens otário, acabo de me passa teu cartão de crédito!!</p>
    </div>
  );
};

export default Success;