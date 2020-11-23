import api from "./api0.js";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

export const fetchAll = () => dispatch => {
    api.Categories().fetchAll()
        .then(res1 => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: res1.data
            })
        })
        .catch(err => console.log(err))

}

export const create = (data, onSuccess) => dispatch => {
    api.Categories().create(data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id,data, onSuccess) => dispatch => {
    api.Categories().update(id,data)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const Delete = (id, onSuccess) => dispatch => {
    api.Categories().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
