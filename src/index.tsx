import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {closeSnackbar, SnackbarProvider} from "notistack";
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store/configureStore";
import {Button, IconButton, ThemeProvider} from "@mui/material";
import defaultTheme from "./themes/defaultTheme";
import CancelIcon from '@mui/icons-material/Cancel';
import './languages/i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={0} hideIconVariant={true} action={(key) => (<IconButton onClick={()=>closeSnackbar(key)}><CancelIcon sx={{fill:'white'}}/></IconButton>)}>
            <BrowserRouter>
                <ThemeProvider theme={defaultTheme}>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>
)
