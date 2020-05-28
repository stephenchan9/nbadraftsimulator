export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";


export const addToBoard = (img, playerName, stats) =>{
    return {
        type: "ADD_PLAYER",
        payload:{
            img,
            name: playerName,
            stats
        }
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