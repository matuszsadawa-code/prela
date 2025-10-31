# 🔐 Analytics Dashboard - Dostęp

## Szybki Start

### 1. Otwórz Dashboard
```
http://localhost:5173/analytics
```

### 2. Zaloguj się
**Hasło:** `maja2024analytics`

## Co Możesz Robić?

### 📊 Przegląd (Overview)
- Całkowite zdarzenia
- Liczba konwersji
- Unikalne sesje
- Wartość konwersji

### 📈 Zdarzenia (Events)
- Wszystkie zarejestrowane zdarzenia
- Czas zdarzenia
- Źródło ruchu (UTM)
- Kampania

### 🎯 Konwersje (Conversions)
- Wszystkie konwersje
- Typ konwersji
- Źródło i medium
- Wartość konwersji

## Akcje

### 📥 Export
Pobierz dane w formacie JSON

### 🗑️ Wyczyść
Usuń wszystkie dane (nieodwracalne!)

## Dane Śledzone

System automatycznie śledzi:
- ✅ Page views
- ✅ Kliknięcia społeczne
- ✅ Kliknięcia galerii
- ✅ CTA clicks
- ✅ Purchase intent

## Parametry UTM

Automatycznie wyodrębnianie:
- `utm_source` - źródło
- `utm_medium` - medium
- `utm_campaign` - kampania
- `utm_term` - termin
- `utm_content` - zawartość

## Przechowywanie

Dane są przechowywane w LocalStorage przeglądarki:
- Maksymalnie 1000 zdarzeń
- Maksymalnie wszystkie konwersje
- Sesja użytkownika

## Bezpieczeństwo

⚠️ **Zmień hasło w produkcji!**

Plik: `src/components/pages/AnalyticsDashboard.tsx`
```typescript
const DASHBOARD_PASSWORD = 'ZMIEŃ_NA_SILNE_HASŁO'
```

## Więcej Informacji

Pełna dokumentacja: `DOCS/analytics-dashboard.md`

