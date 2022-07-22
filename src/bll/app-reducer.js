const initialState = {
    headerData: ['Place', 'Team', 'Played', 'Win', 'Draw', 'Lost', 'GF', 'GA', 'GD', 'Points'],
    teams: [],
    teamsResults: []
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET-TEAMS-LIST':
            return {
                ...state, teams: action.teams
            }
        case 'NEW-TEAM':
            return {
                ...state, teams: [...state.teams, action.newTeam]
            }
        case 'TEAM-RESULTS':
            return {
                ...state, teamsResults: action.result
            }
        case 'UPDATE-RESULTS':
            return {
                ...state,
                teamsResults: action.resultUpdated,
                teams: state.teams.map(el => el.title === action.resultUpdated.team1 ? ({
                        ...el,
                        played: el.played + 1,
                        win: action.resultUpdated.team1Goals > action.resultUpdated.team2Goals ? el.win + 1 : el.win,
                        draw: action.resultUpdated.team1Goals === action.resultUpdated.team2Goals ? el.draw + 1 : el.draw,
                        lost: action.resultUpdated.team1Goals < action.resultUpdated.team2Goals ? el.lost + 1 : el.lost,
                        GF: el.GF + action.resultUpdated.team1Goals,
                        GA: el.GA + action.resultUpdated.team2Goals,
                        GD: el.GF - el.GA,
                        points: action.resultUpdated.team1Goals > action.resultUpdated.team2Goals
                            ? el.points + 3
                            : action.resultUpdated.team1Goals === action.resultUpdated.team2Goals
                                ? el.points + 1
                                : el.points
                    })
                    :
                    el.title === action.resultUpdated.team2 ? ({
                            ...el,
                            played: el.played + 1,
                            win: action.resultUpdated.team1Goals > action.resultUpdated.team2Goals ? el.win : el.win + 1,
                            draw: action.resultUpdated.team1Goals === action.resultUpdated.team2Goals ? el.draw + 1 : el.draw,
                            lost: action.resultUpdated.team1Goals < action.resultUpdated.team2Goals ? el.lost : el.lost + 1,
                            GF: el.GF + action.resultUpdated.team2Goals,
                            GA: el.GA + action.resultUpdated.team1Goals,
                            GD: el.GF - el.GA,
                            points: action.resultUpdated.team1Goals < action.resultUpdated.team2Goals
                                ? el.points + 3
                                : action.resultUpdated.team1Goals === action.resultUpdated.team2Goals
                                    ? el.points + 1
                                    : el.points
                        })
                        : el)
            }
        default:
            return state
    }
}

export const getTeamsListTC = () => (dispatch) => {
    const teamsList = localStorage.getItem('teams-list')
    if (teamsList) {
        const teamsListParsed = JSON.parse(teamsList)
        dispatch(setGetTeamsAC(teamsListParsed))
    } else {
        dispatch(setGetTeamsAC([]))
    }
}

export const addNewTeamTC = ({title, teamsCount}) => (dispatch) => {
    const newTeam = {
        place: teamsCount, title, played: 0, win: 0, draw: 0,
        lost: 0, GF: 0, GA: 0, GD: 0, points: 0
    }

    dispatch(setNewTeamAC(newTeam))

    const teamsList = localStorage.getItem('teams-list')
    if (teamsList) {
        let arrayTeams = JSON.parse(teamsList)
        arrayTeams.push(newTeam)
        localStorage.setItem('teams-list', JSON.stringify(arrayTeams))
    } else {
        const arrayTeams = []
        arrayTeams.push(newTeam)
        localStorage.setItem('teams-list', JSON.stringify(arrayTeams))
    }
}

export const teamsResultsInitialTC = () => (dispatch) => {
    const results = localStorage.getItem('results')
    if (results) {
        let arrayResults = JSON.parse(results)
        dispatch(setTeamResultsAC(arrayResults))
    } else {
        dispatch(setTeamResultsAC([]))
    }
}

// export const resultsTC = () => (dispatch) => {
//     const results = localStorage.getItem('results')
//     if (results) {
//         let arrayResults = JSON.parse(results)
//         setTeamResultsAC(arrayResults)
//         localStorage.setItem('results', JSON.stringify(arrayTeams))
//     } else {
//         const arrayTeams = []
//         arrayTeams.push(newTeam)
//         localStorage.setItem('teams-list', JSON.stringify(arrayTeams))
//     }
// }

export const setGetTeamsAC = (teams) => ({type: 'GET-TEAMS-LIST', teams})
export const setNewTeamAC = (newTeam) => ({type: 'NEW-TEAM', newTeam})
export const setTeamResultsAC = (result) => ({type: 'TEAM-RESULTS', result})
export const setUpdateResultsAC = (resultUpdated) => ({type: 'UPDATE-RESULTS', resultUpdated})

