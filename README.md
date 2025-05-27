# Project Tracker

Aplikacija za praćenje projekata.

## Funkcionalnosti

- Dodavanje novih projekata
- Praćenje statusa projekata (nije započeto, u toku, završeno)
- Detaljan pregled projekata
- Brisanje projekata
- Čuvanje podataka lokalno na uređaju

## Instalacija

### Android

1. Idite na [Releases](https://github.com/Svilenkovic/project-tracker/releases) stranicu
2. Preuzmite najnoviji APK fajl
3. Na vašem Android uređaju:
   - Idite u Podešavanja > Bezbednost
   - Uključite "Instalacija iz nepoznatih izvora"
   - Pronađite preuzeti APK fajl i tapnite na njega da pokrenete instalaciju

## Razvoj

Ako želite da razvijate aplikaciju:

1. Klonirajte repozitorijum:
```bash
git clone https://github.com/Svilenkovic/project-tracker.git
```

2. Instalirajte zavisnosti:
```bash
npm install
```

3. Pokrenite aplikaciju:
```bash
npm start
```

## Tehnologije

- React Native
- Expo
- React Navigation
- AsyncStorage

## Generisanje APK fajla

Za generisanje APK fajla koji možete postaviti na svoj sajt:

1. U direktorijumu projekta pokrenite:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. APK fajl će biti generisan u:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Struktura Projekta

- `src/screens/` - Ekrani aplikacije
  - `HomeScreen.js` - Glavni ekran sa listom projekata
  - `AddProjectScreen.js` - Ekran za dodavanje novog projekta
  - `ProjectDetailsScreen.js` - Ekran sa detaljima projekta
- `App.js` - Glavna komponenta aplikacije 