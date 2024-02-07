import axios from "axios"
export const loginUser = (email , password)=> async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        });
        const {data} = await axios.post("http://127.0.0.1:4000/api/v1/login" ,{email , password});
        dispatch({
            type:"LoginSuccess",
            payload:data.user,
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type:"LoginFailure",
            payload:error,
        });
    }
}