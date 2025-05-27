# Aplikacija za Praćenje Projekata

Jednostavna Android aplikacija za praćenje projekata, njihovog statusa i napretka.

## Funkcionalnosti

- Dodavanje novih projekata
- Praćenje statusa projekata (nije započeto, u toku, završeno)
- Detaljan pregled projekata
- Brisanje projekata
- Čuvanje podataka lokalno na uređaju

## Instalacija

1. Instalirajte Node.js sa [zvaničnog sajta](https://nodejs.org/)
2. Instalirajte Android Studio sa [zvaničnog sajta](https://developer.android.com/studio)
3. Instalirajte React Native CLI:
   ```bash
   npm install -g react-native-cli
   ```
4. Klonirajte repozitorijum
5. Instalirajte zavisnosti:
   ```bash
   npm install
   ```
6. Pokrenite aplikaciju:
   ```bash
   npm run android
   ```

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