export class Config{
    public static connectionString: string = "mongodb+srv://daniel:daniel123@cluster0-wi7r8.mongodb.net/test?retryWrites=true&w=majority";
    public static tokenExpiration: number = 1 * 60 * 60 * 1000;
    public static secret: string = "dannydevito";
    public static corsWhitelist: string[] = [
        'http://localhost:4200',
        'http://localhost:5000'
    ]
    public static production = false;
}