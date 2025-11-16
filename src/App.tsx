import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import Card from "./components/cards/card";
import DailyForecast from "./components/cards/DailyForecast";

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
            <Card title="Current Weather">
                {JSON.stringify(data?.current).slice(0, 100)}
            </Card>
            <Card title="Hourly Forecast (48 Hours)">
                {JSON.stringify(data?.hourly).slice(0, 100)}
            </Card>
            <DailyForecast />
        </div>
    );
}

export default App;
