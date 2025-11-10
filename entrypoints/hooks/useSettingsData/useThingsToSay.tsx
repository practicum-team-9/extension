import React from "react";

export const useThingsToSay = () => {
    const [thingsToSay, setThingsToSay] = React.useState<string>('Thing')

    return { thingsToSay, setThingsToSay };
}