type Unit = "grams" | "ML"

export class Article {
    article_id: number;
    Name: string;
    Size: number;
    Unit: Unit;
    PCS: number;
    EAN: string;

    constructor(Object:{
        article_id: number,
        Name: string,
        Size: number,
        Unit: Unit,
        PCS: number,
        EAN: string
    }) {
        this.article_id = Object.article_id;
        this.Name = Object.Name;
        this.Size = Object.Size;
        this.Unit = Object.Unit;
        this.PCS = Object.PCS;
        this.EAN = Object.EAN;
    }

    public toString(): string {
        return `Article: ${this.article_id}, Name: ${this.Name}, Size: ${this.Size}, Unit: ${this.Unit}, PCS: ${this.PCS}, EAN: ${this.EAN}`;
    }

    public getName(): string {
        return this.Name;
    }

    public printName() {
        console.log(this.Name);
    }

    
}

