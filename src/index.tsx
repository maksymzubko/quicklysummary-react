import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/store/configureStore";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={1} autoHideDuration={1500}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>
)
