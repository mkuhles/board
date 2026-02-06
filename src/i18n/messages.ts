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
        "Browser support missing. Use Chrome/Edge/Brave or later Electron/Tauri.",
      open: "Open file",
      save: "Save",
      saveAs: "Save as…",
      language: "Language",
    },
    empty: {
      openFilePrefix: "Click",
      openFileSuffix: "and choose your",
      title: "What this app does",
      description:
        "A lightweight agile board that reads and writes a local JSON file. You can drag items, edit details, track time, and keep everything in one file.",
      howtoTitle: "How to use",
      howtoStep1: "Open a JSON file or create a new one from the example below.",
      howtoStep2: "Move cards by drag & drop and edit them in the modal.",
      howtoStep3: "Save to write changes back to your JSON file.",
      exampleTitle: "Minimal JSON example",
      exampleHint:
        "You can give this to an AI to fill it with items.",
      multiFiles: "Later you can select multiple project files.",
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
        "Your browser does not support the File System Access API. Use Chrome/Edge/Brave or later Electron/Tauri.",
      noHandle: "No file opened.",
      noSavePicker: "showSaveFilePicker is not supported by your browser.",
    },
    legal: {
      linkImprint: "Imprint",
      linkPrivacy: "Privacy",
      titleImprint: "Imprint",
      titlePrivacy: "Privacy Policy",
      backToApp: "Back to app",
      imprint: `# Imprint

**Information according to § 5 TMG**

{{contact}}

**Responsible for content (according to § 18 Abs. 2 MStV)**

{{name}}

**Liability for content**

As a service provider, we are responsible for our own content on these pages according to § 7 Abs. 1 TMG and general laws. According to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or investigate circumstances that indicate illegal activity.

**Liability for links**

This site currently contains no external links. If that changes, the following applies: We assume no liability for the content of external websites. The respective provider or operator is always responsible for the content of linked pages.`,
      privacy: `# Privacy Policy

**Controller**

{{contact}}

**Hosting**

This website is hosted on statichost.eu. When you visit the site, the hosting provider processes technical access data (e.g. IP address, timestamp, requested URL, user agent) in server log files to ensure operation and security.

**No analytics or tracking**

This website uses no cookies, no analytics tools, and no tracking.

**Local processing**

The app processes project files locally in your browser. No project data is sent to any server.

**Your rights**

You have the right to access, rectification, erasure, restriction of processing, and data portability. You also have the right to lodge a complaint with a data protection authority.`,
    },
  },
  de: {
    topbar: {
      title: "Projekt {{name}}",
      subtitle: "Lokales JSON öffnen → verschieben → speichern",
      unsupported:
        "Browser-Support fehlt. Nutze Chrome/Edge/Brave oder später Electron/Tauri.",
      open: "Datei öffnen",
      save: "Speichern",
      saveAs: "Speichern unter…",
      language: "Sprache",
    },
    empty: {
      openFilePrefix: "Klick auf",
      openFileSuffix: "und wähle deine",
      title: "Was diese App macht",
      description:
        "Ein leichtgewichtiges agiles Board, das eine lokale JSON‑Datei liest und schreibt. Du kannst Items verschieben, Details bearbeiten, Zeit erfassen und alles in einer Datei halten.",
      howtoTitle: "So benutzt du es",
      howtoStep1: "Öffne eine JSON‑Datei oder erstelle eine neue anhand des Beispiels unten.",
      howtoStep2: "Verschiebe Karten per Drag & Drop und bearbeite sie im Modal.",
      howtoStep3: "Speichern schreibt die Änderungen zurück in die JSON‑Datei.",
      exampleTitle: "Minimales JSON‑Beispiel",
      exampleHint:
        "Das kannst du einer KI geben, damit sie Items ergänzt.",
      multiFiles: "Später kannst du mehrere Projektdateien auswählen.",
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
        "Dein Browser unterstützt die File System Access API nicht. Nutze Chrome/Edge/Brave oder später Electron/Tauri.",
      noHandle: "Keine Datei geöffnet.",
      noSavePicker: "showSaveFilePicker wird von deinem Browser nicht unterstützt.",
    },
    legal: {
      linkImprint: "Impressum",
      linkPrivacy: "Datenschutz",
      titleImprint: "Impressum",
      titlePrivacy: "Datenschutz",
      backToApp: "Zurück zur App",
      imprint: `# Impressum

**Angaben gemäß § 5 TMG**

{{contact}}

**Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV**

{{name}}

**Haftung für Inhalte**

Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.

**Haftung für Links**

Unser Angebot enthält keine externen Links. Sollte sich das ändern, gilt: Für Inhalte externer Seiten übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.`,
      privacy: `# Datenschutzerklärung

**Verantwortliche Stelle**

{{contact}}

**Hosting**

Diese Website wird bei statichost.eu gehostet. Beim Aufruf der Website verarbeitet der Hosting-Anbieter technische Zugriffsdaten (z. B. IP-Adresse, Zeitpunkt, aufgerufene URL, User-Agent) in Server-Logfiles, um den Betrieb und die Sicherheit zu gewährleisten.

**Keine Analyse- oder Tracking-Tools**

Diese Website verwendet keine Cookies, keine Analytics-Tools und kein Tracking.

**Lokale Verarbeitung**

Die Anwendung verarbeitet Projektdateien lokal im Browser. Es werden keine Projektinhalte an einen Server übertragen.

**Ihre Rechte**

Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Außerdem haben Sie das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde.`,
    },
  },
};
