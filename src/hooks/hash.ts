const hash = require('object-hash');

type paramsObject = {
    [key:string]: any;
}

type returnValueObject = {
    paramsHash: string,
    typedHash: string,
    usedRandomValue: string|number
}

interface IGenerateHash {
    (values:paramsObject, numRandomType?:boolean): returnValueObject;
}

interface IGenerateToken {
    (login:string, password: string, rndString?:string): { returnHash:string, rndString:string }
}

interface IImplictToken {
    (token:string|null, params:paramsObject, rndNumber?: number): { tokenHash: string, randomNumber: number }
}

interface IHash {
    generateHash: IGenerateHash;
    generateToken: IGenerateToken;
    implictToken: IImplictToken;
}

function randomNum():number {
    return Math.floor(Math.random() * 10000000);
}

function randomString() {
    let result:string = '';
    const characters:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength:number = characters.length;
    let counter:number = 0;
    while (counter < 7) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function sortArrayAlphabet(x:any[], y:any[]):any {
    return x[0].localeCompare(y[0]);
}

function sortParams(params: paramsObject): paramsObject {
    const ent:any = Object.entries(params);
    const soreted:any[] = ent.sort(sortArrayAlphabet);
    return soreted.reduce(function(acc:any, ent:any) {
        acc[ent[0]] = ent[1];
        return acc;
    }, {});
}

const Hash = class Hash implements IHash {
    constructor () {}

    public generateHash: IGenerateHash = (values, numRandomType = true) => {
        const paramsHash:string = hash(values);
        const randomNumberValue:number = randomNum();
        const randomStringValue:string = randomString();
        const usedRandomValue:number|string = (numRandomType ? randomNumberValue : randomStringValue);
        const typedHash:string = paramsHash + usedRandomValue;
    
        const hashedValues: { paramsHash:string, typedHash:string, usedRandomValue: string|number } = {
            paramsHash,
            typedHash,
            usedRandomValue
        } 
        
        return hashedValues;
    }
    
    public generateToken:IGenerateToken = (login, password, rndString = randomString()) => {
        const paramsHash:string = hash({ login, password }) + rndString;
        const returnHash:string = hash({ paramsHash });
        return { 
            returnHash,
            rndString
        };
    }

    public implictToken:IImplictToken = (token, params={}, rndNumber=randomNum()) => {
        const sortedParams:paramsObject = sortParams(params);
        const randomNumber = rndNumber-0;
        const hashParams = Object.assign({randomNumber, token}, sortedParams);
        const tokenHash = hash(hashParams);
        return {
            tokenHash,
            randomNumber
        }
    }
}

export default new Hash();