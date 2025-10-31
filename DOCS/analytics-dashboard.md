# Analytics Dashboard - Dokumentacja

## Przegląd

System Analytics Dashboard to kompleksowe narzędzie do śledzenia i analizy prelaningu. Zbiera dane o:
- Źródłach ruchu (UTM parametry)
- Wejściach użytkowników
- Konwersjach
- Wartości konwersji
- Sesji użytkowników

## Dostęp do Dashboard

### URL
```
http://localhost:5173/analytics
```

### Hasło
```
maja2024analytics
```

## Funkcjonalności

### 1. Przegląd (Overview Tab)
Wyświetla kluczowe metryki:
- **Całkowite zdarzenia** - liczba wszystkich zarejestrowanych zdarzeń
- **Konwersje** - liczba konwersji
- **Sesje** - liczba unikalnych sesji
- **Wartość konwersji** - suma wartości wszystkich konwersji

### 2. Zdarzenia (Events Tab)
Tabela wszystkich zarejestrowanych zdarzeń z:
- Czasem zdarzenia
- Typem zdarzenia
- Źródłem (utm_source)
- Kampanią (utm_campaign)

### 3. Konwersje (Conversions Tab)
Tabela wszystkich konwersji z:
- Czasem konwersji
- Typem konwersji
- Źródłem ruchu
- Medium
- Wartością konwersji

## Zbieranie Danych

### Automatyczne Śledzenie

System automatycznie śledzi:

1. **Page Views** - każde załadowanie strony
2. **Social Clicks** - kliknięcia na linki społeczne
3. **Gallery Clicks** - kliknięcia na elementy galerii
4. **CTA Clicks** - kliknięcia na call-to-action
5. **Purchase Intent** - intencje zakupu z wartością

### Parametry UTM

System automatycznie wyodrębnia parametry UTM z URL:
- `utm_source` - źródło ruchu
- `utm_medium` - medium
- `utm_campaign` - kampania
- `utm_term` - termin
- `utm_content` - zawartość

Przykład URL:
```
https://example.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=summer2024
```

## Dane Przechowywane

### LocalStorage

Dane są przechowywane w LocalStorage przeglądarki:

1. **prelanding_analytics_data** - wszystkie zdarzenia (max 1000)
2. **prelanding_conversions** - wszystkie konwersje
3. **prelanding_session_id** - ID sesji użytkownika

### Struktura Danych

#### AnalyticsData
```typescript
{
  timestamp: number
  eventName: string
  properties?: Record<string, any>
  utmParameters: Record<string, any>
  sessionId: string
  userAgent: string
  referrer: string
  pageUrl: string
}
```

#### ConversionData
```typescript
{
  timestamp: number
  type: 'click_social' | 'click_gallery' | 'cta_click' | 'purchase_intent' | 'page_view'
  source?: string
  medium?: string
  campaign?: string
  value?: number
  product?: string
}
```

## Eksport Danych

### Funkcja Export
Kliknij przycisk "Export" aby pobrać dane w formacie JSON.

Plik zawiera:
- Wszystkie zdarzenia
- Wszystkie konwersje
- Podsumowanie analityki
- Czas eksportu

## Czyszczenie Danych

### Funkcja Clear
Kliknij przycisk "Wyczyść" aby usunąć wszystkie dane analityki.

**Uwaga:** Ta operacja jest nieodwracalna!

## Integracja z Kodem

### Śledzenie Zdarzeń

```typescript
import { trackEvent, trackCTAClick, trackPurchaseIntent } from '@/utils/analytics'

// Śledzenie zdarzenia
trackEvent('custom_event', { customProperty: 'value' })

// Śledzenie CTA
trackCTAClick('button_type', 'section_name')

// Śledzenie intencji zakupu
trackPurchaseIntent('product_name', 99.99)
```

### Dostęp do Danych

```typescript
import { 
  getStoredAnalyticsEvents,
  getStoredConversions,
  getAnalyticsSummary 
} from '@/utils/analytics'

// Pobierz wszystkie zdarzenia
const events = getStoredAnalyticsEvents()

// Pobierz wszystkie konwersje
const conversions = getStoredConversions()

// Pobierz podsumowanie
const summary = getAnalyticsSummary()
```

## Bezpieczeństwo

### Hasło
Dashboard jest chroniony prostym hasłem. Zmień hasło w pliku:
```
src/components/pages/AnalyticsDashboard.tsx
```

Linia:
```typescript
const DASHBOARD_PASSWORD = 'maja2024analytics'
```

## Uwagi

- Dane są przechowywane lokalnie w przeglądarce
- Dane nie są wysyłane na serwer
- Każdy użytkownik ma swoje dane
- Czyszczenie cache przeglądarki usunie dane
- System śledzi maksymalnie 1000 ostatnich zdarzeń

## Troubleshooting

### Dashboard nie ładuje się
- Sprawdź czy hasło jest prawidłowe
- Wyczyść cache przeglądarki
- Sprawdź konsolę przeglądarki (F12) pod kątem błędów

### Brak danych
- Upewnij się że zdarzenia są śledzone
- Sprawdź LocalStorage w DevTools
- Odśwież stronę

### Błędy w eksporcie
- Sprawdź czy masz wystarczająco miejsca na dysku
- Spróbuj innej przeglądarki

