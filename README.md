# Opis
V tej nalogi sem se bolj spoznal z ogrodjem **React** za čelni del(front-end) ter **Express** za zaledni del(back-end). Uporabil sem `express-generator` za skelet aplikacije za strežniški del ter `mongoose-generator`, da sem lažje zgradil modele za podatkovno bazo, controllerje in route. Za boljšo vizualizacijo sem uporabil knjižnico Bootstrap.

# Funkcionalnosti
Aplikacija omogoča prijavo in registracijo. Ko se uporabnik uspešno prijavi, lahko na spletni strani objavi neko sliko ter sporočilo.

Javni del aplikacije, dostopen brez prijave, izpisuje seznam vseh oddanih slik z naslovi in s številom glasov, ki jih je slika prejela. Prav tako je zraven izpisano tudi ime uporabnika, ki je sliko naložil, ter datum in ura nalaganja slike. Slike so na strani tudi sortirane po času oddaje (sveže slike so na vrhu). Če uporabnik iz seznama izbere sliko, se mu ta pokaže v podrobnem načinu, kjer so pod njo zapisani komentarji uporabnikov. Če je uporabnik prijavljen, lahko sliki tudi odda svoj glas (če še ga ni), prav tako pa lahko pod sliko doda komentar.

**Aplikacija s strežnikom komunicira preko storitev(Rest API).**

# Dodatne funkcionalnosti

- Profil uporabnika, na katerem zraven njegovih podatkov, izpisujem še število njegovih objav in skupno število prejetih glasov za vse objave.
- Slikam dodane oznake ter iskanje po oznakah.
- Označevanje slik z neprimerno vsebino. Ko dobi slika dovolj prijav(v mojem primeu dovolj Dislike-ov), se ne prikazuje več, ampak samo na profilu od uporabnika.
- Preverjanje pristnosti pri registraciji s pomočjo Google Recaptcha. 
