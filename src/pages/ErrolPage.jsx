import React from "react";
import { useRouteError } from "react-router";

export default function errolPage()
{
    const errol =useRouteError();
    console.log(errol);
    return(
        <>
        <h1>OOPS!</h1>
        <h3>{errol.statusText}</h3>
        </>
    )
}