import React from "react";
import Card from "./card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";

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

                    <img
                        className="size-10"
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt=""
                    />
                    <p>{Math.round(day.temp.day)}°C</p>
                    <p className="text-gray-500/75">
                        {Math.round(day.temp.min)}°C
                    </p>
                    <p className="text-gray-500/75">
                        {Math.round(day.temp.max)}°C
                    </p>
                </div>
            ))}

            {/* {JSON.stringify(data?.daily).slice(0, 100)} */}
        </Card>
    );
}
