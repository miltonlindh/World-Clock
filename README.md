# World Clock

### Komponenter
- **Layout.tsx** - Grundstruktur för header, footer samt innehål
- **CityCard.tsx** - Visar en stad som ett kort
- **CityForm** - formulär för att lägga till nya städer manuellt
- **QuickAdd.tsx** - snabbknappar för förinställda städer
- **ClockDigital.tsx** - digital klocka
- **ClockAnalog.tsx** - analog klocka
- **CityDetail.tsx** - detaljvy för en stad
### Logik utanflr komponenter
- **CityContext.tsx** - all global state
- ****
### Types och interfaces
- Alla types och interfaces ligger i **types.ts**,
  jag valde att ha de i egen fil för att återanvända samma struktur överallt
---
## Motivering av struktur
Jag valde att dela upp det så här för att det skulle vara enklare att hålla koll:  
- Komponenterna för sig själva -> UI.  
- Context för sig -> global data.  
- Hooks och services egna filer -> lättare att återanvända.  
- Typer i **types.ts** så man slipper repetera kod.  

Ville ha det så överskådligt som möjligt men ändå inte för krångligt.

---
## Loggbok
### Vecka 1
- Började veckan (mån-tis) att tänka ut hur jag vela att sidan skulle se ut samt vad jag vela ha med.
- Bestämde arbetsprocessen när jag skulle jobba med uppgiften samt hur jag skulle byggga upp den.
- började bygga upp hemsidan i slutet av veckan och saker bölrjade strula efter ett tag samt designen blev inte så bra som jag tänkte.
### Vecka 2
- Fortsatte försöka bygga upp hemsidan i blrjan av veckan men saker gick inte som planerat så valde istället att börja om med projektet.
- på onsdagen så satte jag upp nya projektet fixade baslayout och routing. lajnade upp context, types och localstorage hantering. la till city list/form och timezone sevice (API och fallback)
- i torsdags fixade jag massor. klockor fungerar (digital och analog) samt grund css på plats
- Fredagen så skrev jag readme
---
- Jobbade i main-branch hela tiden.  
- Gjorde commits när jag fick något att funka, t.ex  
  - `add city form`  
  - `setup context`  
  - `fix bug timezone dropdown`  
  - `style city cards`  
- Små commits gjorde det enklare att se vad som ändrats.  
- Testade i dev-server efter nästan varje commit för att se att allt körde.
---
## Testning
Jag testade sidan manuellt i webbläsaren genom att
- Lägga till och ta bort städer
- byta inställningar 12/24h,  digital/analog samt visa sekunder
- starta om sidan för att se att allting sparades i localstorage



