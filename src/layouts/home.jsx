import React, { useEffect } from "react";
import { increaseVisitors } from '../Api/visitors';
import HomeComp from "../components/Main/Home/HomeComp";

const Home = () => {
    useEffect(() => {
        increaseVisitors()
      }, [])
    return (
        <>

            <HomeComp/>

        </>
    )
}
export default Home