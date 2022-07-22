import style from './Table.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addNewTeamTC, setTeamResultsAC} from "../../bll/app-reducer";
import Team from "./team/Team";
import {useEffect} from "react";

function Table() {
    const data = useSelector(state => state.app)
    const dispatch = useDispatch()

    const [newTeam, setNewTeam] = useState({title: '', teamsCount: 0})
    const [repeatTeam, setRepeatTeam] = useState('')

    useEffect(() => {
        if (data.teams.length < 2) {
        } else {
            let opp = []
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

    const onChangeHandler = (event) => {
        setRepeatTeam(event.currentTarget.value)
        setNewTeam({title: event.currentTarget.value, teamsCount: data.teams.length + 1})
    }

    const onClickHandler = () => {
        let repTeam = data.teams.find(el => el.title === repeatTeam)
        if (repTeam) {
            alert('Such a team already exists. Enter a different team name.')
        } else {
            dispatch(addNewTeamTC(newTeam))
            setNewTeam({title: '', teamsCount: 0})
        }
    }
    return (
        <div className={style.tableContainer}>
            <div className={style.inputContainer}>
                <input type="text"
                       value={newTeam.title}
                       className={style.input}
                       placeholder={'New team'}
                       onChange={onChangeHandler}/>
                <input type="button" value="Add" onClick={() => onClickHandler()}/>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                    {data.headerData.map((val, key) => {
                        return <th key={key}>{val}</th>})}
                    </tr>
                    </thead>
                    <tbody>
                    {data.teams.map((val, key) => {
                        return <Team team={val} key={key}/>})}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;