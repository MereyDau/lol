import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {SurveyPath, ValentinePath} from "./components/common/paths.js";
import Valentine from "./pages/Valentine.jsx";
import Survey from "./pages/Survey.jsx";


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path={ValentinePath} element={<Valentine/>}/>
            <Route path={SurveyPath} element={<Survey/>}/>
        </Routes>
    </Router>
);

export default AppRoutes;