export const IMPORT_PROFILE_ACTION = 'auth/import';
export const EXPORT_PROFILE_ACTION = 'auth/export';

const initialState = {
    error: ''
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case IMPORT_PROFILE_ACTION:
            return {...state };
        default:
            return state;
    }
}

export const ActionImportProfile = async(dispatch, profileData) => {
    console.log('profile data:', profileData);
    return dispatch({ type: IMPORT_PROFILE_ACTION });
}