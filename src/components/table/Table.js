import style from './Table.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addNewTeamTC, resetLSTC, teamResultsTC} from "../../bll/app-reducer";
import Team from "./team/Team";
import {useEffect} from "react";
import {addNewOpponents} from "../../hooks/hooks";

function Table() {
    const data = useSelector(state => state.app)
    const dispatch = useDispatch()

    const [newTeam, setNewTeam] = useState({title: '', teamsCount: 0})
    const [repeatTeam, setRepeatTeam] = useState('')
    const [callEffect, setCallEffect] = useState('')

    useEffect(() => {
        if (data.teams.length < 2) return
        let opp = []
        addNewOpponents(data, opp)
        dispatch(teamResultsTC(opp))
    }, [callEffect])

    const onChangeHandler = (event) => {
        setRepeatTeam(event.currentTarget.value)
        setNewTeam({title: event.currentTarget.value, teamsCount: data.teams.length + 1})
    }

    const onClickHandler = () => {
        setCallEffect(newTeam.title)
        let repTeam = data.teams.find(el => el.title === repeatTeam)
        if (repTeam) {
            alert('Such a team already exists. Enter a different team name.')
        } else {
            dispatch(addNewTeamTC(newTeam))
            setNewTeam({title: '', teamsCount: 0})
        }
    }
    const resetLSHandler = () => {
        dispatch(resetLSTC())
    }

    return (
        <div className={style.tableContainer}>
            <div className={style.inputContainer}>
                <input type="text"
                       value={newTeam.title}
                       className={style.input}
                       placeholder={'New team'}
                       onChange={onChangeHandler}/>
                <input type="button" value="Add" onClick={onClickHandler}/>
            </div>
            <div className={style.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        {data.headerData.map((val, key) => {
                            return <th key={key}>{val}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data.teams.map((val, key) => {
                        return <Team team={val} key={key}/>
                    })}
                    </tbody>
                </table>
                <input type="button" value="reset" onClick={resetLSHandler} className={style.inputRest}/>
            </div>
        </div>
    );
}

export default Table;