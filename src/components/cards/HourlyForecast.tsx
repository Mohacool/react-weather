import React from "react";
import Card from "./card";
import { getWeather } from "../../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import WeatherIcon from "../WeatherIcon";

type Props = {};

export default function HourlyForecast({}: Props) {
    const { data, isLoading, error } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 50, lon: 50 }),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching weather</div>;

    return (
        <Card
            title="Hourly Forecast (48 hours)"
            childrenClassName="flex flex-row gap-8 overflow-x-scroll"
        >
            {data?.hourly.map((hour) => (
                <div className="flex flex-col gap-2 items-center p-2">
                    <p className="whitespace-nowrap">
                        {new Date(hour.dt * 1000).toLocaleTimeString(
                            undefined,
                            { hour: "numeric", minute: "2-digit", hour12: true }
                        )}
                    </p>
                    <WeatherIcon icon={hour.weather[0].icon} />
                    <p>{Math.round(hour.temp)}°C</p>
                </div>
            ))}
        </Card>
    );
}
