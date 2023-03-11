import Hash from "../../hooks/hash";

interface IServer {
    exactSend(method: string, params: any, isHashToken?: boolean): Promise<any>;
    postExactSend(method: string, params: any, isHashToken?: boolean): Promise<any>;
    formDataSend(method: string, params: any, isHashToken?: boolean): Promise<any>;
    //user//
    registration(name: string, login: string, password: string): Promise<any>;
    login(login: string, password: string): Promise<any>;
    logout(): Promise<boolean>;
    getUser(): Promise<any>;
    uploadUserImage(image: File, type: string): Promise<any>;
    getUserImage(image: any, type: string): Promise<any>;
    //messanger//
    sendPublicMessage(message: string[], senderId: number): Promise<boolean>;
    getMessages(): Promise<any>;
}

type Token = string | null;

const Server = class Server implements IServer {
    token: Token;
    chatHash: Token;
    guid: Token;
    
    constructor(token: Token, guid: Token) {
        this.guid = guid || null;
        this.token = token || null;
        this.chatHash = Math.random().toString(32).substring(2); // random init hash
    }

    async exactSend(method: string, params: any, isHashToken:boolean = true) {
        const tokenHash = Hash.implictToken(this.token, params);
        const sendParams = Object.assign(tokenHash, params);
        const query = ( isHashToken ? Object.values(sendParams).join('/') : Object.values(params).join('/') );
        try {
            const response = await fetch(`/api/${method}/${query}`);
            const answer: any = await response.json();
            return answer?.result === 'ok' ? answer?.data : null;
        } catch(e) {
            console.log(e);
        }
    }

    async postExactSend(method: string, params: any, isHashToken:boolean = true) {
        const tokenHash = Hash.implictToken(this.token, params);
        const sendParams = Object.assign(tokenHash, params);
        const body = (isHashToken ? JSON.stringify(sendParams) : JSON.stringify(params));
        const responce = await fetch(`/api/${method}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
        const answer = await responce.json();
        return answer?.result === 'ok' ? answer?.data : null;
    }

    async formDataSend(method: string, params: any, isHashToken:boolean = true) {
        const tokenHash = Hash.implictToken(this.token, params);
        const sendParams = Object.assign(tokenHash, params);
        const formData = new FormData();
        const paramsArr = (isHashToken ? Object.entries(sendParams) : Object.entries(params));
        paramsArr.forEach((param: any[]) => {
            formData.append(param[0], param[1]);
            return;
        });
        const responce = await fetch(`/api/${method}`, {
            method: 'POST',
            body: formData
        });
        const answer = await responce.json();
        return answer?.result === 'ok' ? answer?.data : null;
    }

    /****************/
    /****  USER  ****/
    /****************/
    async registration(name: string, login: string, password: string) {
        if(name && login && password) {
            const guid:string = uuidv4();
            this.guid = guid;
            localStorage.setItem('guid', guid);
            const method: string = 'registration';
            const params: {name: string, login: string, password: string, guid:string } = {
                name,
                login,
                password,
                guid
            };
            return await this.exactSend(method, params, false);
        }
        return null;
    }

    async login(login: string, password: string) {
        if(login && password) {
            const method: string = 'login';
            const generatedHash = Hash.generateHash({ login, password });
            const params: { login:string, password:string, rndNum:number|string } = {
                login,
                password: generatedHash.typedHash,
                rndNum: generatedHash.usedRandomValue
            };
            const data: any = await this.exactSend(method, params, false);
            const rndString:string = data?.data;
            const token: Token = Hash.generateToken(login, generatedHash.paramsHash, rndString).returnHash;
            if(rndString) {
                this.token = token;
                localStorage.setItem('token', token);
                return true;
            }
        }
        return null;
    }

    async logout() {
        const method: string = 'logout';
        const params: { guid: Token } = {
            guid: this.guid
        }
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
        const method: string = 'getUserByGuid';
        const params: { guid: Token } = {
            guid: this.guid
        }
        const preData: any = await this.exactSend(method, params);
        const data = preData.data;
        if(preData) {
            return data;
        }
        return null;
    }

    async uploadUserImage(image: File, type: string) {
        const method: string = 'uploadAvatar';
        const params: { token: Token, image: File } = {
            token: this.token,
            image: image,
        }
        return await this.formDataSend(method, params);
    }

    async getUserImage(type: string) {
        const method: string = 'getUserImage';
        const params: { token: Token, type: string } = {
            token: this.token,
            type: type
        }
        const data = await this.postExactSend(method, params);
        return;
    }

    /*********************/
    /****  MESSANGER  ****/
    /*********************/

    async sendPublicMessage(message: string[]) {
        if(message) {
            const method: string = 'sendPublicMessage';
            const params: { guid: Token, message: string[] } = {
                guid: this.guid,
                message
            };
            return await this.postExactSend(method, params);
        }
        return;
    }

    async getMessages() {
        const method: string = 'getMessages';
        const params: { guid: Token, chatHash: Token } = {
            guid: this.guid,
            chatHash: this.chatHash
        };
        const data: any = await this.exactSend(method, params);
        if(data) {
            const messages: any[] = data.data.messages;
            this.chatHash = data.data.dbHash;
            return messages;
        }
        return null;
    }

    async zeroingChatHash() {
        return this.chatHash = Math.random().toString(32).substring(2);
    }
}

function uuidv4() {
    return (<any>[1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c:any) =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const localToken: Token = localStorage.getItem('token') || null;
const guid: Token = localStorage.getItem('guid') || null;

const server = new Server(localToken, guid);
export default server;


