import { createContext } from 'react';

const HeaderContext = createContext({
    helpOpened: false,
    setHelpOpened: (value: boolean) => {},
    promptOpened: false,
    setPromptOpened: (value: boolean) => {},
    promptText: "",
    setPromptText: (value: string) => {}
});

export default HeaderContext;
