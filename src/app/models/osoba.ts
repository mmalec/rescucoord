export interface Osoba {
    _id:String;
    id_zwiazku_taktycznego:string;
    id_pojazdu:string;
    id_zdarzenia:string;
    lista_zdrazen:string[]; //ostatnie zdarzenie na liscie jest bieżące

    Imie:String;
    Nazwisko:string;
    Stopien:string;
    Jednosta:string;
    Województwo:string;
    Telefon:number;
    Email:string;
}
