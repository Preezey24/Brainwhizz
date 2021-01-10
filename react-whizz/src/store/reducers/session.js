const SET_USER = 'session/setUser'; 
const REMOVE_USER = 'session/removeUser'; 

const setUser = (user) => {
    return {
        type: SET_USER, 
        payload: user, 
    };
}; 

const removeUser = () => {
    return {
        type: REMOVE_USER, 
    };
};

export const signUp = (user) => async (dispatch) => {
    const { username, email, password, confirm } = user; 
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirm,
            }),
        }); 
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data)); 
        }
    } catch (err) {
        console.log(err.message);
    }  
}; 

export const logIn = (user) => async (dispatch) => {
    const { email, password } = user;
    try { 
        const response = await fetch('/auth/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (response.ok) { 
            const data = await response.json(); 
            console.log(data); 
            dispatch(setUser(data)); 
        }
    } catch (err) {
        console.log(err); 
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await fetch('/auth/logout')
        if (response.ok) {
            dispatch(removeUser()); 
        }
    } catch (err) {
        console.log(err); 
    }
}

const initialState = { user: null }; 

const sessionReducer = (state = initialState, action) => {
    let newState; 
    switch (action.type) {
        case SET_USER: 
            //create a copy, do not mutate existing to avoid race conditions 
            newState = Object.assign({}, state); 
            newState.user = action.payload; 
            return newState; 
        case REMOVE_USER: 
            newState = Object.assign({}, state); 
            newState.user = null; 
            return newState; 
        default: 
            return state; 
    }
};

export default sessionReducer; 