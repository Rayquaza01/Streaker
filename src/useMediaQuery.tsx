// based on https://usehooks-ts.com/react-hook/use-media-query
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
    const getMatches = () => matchMedia(query).matches;

    const [matches, setMatches] = useState(getMatches);

    useEffect(() => {
        const match = matchMedia(query);
        match.addEventListener("change", () => setMatches(getMatches()));
    }, [query]);

    return matches;
}
