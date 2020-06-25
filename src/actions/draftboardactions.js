export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
// export const BUILD_REMAINING_TEAM = "BUILD_REMAINING_TEAM";

// playerInfo is an object.
export const addToBoard = (playerInfo) =>{
    return {
        type: "ADD_PLAYER",
        payload: playerInfo
    }
}

export const removeFromBoard = (playerName) =>{
    return {
        type: "REMOVE_PLAYER",
        payload:{
            name: playerName
        }
    }
}

// export const buildRemainingTeam = (players) =>{
//     return {
//         type: "BUILD_REMAINING_TEAM",
//         payload: players
//     }
// }