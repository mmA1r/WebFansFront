interface IServer {
    exactSend(method: string, params: any): Promise<any>;
    postSend(method: string, params: any): any;
    registration(name: string, login: string, password: string): Promise<any>;
    login(login: string, password: string): Promise<any>;
    logout(): Promise<boolean>;
}

type Token = string | null;

const Server = class Server implements IServer {
    token: Token;
    chatToken: Token;
    
    constructor(token: Token) {
        this.token = token || null;
        this.chatToken = '1';
    }

    async exactSend(mathod: string, params: any) {
        const query = Object.values(params).join('/');
        const response = await fetch(`/api/${mathod}/${query}`);
        const answer: any = await response.json();
        return answer?.result === 'ok' ? answer?.data : null;
    }

    async postSend() {
        
    }
    
    async registration(name: string, login: string, password: string) {
        if(name && login && password) {
            const method: string = 'registration';
            const params: {name: string, login: string, password: string } = {
                name,
                login,
                password
            }
            return await this.exactSend(method, params);
        }
        return null;
    }

    async login(login: string, password: string) {
        if(login && password) {
            const method: string = 'login';
            const params: { login: string, password: string } = {
                login,
                password
            }
            const data: any = await this.exactSend(method, params);
            const token: Token = data.token;
            if(token) {
                this.token = token;
                localStorage.setItem('token', token);
                delete data.token;
                return true;
            }
        }
        return null;
    }

    async logout() {
        const method: string = 'logout';
        const params: { token: Token } = {
            token: this.token
        }
        await this.exactSend(method, params);
        if(this.token) {
            localStorage.removeItem('token');
            this.token = null;
            this.chatToken = null;
            return true;
        }
        return false;
    }

}

const localToken: Token = localStorage.getItem('token') || null;

export default new Server(localToken);


