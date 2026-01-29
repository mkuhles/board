# Projektkontext: Board

Ich arbeite an einer lokalen, leichtgewichtigen Kanban-Board-Anwendung namens **Board** zur Verwaltung von Projekten über JSON-Dateien. Ziel ist ein einfaches, lokal nutzbares Planungstool ohne Backend oder Cloud.

Die Anwendung läuft im Browser (React) und speichert Änderungen direkt in lokalen JSON-Dateien über die File System Access API.

---

## Kernkonzept

Ein Projekt wird als JSON-Datei gespeichert und enthält:

* Projektmetadaten
* Areas (Funktionsbereiche)
* konfigurierbare Item-Typen
* Items (Tickets/Karten)

Das Board zeigt Items als verschiebbare Karten in Status-Spalten an.

---

## Technologiestack

* React (funktionale Komponenten)
* Hooks + Context
* dnd-kit für Drag & Drop
* CSS Modules
* lokale Dateiverwaltung via File System Access API
* kein Server, kein Backend

---

## Datenmodell (vereinfacht)

Projekt:

```json
{
  "name": "Project Name",
  "typeCodes": {
    "task": {
      "prefix": "T",
      "label": "Task"
    }
  },
  "areas": [
    {
      "id": "auth",
      "title": "Authentication",
      "number": 1
    }
  ],
  "items": [...]
}
```

---

### Items

Items enthalten:

```json
{
  "id": "T12",
  "title": "Implement login",
  "description": "...",
  "type": "task",
  "area_id": "auth",
  "status": "todo",
  "order": 2,
  "relates_to": ["T10"]
}
```

---

## Ticket-ID-Regel

Neue IDs werden automatisch erzeugt:

```
<TYPE_PREFIX><running_number>
```

Beispiele:

```
T1
T2
US3
```

* Zählung erfolgt pro Type
* alte ID-Formate bleiben kompatibel
* neue IDs verwenden nur das einfache Format

---

## Areas

Areas sind eigene Objekte:

* besitzen `id`, `title`, `number`
* Items referenzieren Areas über `area_id`
* alte Projekte mit Freitext-Area werden beim Öffnen automatisch migriert

---

## UI-Funktionalität

Board-Funktionen:

* Drag & Drop zwischen Status-Spalten
* Sortierung innerhalb von Spalten
* einklappbares Backlog
* Karten löschen
* Karten bearbeiten
* neue Karten erstellen

---

### ItemModal

Ein gemeinsames Modal für:

* Item erstellen
* Item bearbeiten

Felder:

* Title
* Description
* Type
* Area
* Related Items

IDs werden automatisch generiert.

---

### Related Items

`relates_to`:

* Autocomplete nach ID oder Titel
* Mehrfachauswahl
* Chips UI
* keine Duplikate
* Selbstreferenz ausgeschlossen

---

## Navigation

Karten können über URL-Hashes referenziert werden:

```
#T12
```

Beim Aufruf:

* Scroll zur Karte
* Karte wird kurz hervorgehoben

---

## Anzeige

* Karten zeigen nur volle Description, Teaser geplant
* volle Description im Modal
* Markdown-Support geplant

---

## Architekturprinzipien

Projekt ist bewusst:

* lokal
* simpel
* iterativ entwickelt
* nicht over-engineered
* refactorbar

Entwicklung erfolgt pragmatisch („vibe coded“).

---

## Wichtige Designentscheidungen

* kein Backend
* JSON bleibt editierbar
* Migration passiert automatisch beim Öffnen
* UI bleibt performant durch lokale States
* Project Meta über Context verfügbar
* Items über Board-State verwaltet

---

## Dinge, auf die KI achten soll

Bei Code-Unterstützung:

* bestehendes JSON-Format respektieren
* keine unnötige Architekturkomplexität
* bestehende Drag&Drop-Logik nicht brechen
* Board-State zentral halten
* Meta-Daten über Context nutzen
* lokale Speicherung respektieren
* bestehende Migrationen nicht zerstören
* backward compatibility erhalten

---

## Nächste geplante Features

* Markdown Rendering
* Description Teaser
* Type Colors
* Default type fallback
* bessere Item Detail View
* Multi-Project Handling

