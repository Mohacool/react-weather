import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import Card from "./components/cards/card";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";

function App() {
    // useQuery works with a queryKey and a query function, the return from api.ts is the data
    const { data, isLoading, error } = useQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 50, lon: 50 }),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching weather</div>;

    return (
        <div className="flex flex-col gap-8">
            <CurrentWeather />
            <HourlyForecast />
            <DailyForecast />
        </div>
    );
}

export default App;
