import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from './module/private/Routes';
import PublicRoutes from './module/public/Routes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<PrivateRoutes/>}/>
                <Route path="/auth/*" element={<PublicRoutes/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
