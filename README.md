### autor: Łukasz Belka
### index: 156162
### Grupa: D1
### Rok akademicki: 2024/2025

#### Uruchomienie:
Do poprawnego uruchomienia zadania potrzebny jest "NPM" albo "YARN", w głównym folderze uruchamiamy komendę "npm install" lub
"yarn install". Dzięki temu instalujemy express.js który będzie udawał nasz backend. Następnie uruchamiamy serwer wpisując komendę: "node server.js" powinniśmy zobaczyć w terminalu komunikat "Serwer działa na localhost:3000". W tym momencie możemy otworzyć w przeglądarce plik "index.html".

#### Założenia:
Tworząc Zadanie 2 starałem się stworzyć coś na wzór restowego api bez używania dodatkowych fremworków takich jak React czy Angular. Wynika to z faktu, iż nie
chciałem tworzyć kilku takich samych stron z wymienionym środkiem np. galeria na formularz kontaktowy jednocześnie kopiując pasek nawigacji czy stopkę. Powodowałoto że w niektórych sytuacjach po zmianach elementy zachowywały się rożnie lub w starszym pliku html czegoś brakowało. Wykonałem więc swoją konstrukcję w JS która blokuje domyślnie zachowanie strony przy przekierowaniu czy przy submit formularza. Zablokowanie doświeżania przy przekierowaniu pozwoliło mi zachować wszystkie 3 podstrony na jednym index.html gdzie jedynie w momencie kliknięcia linku dodawany jest "#<nazwa_podstrony>". W momencie tej zmiany kod JS podpięty pod index.html fetch'uje nowe elementy i podstawia je przede wszystkim w "< div >" o id id="main", który jest główną (środkową) częścią body pomiędzy końcem body i stopką na dole, a nav-barem na górze. W ten sposób uzyskuję strukturę pseudo restową gdzie element front-end (index.html + script.js) wstrzykuje elementy serwowane nam przez express.js pod localhost:3000/<endpoint>. Nie jest to oczywiście w pełni rest bo powinny być wysyłane JSONY z jedynie treścią elementów, nie zaś całe bloki kodu html. Jednak zadanie 1 pisałem porostu w HTML i nie chciałem tu pisać kilkunastu funkcji które mapowały by i wstrzykiwały treści JSONÓW w odpowiednie pojedyncze elementy w HTML.
