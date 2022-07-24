import style from './Results.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {teamResultsUpdatedTC, updateTableTC} from "../../bll/app-reducer";
import {useEffect, useState} from "react";
import {addResult, refreshTeams, sortedTable} from "../../hooks/hooks";

function Results() {
    const data = useSelector(state => state.app)
    const dispatch = useDispatch()

    const [opponents, setOpponents] = useState([])

    const onBlurHandler = (team, e, id) => {
        if (!e.currentTarget.value) return
        addResult(team, e, id, opponents, setOpponents)
    }

    useEffect(() => {
        let teamsUpdated
        opponents.map(val => {
            if (val.id1 === val.id2) {
                dispatch(teamResultsUpdatedTC(val))
                teamsUpdated = refreshTeams(teamsUpdated, data, val, opponents, setOpponents)
            }
        })
        if (!teamsUpdated) return

        dispatch(updateTableTC(sortedTable(teamsUpdated)))
    }, [opponents])

    return (
        <div className={style.results}>
            {data.teamsResults.map(val => {
                return (
                    <div className={style.resultsContainer} key={val.id}>
                        <div className={style.result}>
                            <div className={style.resultSide}>{val.team1}
                                {val.team1Goals !== null
                                    ? <span>{val.team1Goals}</span>
                                    : <input type="number"
                                             onBlur={(e) => onBlurHandler(
                                                 {team1: val.team1}, e, val.id)}/>}</div>
                            :
                            <div className={style.resultSide}>{val.team2Goals !== null
                                ? <span>{val.team2Goals}</span>
                                : <input type="number"
                                         onBlur={(e) => onBlurHandler(
                                             {team2: val.team2}, e, val.id)}/>}
                                {val.team2}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Results;