# Einstieg: Komplexes Beispielprojekt (JSON)

Dieses Dokument zeigt ein vollständiges Beispiel für die Board-JSON-Struktur.

Datei: `docs/board-complex-example.json`

## Ziel

Das Beispiel nutzt praktisch alle Felder und Anwendungsfälle:

- `meta` mit `activeSprintId` und zusätzlichen Metadaten
- mehrere `typeCodes` inkl. `slug`, `prefix`, `label`, `color`
- mehrere `areas` inkl. `number` und optionalem `color`
- mehrere `sprints` (mit und ohne `end`)
- `items` in allen Status-Spalten: `backlog`, `todo`, `doing`, `done`, `archived`
- Item-Verknüpfungen über `relates_to`
- Zeiterfassung über `time_entries` inkl. `tags` und `billable`
- `created_at` und `updated_at` als ISO-Zeitstempel

## Nutzung

1. Board starten (`npm run dev`).
2. In der App `Open file` wählen.
3. `docs/board-complex-example.json` öffnen.

## Hinweise

- Das Board speichert Änderungen direkt zurück in die geöffnete Datei.
- Client-interne Felder wie `_cid` werden nicht im JSON erwartet.
- Pflichtfelder pro Item sind praktisch `id`, `title` und bei vorhandenen `typeCodes` auch `type`.
