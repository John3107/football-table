const initialState = {
    headerData: ['Place', 'Team', 'Played', 'Win', 'Draw', 'Lost', 'GF', 'GA', 'GD', 'Points'],
    teams: [],
    teamsResults: []
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET-TEAMS-LIST':
            return {...state, teams: action.teams}
        case 'NEW-TEAM':
            return {...state, teams: [...state.teams, action.newTeam]}
        case 'UPDATE-TEAMS':
            return {...state, teams: action.updateTeams}
        case 'TEAM-RESULTS':
            return {...state, teamsResults: action.result}
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

export const updateTableTC = (newTable) => (dispatch) => {
    dispatch(setUpdateTableAC(newTable))
    localStorage.setItem('teams-list', JSON.stringify(newTable))
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

export const teamResultsTC = (opp) => (dispatch) => {
    const results = localStorage.getItem('results')
    if (results) {
        let resultsParsed = JSON.parse(results)
        let resultsConcatenated = resultsParsed.concat(opp)
        dispatch(setTeamResultsAC(resultsConcatenated))
        localStorage.setItem('results', JSON.stringify(resultsConcatenated))
    } else {
        dispatch(setTeamResultsAC(opp))
        localStorage.setItem('results', JSON.stringify(opp))
    }
}

export const teamResultsUpdatedTC = (updatedResults) => (dispatch) => {
    const results = localStorage.getItem('results')
    let resultsParsed = JSON.parse(results)
    let resultsMapped = resultsParsed.map(el => el.id === updatedResults.id
        ? ({...el, team1Goals: updatedResults.team1Goals, team2Goals: updatedResults.team2Goals})
        : el)
    dispatch(setTeamResultsAC(resultsMapped))
    localStorage.setItem('results', JSON.stringify(resultsMapped))
}

export const resetLSTC = () => (dispatch) => {
    localStorage.removeItem('results')
    localStorage.removeItem('teams-list')
    dispatch(setTeamResultsAC([]))
    dispatch(setGetTeamsAC([]))
}

export const setGetTeamsAC = (teams) => ({type: 'GET-TEAMS-LIST', teams})
export const setNewTeamAC = (newTeam) => ({type: 'NEW-TEAM', newTeam})
export const setTeamResultsAC = (result) => ({type: 'TEAM-RESULTS', result})
export const setUpdateTableAC = (updateTeams) => ({type: 'UPDATE-TEAMS', updateTeams})

