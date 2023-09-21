import { api } from '../../api'

export interface IRegister {
    name?: string // ? = Opcional passar os dados
    email?: string
    password?: string   
}

export interface IAuthenticate { 
    email?: string
    password?: string   
}
export interface IUser {
    id: number
    name: string 
    email: string
}

export interface IUserLogin {
    user: string 
    token: {
        token: any
        expires_at: string
    }
}

class UserData {
    register(data: IRegister) {
        return api.post<IUser>('/register', data)
    }
    login(data: IAuthenticate) {
        return api.post<IUserLogin>('/login', data)
    }
    updateToken(token: string) {
        return api.put('/user', { token })
    }
}

export default new UserData()

