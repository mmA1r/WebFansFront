interface IServer {
    exactSend(method: string, params: any): Promise<any>;
    postSend(method: string, params: any): any;
    //user//
    registration(name: string, login: string, password: string): Promise<any>;
    login(login: string, password: string): Promise<any>;
    logout(): Promise<boolean>;
    getUser(): Promise<any>;
    //messanger//
    sendGeneralMessage(message: string, senderId: number): Promise<boolean>;
    getMessages(): Promise<any>;
}

type Token = string | null;

const Server = class Server implements IServer {
    token: Token;
    chatHash: Token;
    
    constructor(token: Token) {
        this.token = token || null;
        this.chatHash = '1';
    }

    async exactSend(mathod: string, params: any) {
        const query = Object.values(params).join('/');
        const response = await fetch(`/api/${mathod}/${query}`);
        const answer: any = await response.json();
        return answer?.result === 'ok' ? answer?.data : null;
    }

    async postSend() {}
    /****************/
    /****  USER  ****/
    /****************/
    async registration(name: string, login: string, password: string) {
        if(name && login && password) {
            const method: string = 'registration';
            const params: {name: string, login: string, password: string } = {
                name,
                login,
                password
            };
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
            };
            const data: any = await this.exactSend(method, params);
            const token: Token = data.data.token;
            if(token) {
                this.token = token;
                localStorage.setItem('token', token);
                delete data.data.token;
                return data.data;
            }
        }
        return null;
    }

    async logout() {
        const method: string = 'logout';
        const params: { token: Token } = {
            token: this.token
        };
        await this.exactSend(method, params);
        if(this.token) {
            localStorage.removeItem('token');
            this.token = null;
            this.chatHash = null;
            return true;
        }
        return false;
    }

    async getUser() {
        const method: string = 'getUser';
        const params: { token: Token } = {
            token: this.token
        }
        const preData: any = await this.exactSend(method, params);
        const data = preData.data;
        if(preData) {
            delete data.token;
            delete data.password;
            return data;
        }
        return null;
    }

    /*********************/
    /****  MESSANGER  ****/
    /*********************/

    async sendGeneralMessage(message: string, senderId: number) {
        if((message && senderId) || (senderId === 0 && message)) {
            const method: string = 'sendGeneralMessage';
            const params: { message: string, senderId: number } = {
                message,
                senderId
            };
            return await this.exactSend(method, params);
        }
    }

    async getMessages() {
        const method: string = 'getMessages';
        const params: { hash: Token } = {
            hash: this.chatHash
        };
        const data: any = await this.exactSend(method, params);
        if(data) {
            const messages: any[] = data.data.messages;
            this.chatHash = data.data.dbHash;
            return messages;
        }
        return null;
    }

}

const localToken: Token = localStorage.getItem('token') || null;

const server = new Server(localToken)
export default server;


