import React from 'react';

export const AuthContext = React.createContext();

export default class AuthProvider extends React.Component{
    state = {
        id:0,
        usr:""
    }

    login = (res) =>{
        console.log('here inside')
        this.setState({id:res})
    }

    logout = ()=>{
        this.setState({id:0})
    }

    render(){
        const {id,usr} = this.state;
        const {login,logout} = this;
        return(
            <AuthContext.Provider value = {{
                id,
                usr,
                login,
                logout
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}


