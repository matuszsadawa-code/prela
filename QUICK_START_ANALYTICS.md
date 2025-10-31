# 🚀 Szybki Start - Zaawansowana Analityka

## 1️⃣ Otwórz Dashboard

```
http://localhost:5174/analytics
```

## 2️⃣ Zaloguj się

**Hasło:** `maja2024analytics`

## 3️⃣ Przeglądaj Dane

### 📊 Przegląd (Overview)
- **8 kart statystyk** - wszystkie kluczowe metryki
- **4 wykresy** - wizualizacja danych
- **Funnel konwersji** - ścieżka konwersji

### 📈 Zdarzenia (Events)
- Wszystkie zarejestrowane zdarzenia
- Czas, typ, źródło, kampania

### 🎯 Konwersje (Conversions)
- Wszystkie konwersje
- Typ, źródło, medium, wartość

### 📱 Urządzenia (Devices)
- **Wykresy:** urządzenia, przeglądarki, OS
- **Tabela:** szczegóły każdego urządzenia

### 🎮 Zachowanie (Behavior)
- Scroll depth
- Czas na stronie
- Interakcje użytkowników

## 📊 Nowe Metryki

| Metryka | Opis |
|---------|------|
| **Bounce Rate** | % użytkowników bez interakcji |
| **Conversion Rate** | % konwersji |
| **Avg Scroll Depth** | Średnia głębokość scrollowania |
| **Avg Time on Page** | Średni czas na stronie |
| **Avg Conversion Value** | Średnia wartość konwersji |

## 🎨 Wykresy

### Dostępne Typy
- 📊 **Słupkowe** - porównanie wartości
- 🥧 **Kołowe** - proporcje
- 📈 **Liniowe** - trendy
- 🔻 **Funnel** - konwersje

### Gdzie Są
- **Overview** - 4 wykresy
- **Devices** - 3 wykresy
- **Behavior** - tabela

## 🔧 Dane Zbierane Automatycznie

✅ Scroll depth - przy każdym scrollowaniu
✅ Czas na stronie - co 10 sekund
✅ Typ urządzenia - mobile/tablet/desktop
✅ System operacyjny - Windows/Mac/Linux/Android/iOS
✅ Przeglądarka - Chrome/Firefox/Safari/Edge
✅ Rozdzielczość ekranu
✅ Język przeglądarki
✅ Strefa czasowa

## 💾 Akcje

### 📥 Export
Pobierz wszystkie dane w JSON

### 🗑️ Wyczyść
Usuń wszystkie dane (nieodwracalne!)

## 🔐 Bezpieczeństwo

⚠️ **Zmień hasło w produkcji!**

Plik: `src/components/pages/AnalyticsDashboard.tsx`
```typescript
const DASHBOARD_PASSWORD = 'NOWE_SILNE_HASŁO'
```

## 📱 Dane Urządzenia

Automatycznie zbierane:
- Typ: mobile, tablet, desktop
- OS: Windows, MacOS, Linux, Android, iOS
- Browser: Chrome, Firefox, Safari, Edge, Opera
- Rozdzielczość: np. 1920x1080
- Język: np. pl-PL
- Timezone: np. Europe/Warsaw

## ⏱️ Śledzenie Czasu

- **Bounce Rate** - sesje bez interakcji
- **Conversion Rate** - procent konwersji
- **Avg Time** - średni czas na stronie
- **Scroll Depth** - jak głęboko scrollują

## 📊 Wizualizacje

### Overview
```
┌─────────────────────────────────────┐
│ 8 Kart Statystyk                    │
├─────────────────────────────────────┤
│ Zdarzenia | Konwersje | Scroll | Czas│
├─────────────────────────────────────┤
│ 4 Wykresy (Bar, Pie, Pie, Funnel)  │
└─────────────────────────────────────┘
```

### Devices
```
┌──────────────┬──────────────┬──────────────┐
│ Urządzenia   │ Przeglądarki │ Systemy OS   │
│ (Pie)        │ (Bar)        │ (Pie)        │
├──────────────┴──────────────┴──────────────┤
│ Tabela Szczegółów Urządzeń                 │
└────────────────────────────────────────────┘
```

## 🎯 Przypadki Użycia

### Analiza Ruchu
1. Otwórz **Overview**
2. Sprawdź **Bounce Rate** i **Conversion Rate**
3. Przejrzyj **wykresy** zdarzeń i konwersji

### Analiza Urządzeń
1. Otwórz **Devices**
2. Sprawdź rozkład urządzeń
3. Przejrzyj szczegóły przeglądarek

### Analiza Zachowania
1. Otwórz **Behavior**
2. Sprawdź scroll depth
3. Przejrzyj czas na stronie

### Export Danych
1. Kliknij **Export**
2. Pobierz JSON
3. Analizuj w Excel/BI

## 🔄 Odświeżanie

Dashboard odświeża się automatycznie co **5 sekund**

## 📈 Limity Danych

- Zdarzenia: max 1000
- Konwersje: bez limitu
- Urządzenia: max 500
- Zachowanie: max 1000

## ❓ FAQ

**P: Gdzie są moje dane?**
O: W LocalStorage przeglądarki

**P: Czy dane są wysyłane na serwer?**
O: Nie, wszystko lokalnie

**P: Jak wyczyścić dane?**
O: Kliknij "Wyczyść" w Dashboard

**P: Czy mogę zmienić hasło?**
O: Tak, w `AnalyticsDashboard.tsx`

**P: Jak dodać własne śledzenie?**
O: Użyj funkcji z `utils/analytics.ts`

## 🚀 Gotowe!

Zaawansowana analityka ruchu jest gotowa do użytku!

