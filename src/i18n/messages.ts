export type Language = "en" | "de";

export interface MessageDict {
  [key: string]: string | MessageDict;
}

export const messages: Record<Language, MessageDict> = {
  en: {
    topbar: {
      title: "Project {{name}}",
      subtitle: "Open local JSON → drag → save",
      unsupported:
        "Browser support missing. This feature requires HTTPS (or localhost) in Chrome/Edge/Brave, or later Electron/Tauri.",
      open: "Open file",
      save: "Save",
      saveAs: "Save as…",
      language: "Language",
    },
    empty: {
      title: "What this app does",
      description:
        "A lightweight agile board that reads and writes a local JSON file. You can drag items, edit details, track time, and keep everything in one file.",
      howtoTitle: "How to use",
      howtoStep1: "Open a JSON file or start with one of the examples below.",
      howtoStep2: "Move cards by drag & drop and edit them in the modal.",
      howtoStep3: "Changes are written to your file automatically (Auto-save).",
      starterTitle: "Choose your start",
      starterHint:
        "Both templates work immediately. The full example shows more board behavior right away.",
      downloadQuickstart: "Download quickstart JSON",
      downloadComplex: "Download full example JSON",
      quickstartTitle: "Quickstart JSON template",
      exampleHint:
        "A compact overview for a quick start. For more options, use the full example.",
    },
    toolbar: {
      bulkImport: "Bulk import",
      newItem: "+ New item",
    },
    sprint: {
      label: "Sprint",
      all: "All",
      backlog: "Backlog",
    },
    status: {
      backlog: "Backlog",
      todo: "To Do",
      doing: "Doing",
      done: "Done",
      archived: "Archived",
    },
    modal: {
      editTitle: "Edit item",
      newTitle: "New item",
      typeCode: "Type code",
      currentId: "Current ID",
      created: "Created",
      updated: "Updated",
      close: "Close",
    },
    footer: {
      cancel: "Cancel",
      save: "Save changes",
      create: "Create item",
    },
    fields: {
      title: "Title",
      type: "Type",
      status: "Status",
      area: "Area",
      selectArea: "Select area…",
      sprint: "Sprint",
      sprintNone: "none",
      description: "Description",
      relatesTo: "Relates to",
      relatesToPlaceholder: "Type to search by ID or title…",
      preview: "Preview",
      previewEmpty: "No description yet.",
      editDescription: "Edit description",
      hideEditor: "Hide editor",
    },
    time: {
      entries: "Time entries",
      entryMeta: "{{count}} entries · {{minutes}} min",
      noEntries: "No time entries yet.",
      start: "Start",
      minutes: "Minutes",
      comment: "Comment",
      commentPlaceholder: "What did you do?",
      tags: "Tags",
      tagsPlaceholder: "dev, research, meeting",
      billable: "Billable",
      addEntry: "Add time entry",
      pendingHint: "Pending entry will be included on Save changes.",
      billableTag: "billable",
    },
    card: {
      updated: "Updated",
      time: "Time",
      entries: "entries",
      min: "min",
      billable: "billable",
      untitled: "(untitled)",
    },
    actions: {
      delete: "Delete",
      addToSprint: "Add to active sprint",
      addTime: "Track time",
      archive: "Archive",
      remove: "Remove",
    },
    bulk: {
      title: "Bulk import",
      subtitle: "Paste a JSON array. Types must exist in project.typeCodes.",
      knownTypes: "Known types: {{types}}",
      jsonLabel: "JSON array",
      placeholder: '[{"title":"...", "description":"...", "type":"task"}]',
      cancel: "Cancel",
      import: "Import",
      errorArray: "JSON must be an array of items.",
      errorInvalidJson: "Invalid JSON. Please paste a valid JSON array.",
      errorMissingTitle: "Item #{{index}} is missing a title.",
      errorMissingType: "Item #{{index}} is missing a type.",
      errorUnknownType: 'Item #{{index}} has unknown type "{{type}}".',
    },
    toast: {
      imported: "Imported {{count}} items:",
      closeError: "Close error",
      closeInfo: "Close info",
      closeImport: "Close import info",
    },
    info: {
      opened: "File opened.",
      openedMigrated: "File opened and migrated (area → area_id).",
      warnings: "Warnings:\n- {{warnings}}",
      saved: "Saved.",
      savedAs: "Saved (as…).",
      autosave: "Auto-save: saved.",
      openFailed: "Open failed: {{message}}",
      saveFailed: "Save failed: {{message}}",
      saveAsFailed: "Save as failed: {{message}}",
      autosaveFailed: "Auto-save failed: {{message}}",
      invalidData: "File has invalid data:\n- {{errors}}",
    },
    validation: {
      titleRequired: "Title is required.",
      typeMissing: 'Type "{{type}}" is missing in project.typeCodes.',
    },
    confirm: {
      deleteItem: '"{{name}}" really delete?',
    },
    file: {
      noOpenPicker:
        "Your browser does not support the File System Access API in this context. Use HTTPS (or localhost) in Chrome/Edge/Brave, or later Electron/Tauri.",
      noHandle: "No file opened.",
      noSavePicker: "showSaveFilePicker is not supported by your browser.",
    },
    legal: {
      linkGithub: "GitHub",
      linkGuide: "Guide",
      linkImprint: "Imprint",
      linkPrivacy: "Privacy",
      titleGuide: "Getting started",
      titleImprint: "Imprint",
      titlePrivacy: "Privacy Policy",
      backToApp: "Back to app",
      downloadExampleJson: "Download example JSON",
      guide: `## Starter documentation

This page gives you a practical entry point for using My Board with a complete sample project.

## Included sample file

- File: \`board-complex-example.json\`
- Contains: project meta, type codes, areas, sprints, item links, and time entries
- Covers all standard board columns: backlog, todo, doing, done, archived

## Recommended onboarding flow

1. Download the sample JSON using the button above  
2. Open it in the app via **Open file**  
3. Move cards with drag and drop  
4. Edit cards, add time entries, and save

## Notes

- My Board stores changes back to the opened JSON file.
- Internal client fields are not required in JSON files.`,
      imprint: `## Information according to § 5 DDG (German Digital Services Act)

{{contact}}

## Responsible for content according to § 18 para. 2 MStV (German Interstate Media Treaty)

{{name}}

## Liability for content

The contents of this website have been created with due care.
However, no guarantee can be given for the accuracy, completeness, or timeliness of the content.

As a service provider, I am responsible for my own content on these pages in accordance with general laws.
There is no obligation to monitor transmitted or stored third-party information.

## Liability for links

This website currently contains no external links.
If links to external websites are added in the future, the following applies:
I have no influence over the content of external websites and therefore assume no liability for them.
The respective provider or operator is always responsible for the content of linked pages.`,
      privacy: `## Controller

{{contact}}

## Hosting

This website is hosted by the STRATO AG, Otto-Ostrowski-Straße 7, 10249 Berlin, Germany.

STRATO provides the technical infrastructure required to operate and deliver this website.

When visiting the website, the following technical data is processed automatically:

* IP address
* date and time of access
* browser and operating system information
* accessed pages / files

This data is technically necessary to ensure the secure and reliable operation of the website and to protect against misuse.

**Legal basis:**  
Art. 6(1)(f) GDPR (legitimate interest).

## Data processing within the European Union

Personal data is processed exclusively within the European Union.
No transfer of data to third countries takes place.

## No analytics or tracking

This website uses no cookies, no analytics tools, and no tracking.

## Local processing

The app processes project files locally in your browser.
No project data is transmitted to or stored on any server.

## Your rights

You have the right to:

- access your personal data  
- rectification or erasure  
- restriction of processing  
- data portability  
- lodge a complaint with a data protection authority`,
    },
  },
  de: {
    topbar: {
      title: "Projekt {{name}}",
      subtitle: "Lokales JSON öffnen → verschieben → speichern",
      unsupported:
        "Browser-Support fehlt. Diese Funktion benötigt HTTPS (oder localhost) in Chrome/Edge/Brave oder später Electron/Tauri.",
      open: "Datei öffnen",
      save: "Speichern",
      saveAs: "Speichern unter…",
      language: "Sprache",
    },
    empty: {
      title: "Was diese App macht",
      description:
        "Ein leichtgewichtiges agiles Board, das eine lokale JSON‑Datei liest und schreibt. Du kannst Items verschieben, Details bearbeiten, Zeit erfassen und alles in einer Datei halten.",
      howtoTitle: "So benutzt du es",
      howtoStep1: "Öffne eine JSON-Datei oder starte mit einem der Beispiele unten.",
      howtoStep2: "Verschiebe Karten per Drag & Drop und bearbeite sie im Modal.",
      howtoStep3: "Änderungen werden automatisch in die geöffnete Datei geschrieben (Auto-Save).",
      starterTitle: "Wähle deinen Einstieg",
      starterHint:
        "Beide Vorlagen funktionieren direkt. Beim komplexen Beispiel siehst du von Anfang an mehr Board-Verhalten.",
      downloadQuickstart: "Quickstart-JSON laden",
      downloadComplex: "Vollständiges Beispiel-JSON laden",
      quickstartTitle: "Quickstart-JSON-Vorlage",
      exampleHint:
        "Ein kompakter Überblick für den schnellen Einstieg. Für komplexere Projekte nutze das vollständige Beispiel.",
    },
    toolbar: {
      bulkImport: "Bulk import",
      newItem: "+ Neues Item",
    },
    sprint: {
      label: "Sprint",
      all: "Alle",
      backlog: "Backlog",
    },
    status: {
      backlog: "Backlog",
      todo: "To Do",
      doing: "Doing",
      done: "Done",
      archived: "Archiv",
    },
    modal: {
      editTitle: "Item bearbeiten",
      newTitle: "Neues Item",
      typeCode: "Type-Code",
      currentId: "Aktuelle ID",
      created: "Erstellt",
      updated: "Aktualisiert",
      close: "Schließen",
    },
    footer: {
      cancel: "Abbrechen",
      save: "Änderungen speichern",
      create: "Item erstellen",
    },
    fields: {
      title: "Titel",
      type: "Typ",
      status: "Status",
      area: "Bereich",
      selectArea: "Bereich auswählen…",
      sprint: "Sprint",
      sprintNone: "keiner",
      description: "Beschreibung",
      relatesTo: "Bezieht sich auf",
      relatesToPlaceholder: "Tippe, um nach ID oder Titel zu suchen…",
      preview: "Vorschau",
      previewEmpty: "Noch keine Beschreibung.",
      editDescription: "Beschreibung bearbeiten",
      hideEditor: "Editor ausblenden",
    },
    time: {
      entries: "Zeiterfassungen",
      entryMeta: "{{count}} Einträge · {{minutes}} min",
      noEntries: "Noch keine Einträge.",
      start: "Start",
      minutes: "Minuten",
      comment: "Kommentar",
      commentPlaceholder: "Was hast du gemacht?",
      tags: "Tags",
      tagsPlaceholder: "dev, research, meeting",
      billable: "Abrechenbar",
      addEntry: "Zeit erfassen",
      pendingHint:
        "Der Eintrag wird beim Speichern übernommen.",
      billableTag: "abrechenbar",
    },
    card: {
      updated: "Aktualisiert",
      time: "Zeit",
      entries: "Einträge",
      min: "min",
      billable: "abrechenbar",
      untitled: "(ohne Titel)",
    },
    actions: {
      delete: "Löschen",
      addToSprint: "Zum aktiven Sprint hinzufügen",
      addTime: "Zeit erfassen",
      archive: "Archivieren",
      remove: "Entfernen",
    },
    bulk: {
      title: "Bulk import",
      subtitle:
        "JSON-Array einfügen. Typen müssen in project.typeCodes existieren.",
      knownTypes: "Bekannte Typen: {{types}}",
      jsonLabel: "JSON-Array",
      placeholder: '[{"title":"...", "description":"...", "type":"task"}]',
      cancel: "Abbrechen",
      import: "Importieren",
      errorArray: "JSON muss ein Array von Items sein.",
      errorInvalidJson: "Ungültiges JSON. Bitte ein Array einfügen.",
      errorMissingTitle: "Item #{{index}} hat keinen Titel.",
      errorMissingType: "Item #{{index}} hat keinen Typ.",
      errorUnknownType: 'Item #{{index}} hat unbekannten Typ "{{type}}".',
    },
    toast: {
      imported: "{{count}} Items importiert:",
      closeError: "Fehler schließen",
      closeInfo: "Info schließen",
      closeImport: "Import-Info schließen",
    },
    info: {
      opened: "Datei geöffnet.",
      openedMigrated: "Datei geöffnet und migriert (area → area_id).",
      warnings: "Hinweise:\n- {{warnings}}",
      saved: "Gespeichert.",
      savedAs: "Gespeichert (unter…).",
      autosave: "Auto-Save: gespeichert.",
      openFailed: "Öffnen fehlgeschlagen: {{message}}",
      saveFailed: "Speichern fehlgeschlagen: {{message}}",
      saveAsFailed: "Speichern unter… fehlgeschlagen: {{message}}",
      autosaveFailed: "Auto-Save fehlgeschlagen: {{message}}",
      invalidData: "Datei enthält ungültige Daten:\n- {{errors}}",
    },
    validation: {
      titleRequired: "Titel ist erforderlich.",
      typeMissing: 'Typ "{{type}}" fehlt in project.typeCodes.',
    },
    confirm: {
      deleteItem: '"{{name}}" wirklich löschen?',
    },
    file: {
      noOpenPicker:
        "Dein Browser unterstützt die File System Access API in diesem Kontext nicht. Nutze HTTPS (oder localhost) in Chrome/Edge/Brave oder später Electron/Tauri.",
      noHandle: "Keine Datei geöffnet.",
      noSavePicker: "showSaveFilePicker wird von deinem Browser nicht unterstützt.",
    },
    legal: {
      linkGithub: "GitHub",
      linkGuide: "Einstieg",
      linkImprint: "Impressum",
      linkPrivacy: "Datenschutz",
      titleGuide: "Einstieg",
      titleImprint: "Impressum",
      titlePrivacy: "Datenschutz",
      backToApp: "Zurück zur App",
      downloadExampleJson: "Beispiel-JSON herunterladen",
      guide: `## Einstiegsdokumentation

Hier bekommst du einen praktischen Einstieg mit einer vollständigen Beispiel-Projektdatei für My Board.

## Enthaltene Beispieldatei

- Datei: \`board-complex-example.json\`
- Enthält: Projekt-Meta, Type-Codes, Areas, Sprints, Item-Verknüpfungen und Zeiterfassungen
- Deckt alle Standard-Spalten ab: backlog, todo, doing, done, archived

## Empfohlener Einstieg

1. Beispiel-JSON über den Button oben herunterladen  
2. In der App über **Datei öffnen** laden  
3. Karten per Drag & Drop verschieben  
4. Karten bearbeiten, Zeiterfassung ergänzen und speichern

## Hinweise

- My Board schreibt Änderungen zurück in die geöffnete JSON-Datei.
- Interne Client-Felder werden in JSON-Dateien nicht benötigt.`,
      imprint: `## Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)

{{contact}}

## Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV

{{name}}

## Haftung für Inhalte

Die Inhalte dieser App bzw. Website wurden mit größtmöglicher Sorgfalt erstellt.
Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.

Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
Eine Verpflichtung zur Überwachung übermittelter oder gespeicherter fremder Informationen besteht jedoch nicht.

## Haftung für Links

Dieses Angebot enthält derzeit keine externen Links.
Sollte das Angebot künftig Links zu externen Websites enthalten, gilt:
Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.`,
      privacy: `## Verantwortliche Stelle

{{contact}}

## Hosting

Diese Website wird bei der STRATO AG, Otto-Ostrowski-Straße 7, 10249 Berlin, Deutschland, gehostet.

STRATO stellt die technische Infrastruktur zur Verfügung, um die Website auszuliefern.

Beim Aufruf der Website werden durch STRATO automatisch folgende technische Daten verarbeitet:

* IP-Adresse
* Datum und Uhrzeit des Zugriffs
* Informationen zum verwendeten Browser und Betriebssystem
* abgerufene Seiten / Dateien

Diese Daten sind technisch erforderlich, um die Website bereitzustellen, die Systemsicherheit zu gewährleisten und Angriffe abzuwehren.

Die Verarbeitung erfolgt auf Grundlage von
Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und zuverlässigen Betrieb der Website).

## Datenverarbeitung innerhalb der Europäischen Union

Die Verarbeitung personenbezogener Daten erfolgt ausschließlich innerhalb der Europäischen Union.
Eine Übermittlung in Drittländer findet nicht statt.

## Keine Analyse- oder Tracking-Tools

Diese Website verwendet keine Cookies, keine Analyse-Tools und kein Tracking.

## Lokale Verarbeitung

Die Anwendung verarbeitet Projektdateien ausschließlich lokal im Browser.
Es werden keine Projektinhalte an einen Server übertragen oder gespeichert.

## Ihre Rechte

Sie haben das Recht auf:

- Auskunft über Ihre personenbezogenen Daten  
- Berichtigung oder Löschung  
- Einschränkung der Verarbeitung  
- Datenübertragbarkeit  
- Widerspruch gegen die Verarbeitung  
- Beschwerde bei einer Datenschutzaufsichtsbehörde`,
    },
  },
};
