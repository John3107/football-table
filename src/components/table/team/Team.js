import style from './Team.module.scss';

function Team({team}) {
    return (
        <tr className={style.team}>
            <td>{team.place}</td>
            <td>{team.title}</td>
            <td>{team.played}</td>
            <td>{team.win}</td>
            <td>{team.draw}</td>
            <td>{team.lost}</td>
            <td>{team.GF}</td>
            <td>{team.GA}</td>
            <td>{team.GD}</td>
            <td>{team.points}</td>
        </tr>
    );
}

export default Team;