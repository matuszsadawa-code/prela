# Zaawansowana Analityka Ruchu - Dokumentacja

## Przegląd Systemu

Rozbudowany system analityki śledzi kompleksowe dane o ruchu na prelandingu, w tym:
- Śledzenie czasu spędzanego na stronie
- Scroll depth (głębokość scrollowania)
- Dane urządzenia i przeglądarki
- Zachowanie użytkowników
- Wizualizacje danych w postaci wykresów

## Nowe Funkcjonalności

### 1. Śledzenie Czasu na Stronie
- **Automatyczne śledzenie** - co 10 sekund
- **Bounce Rate** - procent użytkowników, którzy opuścili stronę bez interakcji
- **Conversion Rate** - procent konwersji
- **Średni czas** - średni czas spędzony na stronie

### 2. Scroll Depth
- **Automatyczne śledzenie** - przy każdym scrollowaniu
- **Maksymalna głębokość** - najgłębszy punkt, do którego dotarł użytkownik
- **Procent strony** - procent strony, którą użytkownik przejrzał

### 3. Dane Urządzenia
Automatycznie zbierane:
- **Typ urządzenia** - mobile, tablet, desktop
- **System operacyjny** - Windows, MacOS, Linux, Android, iOS
- **Przeglądarka** - Chrome, Firefox, Safari, Edge, Opera
- **Rozdzielczość ekranu** - np. 1920x1080
- **Język** - język przeglądarki
- **Strefa czasowa** - strefa czasowa użytkownika

### 4. Zachowanie Użytkowników
Śledzone zdarzenia:
- **Scroll** - scrollowanie strony
- **Hover** - najechanie na elementy
- **Click** - kliknięcia
- **Form Interaction** - interakcje z formularzami
- **Time on Page** - czas spędzony na stronie

### 5. Wizualizacje Danych
Dostępne wykresy:
- **Wykresy słupkowe** - do porównania wartości
- **Wykresy kołowe** - do pokazania proporcji
- **Liniowe** - do pokazania trendów w czasie
- **Funnel** - do pokazania konwersji

## Karty Dashboard

### Przegląd (Overview)
- 8 kart statystyk
- 4 wykresy wizualizujące dane
- Funnel konwersji po źródłach

### Zdarzenia (Events)
- Tabela wszystkich zdarzeń
- Filtrowanie po typie
- Eksport danych

### Konwersje (Conversions)
- Tabela konwersji
- Wartość konwersji
- Źródło i medium

### Urządzenia (Devices)
- Wykres rozkładu urządzeń
- Statystyka przeglądarek
- Statystyka systemów operacyjnych
- Tabela szczegółów urządzeń

### Zachowanie (Behavior)
- Tabela zdarzeń zachowania
- Scroll depth
- Czas na stronie
- Typ zdarzenia

## Integracja w Kodzie

### Inicjalizacja
W `src/App.tsx` automatycznie:
```typescript
// Śledzenie scroll depth
window.addEventListener('scroll', trackScrollDepth)

// Śledzenie czasu na stronie co 10 sekund
setInterval(() => trackTimeOnPage('home'), 10000)

// Zbieranie danych urządzenia
storeDeviceData()
```

### Śledzenie Zdarzeń
```typescript
import { 
  trackScrollDepth,
  trackTimeOnPage,
  trackHover,
  trackFormInteraction,
  storeDeviceData
} from '@/utils/analytics'

// Scroll depth
trackScrollDepth()

// Czas na stronie
trackTimeOnPage('section_name')

// Hover
trackHover('element_id', 'section_name')

// Formularz
trackFormInteraction('form_id', 'section_name')
```

## Przechowywanie Danych

### LocalStorage Keys
- `prelanding_analytics_data` - zdarzenia (max 1000)
- `prelanding_conversions` - konwersje
- `prelanding_device_data` - dane urządzeń (max 500)
- `prelanding_behavior_data` - zachowanie (max 1000)
- `prelanding_session_id` - ID sesji
- `prelanding_session_start_time` - czas startu sesji
- `prelanding_session_scroll_depth` - max scroll depth

## Metryki Obliczane

### Bounce Rate
Procent sesji z tylko page_view bez innych interakcji

### Conversion Rate
Procent konwersji = (konwersje / zdarzenia) * 100

### Average Scroll Depth
Średnia głębokość scrollowania wszystkich użytkowników

### Average Time on Page
Średni czas spędzony na stronie w sekundach

### Average Conversion Value
Średnia wartość konwersji

## Eksport Danych

Eksportuje:
- Wszystkie zdarzenia
- Wszystkie konwersje
- Dane urządzeń
- Dane zachowania
- Podsumowanie analityki
- Czas eksportu

Format: JSON

## Bezpieczeństwo

- Hasło: `maja2024analytics`
- Zmień w produkcji!
- Dane przechowywane lokalnie
- Brak wysyłania na serwer

## Wydajność

- Maksymalnie 1000 zdarzeń
- Maksymalnie 500 rekordów urządzeń
- Maksymalnie 1000 rekordów zachowania
- Auto-czyszczenie starych danych
- Throttling scroll events

## Troubleshooting

### Brak danych urządzeń
- Sprawdź czy `storeDeviceData()` jest wywoływana
- Sprawdź LocalStorage

### Scroll depth = 0
- Sprawdź czy strona ma wystarczającą wysokość
- Sprawdź czy scroll event jest wywoływany

### Brak czasu na stronie
- Sprawdź czy `trackTimeOnPage()` jest wywoływana
- Sprawdź czy interval jest ustawiony

