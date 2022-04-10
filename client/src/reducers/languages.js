const languages = (state={language:"ENGLISH"},action)=>{
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return {...state,language:action.payload}
        
        default:
            return state
    }
}

export default languages