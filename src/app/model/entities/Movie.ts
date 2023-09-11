export class Movie {
    private _id!: string;
    private _title: string;
    private _director: string;
    private _writer: string;
    private _releaseDate: Date;
    private _genres: string[] = [];

    constructor(title: string, director: string, writer: string, date: Date, genres: string[]) {
        this._title = title;
        this._director = director;
        this._writer = writer;
        this._releaseDate = date;
        this._genres = genres;
    }

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get director(): string {
		return this._director;
	}

	public set director(value: string) {
		this._director = value;
	}

	public get writer(): string {
		return this._writer;
	}

	public set writer(value: string) {
		this._writer = value;
	}

	public get releaseDate(): Date {
		return this._releaseDate;
	}

	public set releaseDate(value: Date) {
		this._releaseDate = value;
	}

	public get genres(): string[]  {
		return this._genres;
	}
    
	public set genres(value: string[] ) {
		this._genres = value;
	}

}