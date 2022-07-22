import style from './App.module.scss';
import Table from "./components/table/Table";
import Results from "./components/results/Results";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getTeamsListTC} from "./bll/app-reducer";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTeamsListTC())
    }, [])

    return (
        <div className={style.app}>
            <Table/>
            <Results/>
        </div>
    );
}

export default App;
