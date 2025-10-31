# Sekcja E-booka – Zarabiaj na Kryptowalutach by Maja Lubicz

Ten dokument opisuje założenia i konfigurację sekcji e-booka na prelandingu.

## Cel sekcji
- Konwersyjna prezentacja e-booka (PL), spójna z resztą prelandingu.
- Wyraźna informacja o promocji: 299,00 zł → 149,99 zł.
- Intuicyjne CTA „Kup teraz” z podpiętymi zdarzeniami analitycznymi.

## Lokalizacja w układzie
- Sekcja `EbookSection` jest wpinana bezpośrednio pod `SocialHub` w `src/App.tsx`.

## Plik komponentu
- `src/components/sections/EbookSection.tsx`
- Zależności: `framer-motion`, `lucide-react`, `tailwindcss`, lokalne `utils/analytics`.
  - Wizualna okładka: `src/components/ui/CssEbookCover.tsx` (grafika CSS bez obrazków)

## Konfiguracja linku sprzedażowego
- Domyślny placeholder: `https://example.com/ebook-maja-lubicz`.
- Aby podmienić link, zmień stałą `placeholderUrl` w `EbookSection.tsx` lub wyprowadź ją do `src/utils/constants.ts` (np. `EBOOK_SALE_URL`).

## Analityka
- Wydarzenia:
  - `trackCTAClick('ebook_buy', 'ebook_section')`
  - `trackPurchaseIntent('ebook_krypto_maja_lubicz', 149.99)`
- Integracja z GA4/Meta/TikTok jest realizowana w `src/utils/analytics.ts`.

## Copy i wyróżniki
- Nagłówek: „E-book: Zarabiaj na Kryptowalutach by Maja Lubicz”
- Podtytuł: „Krok po kroku jak zacząć i zarabiać na rynku krypto”
- Wybrane wyróżniki (można modyfikować):
  - Bezpieczny start: portfele i ochrona
  - Prosty framework i narzędzia do analizy rynku
  - Strategie Fair Value Gaps & Smart Money Concept
  - Dywersyfikacja i zarządzanie ryzykiem
  - Psychologia inwestora bez tajemnic
  - Checklisty i plan działania

## Cena i badge
- Cena oryginalna: `299,00 zł` (przekreślona)
- Cena promocyjna: `149,99 zł`
- Badge: „Promocja”

## Dostępność (a11y)
- Nagłówki i znaczniki `aria-label` dodane do CTA oraz cen.

## Testy
- Plik testowy: `TESTS/EbookSection.test.tsx`
- Weryfikuje: nagłówek, podtytuł, ceny i CTA oraz elementy social proof (statystyki, slider opinii) i obecność mobilnego sticky CTA.

## Styl i spójność
- Użyto motywów glassmorphism i neon gradient, aby zachować spójność z resztą prelandingu.
- Okładka e-booka generowana CSS-em (radial gradient, siatka, koła/akcenty, błyszczący pasek); dostępność: role="img" i aria-label.
 - Okładka e-booka generowana CSS-em; elementy:
   - Pseudo-grzbiet po lewej (wrażenie fizycznej książki, gradient od ciemnych tonów, wewnętrzny cień dla głębi).
   - Tło radialne z subtelną siatką (repeating-linear-gradient), lekkie rozmycie dla „glass” efektu.
   - Błyszczący ukośny pasek (gloss) i delikatne promienie światła (gradient-conic) – nadają efekt folii/hologramu.
   - Akcentowe okręgi („monety”) z neonowym gradientem i lekką animacją pływania.
   - Gradientowa obwódka (mask + linear-gradient) dodająca premium wygląd bez nachalnego efektu.
   - Tytuł z lekkim tłoczeniem (text-shadow) i zwiększonym trackingiem.
  - Wstążka „Promocja” w prawym górnym rogu (rotate-45).

### Props komponentu CssEbookCover
- showRibbon: boolean — steruje widocznością wstążki w rogu okładki.
- ribbonText: string — ustawia treść wstążki (domyślnie „Promocja”).
- animationVariant: 'calm' | 'vivid' — wariant animacji akcentów na okładce.
  - calm: delikatne pływanie (`animate-float`).
  - vivid: bardziej wyraziste pływanie (`animate-float-vivid`) z większą amplitudą i lekką zmianą jasności.

### Użycie w EbookSection
- `<CssEbookCover showRibbon ribbonText="Promocja" animationVariant="vivid" />`
- Wariant vivid dodatkowo wzmacnia poświatę (blur i opacity) w kontenerze okładki.

### Dostępność (a11y) – grafika CSS
- Dekoracyjna grafika ma `role="img"` i opis `aria-label` zgodny z kontekstem.
- Dodatkowe elementy (grzbiet, promienie, wstążka) są `aria-hidden="true"` – nie obciążają czytników ekranu.
- Animacje są subtelne (krótkie i rzadkie), nie wpływają negatywnie na percepcję treści.

### Parametry wydajności i UX
- Animacje na mobile są lekkie (bez JS, tylko CSS) i ograniczone do minimalnych wartości.
- Brak zewnętrznych obrazków – grafika jest w 100% generowana CSS-em.
- Zadbano o zachowanie proporcji i responsywność w kontenerze `aspect-[4/5]` w `EbookSection`.

## Social proof
- Statystyki (mobile/desktop):
  - 12 000+ czytelników i kursantów
  - 4.9/5 średnia ocena materiałów
  - 50+ praktycznych narzędzi i checklist
- Opinie (mobile-first slider, przewijany poziomo z `snap-x`):
  - Przykładowe opinie: „Kasia”, „Michał”, „Ola”.
  - Każda karta z badge „Polecane” i cytatem.

## Dlaczego ten e-book działa
- Sekcja zawiera 3 kluczowe argumenty wzmacniające decyzję zakupu:
  1) Frameworki i checklisty do działania od razu – bez zbędnej teorii.
  2) Ryzyko pod kontrolą – proste zasady zarządzania kapitałem i dywersyfikacji.
  3) Przykłady i reguły decyzyjne – jasna ścieżka krok po kroku.
- Lokalizacja: pod listą wyróżników (Highlights), przed sekcją ceny i CTA.

## Wariant mobilny
- Dodany przyklejony pasek CTA (sticky) widoczny tylko na mobile (`sm:hidden`):
  - Pokazuje cenę oryginalną (przekreśloną) i cenę promocyjną.
  - Przycisk „Kup teraz” uruchamia te same zdarzenia analityczne co główne CTA.