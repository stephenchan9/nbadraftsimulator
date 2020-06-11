export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

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