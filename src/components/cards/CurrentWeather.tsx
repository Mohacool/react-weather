import React from "react";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./card";
import WeatherIcon from "../WeatherIcon";

type Props = {};

export default function CurrentWeather({}: Props) {
    const { data, isLoading, error } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 50, lon: 50 }),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching weather</div>;

    return (
        <Card
            title="Current Weather"
            childrenClassName="flex flex-col items-center"
        >
            <div className="flex flex-col gap-2 items-center">
                <h2 className="text-6xl font-semibold text-center">
                    {Math.round(data.current.temp)}°C
                </h2>
                <WeatherIcon
                    icon={data.current.weather[0].icon}
                    className="size-20"
                />
                <h3 className="capitalize text-xl">
                    {data.current.weather[0].description}
                </h3>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-xl text-center">Local Time:</p>
                <h3 className="text-4xl font-semibold">
                    {new Intl.DateTimeFormat("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        timeZone: data.timezone,
                    }).format(new Date(data.current.dt * 1000))}
                </h3>
            </div>
        </Card>
    );
}
