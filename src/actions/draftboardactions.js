export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";


export const addToBoard = (img, playerName) =>{
    return {
        type: "ADD_PLAYER",
        payload:{
            img,
            name: playerName
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