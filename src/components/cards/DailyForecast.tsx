import React from "react";
import Card from "./card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";

type Props = {};

export default function DailyForecast({}: Props) {
    const { data, isLoading, error } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 50, lon: 50 }),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching weather</div>;
    return (
        <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
            {data?.daily.map((day) => (
                <div key={day.dt} className="flex justify-between">
                    <p className="w-9">
                        {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                            weekday: "short",
                        })}
                    </p>

                    <WeatherIcon icon={day.weather[0].icon} />
                    <p>{Math.round(day.temp.day)}°C</p>
                    <p className="text-gray-500/75">
                        {Math.round(day.temp.min)}°C
                    </p>
                    <p className="text-gray-500/75">
                        {Math.round(day.temp.max)}°C
                    </p>
                </div>
            ))}
        </Card>
    );
}
