# Opis
V tej nalogi sem se bolj spoznal z ogrodjem **React** za čelni del(front-end) ter **Express** za zaledni del(back-end). Uporabil sem `express-generator` za skelet aplikacije za strežniški del ter `mongoose-generator`, da sem lažje zgradil modele za podatkovno bazo, controllerje in route. Za boljšo vizualizacijo sem uporabil knjižnico Bootstrap.

| ![image](https://github.com/mlukee/react-web-app/assets/31586745/abd01212-8b0f-403a-802b-db90511c4673) |
|:--:|
|*Domača stran*|

# Funkcionalnosti
Aplikacija omogoča prijavo in registracijo. Ko se uporabnik uspešno prijavi, lahko na spletni strani objavi neko sliko ter sporočilo.

| ![image](https://github.com/mlukee/react-web-app/assets/31586745/3e06c752-3968-4890-8eb5-46da952c62b2) |
|:--:|
|*Objava*|

Javni del aplikacije, dostopen brez prijave, izpisuje seznam vseh oddanih slik z naslovi in s številom glasov, ki jih je slika prejela. Prav tako je zraven izpisano tudi ime uporabnika, ki je sliko naložil, ter datum in ura nalaganja slike. Slike so na strani tudi sortirane po času oddaje (sveže slike so na vrhu). Če uporabnik iz seznama izbere sliko, se mu ta pokaže v podrobnem načinu, kjer so pod njo zapisani komentarji uporabnikov. Če je uporabnik prijavljen, lahko sliki tudi odda svoj glas (če še ga ni), prav tako pa lahko pod sliko doda komentar.

| ![image](https://github.com/mlukee/react-web-app/assets/31586745/94a96188-2eec-44e1-bf71-2417bc480d92) |
|:--:|
|*Ogled posamezne objave*|

Uporabnik lahko svoj komentar izbriše, izbriše ga lahko tudi avtor objave.

**Aplikacija s strežnikom komunicira preko storitev(Rest API).**

# Dodatne funkcionalnosti

- Profil uporabnika, na katerem zraven njegovih podatkov, izpisujem še število njegovih objav in skupno število prejetih glasov za vse objave.
- Slikam dodane oznake ter iskanje po oznakah.

| ![image](https://github.com/mlukee/react-web-app/assets/31586745/e02ec2be-88f8-4b77-8838-f683f4ef5958) |
|:--:|
|*FIltriranje objav*|
 

- Označevanje slik z neprimerno vsebino. Ko dobi slika dovolj prijav(v mojem primeu dovolj Dislike-ov), se ne prikazuje več, ampak samo na profilu od uporabnika.
- Preverjanje pristnosti pri registraciji s pomočjo Google Recaptcha. 

| ![image](https://github.com/mlukee/react-web-app/assets/31586745/16b1cae5-e251-48c6-a688-2b3a58e2d430) |
|:--:|
|*Enostavna registracija z uporabo Google Recaptcha*|

# Dodatne knjižnice

V svoji aplikaciji sem tudi uporabil knjižnici [dayjs](https://www.npmjs.com/package/dayjs) ter [Hot-Toast](https://react-hot-toast.com/).

`DayJs` knjižnico sem uporabil, da sem izpisoval relativni čas, kdaj je bila neka objava objavljena npr. few seconds ago, few min ago, ...
| ![image](https://github.com/mlukee/react-web-app/assets/31586745/db4ca417-9664-43dd-8b0c-17310a76a513) |
|:--:|
|*Relativni pretekli čas od objave*|



`HotToast` knjižnico sem uporabil, da sem bo uspešnem izbrisu komentarja ali objave prikazal, da je bil izbris uspešen.

| ![image](https://github.com/mlukee/react-web-app/assets/31586745/440c8c08-e20e-402a-bf7b-120a5a77ba08) |
|:--:|
|*HotToast ob uspešnem izbrisu komentarja*|



