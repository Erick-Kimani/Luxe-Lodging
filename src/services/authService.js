import TokenService from "./TokenService"

class AuthService {
    
    static isLoggedIn(){
        return !!TokenService.getToken()
    }

    static hasAbility(ability){
        const abilities = TokenService.getAbilities();
        return abilities?.[ability]===true;
    }
    static logout(){
        TokenService.removeToken()
        localStorage.clear();
    }

}

export default AuthService;