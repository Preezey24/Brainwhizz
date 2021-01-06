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
        const response = fetch('/auth/signup', {
            method: 'POST', 
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
            return data;  
        }
    } catch (err) {
        return console.log(err.message); 
    }
}; 