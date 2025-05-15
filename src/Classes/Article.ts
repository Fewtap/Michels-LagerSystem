type Unit = "grams" | "ML"

export class Article {
    Article: number;
    Name: string;
    Size: number;
    Unit: Unit;
    PCS: number;
    EAN: string;

    constructor(Article: number, Name: string, Size: number, Unit: Unit, PCS: number, EAN: string) {
        this.Article = Article;
        this.Name = Name;
        this.Size = Size;
        this.Unit = Unit;
        this.PCS = PCS;
        this.EAN = EAN;
    }

    public toString(): string {
        return `Article: ${this.Article}, Name: ${this.Name}, Size: ${this.Size}, Unit: ${this.Unit}, PCS: ${this.PCS}, EAN: ${this.EAN}`;
    }

    public getName(): string {
        return this.Name;
    }

    public printName() {
        console.log(this.Name);
    }
}

