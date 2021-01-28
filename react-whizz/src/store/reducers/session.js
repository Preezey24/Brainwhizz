const SET_USER = 'session/setUser'; 
const REMOVE_USER = 'session/removeUser'; 
const SET_ERRORS = 'session/setErrors';
const REMOVE_ERRORS = 'session/removeErrors'; 

export const setUser = (user) => {
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

const setErrors = ({errors}) => {
    return {
        type: SET_ERRORS, 
        payload: errors, 
    }
}

export const removeErrors = () => {
    return {
        type: REMOVE_ERRORS,
    }
}

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
                math_high: null, 
                math_total: null, 
                memory_high: null,
                memory_total: null, 
                total_score: null,
            }),
        }); 
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data)); 
        } else {
            const errors = await response.json(); 
            dispatch(setErrors(errors));
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
            dispatch(setUser(data)); 
        } else {
            const errors = await response.json();  
            dispatch(setErrors(errors));
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

const initialState = { user: null, errors: null }; 

const sessionReducer = (state = initialState, action) => {
    let newState; 
    switch (action.type) {
        case SET_USER: 
            //create a copy, do not mutate existing to avoid race conditions 
            newState = Object.assign({}, state);
            newState.errors = null;  
            newState.user = action.payload; 
            return newState; 
        case REMOVE_USER: 
            newState = Object.assign({}, state); 
            newState.user = null; 
            return newState; 
        case SET_ERRORS: 
            newState = state; 
            newState.errors = action.payload;
            return newState;
        case REMOVE_ERRORS: 
            newState = state; 
            newState.errors = action.payload;  
            break;
        default: 
            return state; 
    }
};

export default sessionReducer; 