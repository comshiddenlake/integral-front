export class Token {
    access_token : string
    expires_at : string
    token_type : string
    session : any

    public constructor(init?: Partial<Token>) {
        Object.assign(this, init);
    }
  }

  