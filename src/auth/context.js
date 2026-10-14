import React from "react"

const AuthContext = React.createContext({
	user: null, 
	setUser : () => {},

})

export const userSetter  = { setUser: () => {}}

export default AuthContext;