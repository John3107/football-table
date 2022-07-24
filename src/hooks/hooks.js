export const addNewOpponents = (data, opp) => {
    if (data.teams.length < 2) return
    for (let i = 0; i < data.teams.length - 1; i++) {
        let teamScores = {
            id: data.teams[i].title + data.teams[data.teams.length - 1].title,
            team1: data.teams[i].title,
            team1Goals: null,
            team2: data.teams[data.teams.length - 1].title,
            team2Goals: null
        }
        opp.push(teamScores)
    }
}

export const addResult = (team, e, id, opponents, setOpponents) => {
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

export const refreshTeams = (teamsUpdated, data, val, opponents, setOpponents) => {
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
                win: val.team2Goals > val.team1Goals ? el.win + 1 : el.win,
                draw: val.team1Goals === val.team2Goals ? el.draw + 1 : el.draw,
                lost: val.team2Goals < val.team1Goals ? el.lost + 1 : el.lost,
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

    let newOpponents = opponents.filter(item => item.id1 !== item.id2)
    setOpponents(newOpponents)
    return teamsUpdated
}

export const sortedTable = (teamsUpdated) => {
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

    return teamsUpdated.map((el, i) => ({...el, place: i + 1}))
}