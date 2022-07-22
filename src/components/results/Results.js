import style from './Results.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setTeamResultsAC, setUpdateResultsAC} from "../../bll/app-reducer";
import {useEffect, useState} from "react";

function Results() {
    const data = useSelector(state => state.app)
    const dispatch = useDispatch()

    const [opponents, setOpponents] = useState([])

    const onBlurHandler = (team, e, id) => {
        if (!e.currentTarget.value) return
        if (team.team1) {
            const findObj = opponents.find(el => el.id2 === id)
            if (!findObj) {
                setOpponents([...opponents, {id1: id, team1: team.team1, team1Goals: +e.currentTarget.value}])
            } else {
                const addOpp = opponents.map(el => el.id2 === id
                    ? ({...el, id, id1: id, team1: team.team1, team1Goals: +e.currentTarget.value})
                    : el)
                setOpponents(addOpp)
            }
        }
        if (team.team2) {
            const findObj = opponents.find(el => el.id1 === id)
            if (!findObj) {
                setOpponents([...opponents, {id2: id, team2: team.team2, team2Goals: +e.currentTarget.value}])
            } else {
                const addOpp = opponents.map(el => el.id1 === id
                    ? ({...el, id, id2: id, team2: team.team2, team2Goals: +e.currentTarget.value})
                    : el)
                setOpponents(addOpp)
            }
        }
    }

    useEffect(() => {
        opponents.map(el => {
            if (el.id1 === el.id2) {
                let result = data.teamsResults.map(item => item.id === el.id
                    ? ({...item, team1Goals: el.team1Goals, team2Goals: el.team2Goals})
                    : item)
                dispatch(setUpdateResultsAC(result))
                let newOpponents = opponents.filter(val => val.id !== el.id)
                setOpponents(newOpponents)
            }
        })
    }, [opponents])

    useEffect(() => {
        if (data.teams.length < 2) {
            return
        } else {
            let opp = []
            debugger
            for (let i = 0; i < data.teams.length; i++) {
                for (let j = i + 1; j < data.teams.length; j++) {
                    if (data.teams[j]) {
                        let teamScores = {
                            id: data.teams[i].title + data.teams[j].title,
                            team1: data.teams[i].title,
                            team1Goals: null,
                            team2: data.teams[j].title,
                            team2Goals: null
                        }
                        opp.push(teamScores)
                    }
                }
            }
            dispatch(setTeamResultsAC(opp))
        }
    }, [data.teams])

    return (
        <div className={style.results}>
            {data.teamsResults.map(val => {
                return (
                    <div className={style.resultsContainer} key={val.id}>
                        <div className={style.result}>
                            {val.team1}
                            {val.team1Goals
                                ? <span>{val.team1Goals}</span>
                                : <input type="number"
                                         onBlur={(e) => onBlurHandler(
                                             {team1: val.team1}, e, val.id)}/>}
                            :
                            {val.team2Goals
                                ? <span>{val.team2Goals}</span>
                                : <input type="number"
                                         onBlur={(e) => onBlurHandler(
                                             {team2: val.team2}, e, val.id)}/>}
                            {val.team2}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Results;