import { createContext } from 'react';

const LoadContext = createContext({
    loaded: false,
    setLoaded: (value: boolean) => {},
});

export default LoadContext;
