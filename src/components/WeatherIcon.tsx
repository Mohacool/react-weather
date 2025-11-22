import clsx from "clsx";
import React from "react";

type Props = {
    icon: string;
    className?: string;
};

export default function WeatherIcon({ icon, className }: Props) {
    return (
        <img
            className={clsx("size-8", className)}
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
        />
    );
}
