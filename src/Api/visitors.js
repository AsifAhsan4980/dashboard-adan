import axios from "axios";

export const getVisitorsPerDay = () => {
    return axios.get(
        "http://localhost:3001/count"
    );
};

export const increaseVisitors = () => {
    return axios.put(
        "http://localhost:3001/count"
    );
};