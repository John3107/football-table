import style from './Results.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {teamResultsUpdatedTC, updateTableTC} from "../../bll/app-reducer";
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
        let teamsUpdated
        opponents.map(val => {
            if (val.id1 === val.id2) {
                dispatch(teamResultsUpdatedTC(val))

                teamsUpdated = data.teams.map(el => el.title === val.team1 ? ({
                        ...el,
                        played: el.played + 1,
                        win: val.team1Goals > val.team2Goals ? el.win + 1 : el.win,
                        draw: val.team1Goals === val.team2Goals ? el.draw + 1 : el.draw,
                        lost: val.team1Goals < val.team2Goals ? el.lost + 1 : el.lost,
                        GF: el.GF + val.team1Goals,
                        GA: el.GA + val.team2Goals,
                        GD: (el.GF + val.team1Goals) - (el.GA + val.team2Goals),
                        points: val.team1Goals > val.team2Goals
                            ? el.points + 3
                            : val.team1Goals === val.team2Goals
                                ? el.points + 1
                                : el.points
                    })
                    :
                    el.title === val.team2 ? ({
                            ...el,
                            played: el.played + 1,
                            win: val.team1Goals > val.team2Goals ? el.win : el.win + 1,
                            draw: val.team1Goals === val.team2Goals ? el.draw + 1 : el.draw,
                            lost: val.team1Goals < val.team2Goals ? el.lost : el.lost + 1,
                            GF: el.GF + val.team2Goals,
                            GA: el.GA + val.team1Goals,
                            GD: (el.GF + val.team2Goals) - (el.GA + val.team1Goals),
                            points: val.team1Goals < val.team2Goals
                                ? el.points + 3
                                : val.team1Goals === val.team2Goals
                                    ? el.points + 1
                                    : el.points
                        })
                        : el)

                let newOpponents = opponents.filter(item => item.id !== val.id)
                setOpponents(newOpponents)
            }
        })
        if (!teamsUpdated) return

        teamsUpdated.sort(function (a, b) {
            if (b.points !== a.points) {
                return b.points - a.points;
            } else if (b.GD !== a.GD) {
                return b.GD - a.GD;
            } else if (b.GF !== a.GF) {
                return b.GF - a.GF;
            } else if (b.played !== a.played) {
                return a.played - b.played;
            } else {
                return a.title - b.title;
            }
        });

        let teamsWithPlace = teamsUpdated.map((el, i) => ({...el, place: i + 1}))

        dispatch(updateTableTC(teamsWithPlace))
    }, [opponents])

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