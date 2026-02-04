# Board

Board is a lightweight, local-first Kanban board for managing projects using JSON files.  
Items are displayed as cards and can be moved between columns or reordered via drag & drop.  
All changes are written back into the opened JSON file.

The goal of the project is to keep project planning simple, transparent, and fully local without requiring a backend or cloud service.

## Quickstart

1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`
3. Open the app and load a project file via **"Open file"**.

## Features

- Kanban board with drag & drop
- Reordering cards within columns
- Moving cards between status columns
- Automatic saving back to the project JSON
- Collapsible backlog column for better focus
- Fully local usage (no server required)
- JSON-based project format, easy to version with Git

## Requirements

The app uses the **File System Access API**, which is currently supported mainly in Chromium-based browsers.

Recommended browsers:

- Chrome
- Edge
- Brave

Limited or no support:

- Firefox
- Safari

The project can later be packaged as a desktop app (e.g. Electron or Tauri) to avoid browser limitations.

## Running the Project

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the app in the browser and load a project file using **"Open file"**.


## Project Structure

Simplified overview:

```
src/
  components/     UI components (Board, Column, Cards)
  hooks/          Application and board state logic
  lib/            Project and file handling logic
  constants/      Status definitions
  App.jsx         Main application entry
```

## Board Actions (UI Pattern)

The board uses a context (`BoardActionsContext`) to avoid prop drilling.
Components like `ItemCard` and `DraggableItem` read actions (edit, delete, add time, add to sprint)
from context instead of receiving them via multiple layers of props.

## Project File Format (.json)

A project is stored as a JSON file containing a list of items.

Example:

```json
{
  "name": "NochDa",
  "meta": {
    "activeSprintId": "all"
  },
  "typeCodes": {
    "user_story": { "label": "User Story", "prefix": "US" },
    "tech_task": { "label": "Tech Task", "prefix": "TECH" }
  },
  "areas": [
    { "id": "auth", "title": "Authentication", "number": 1 }
  ],
  "sprints": [
    { "id": "sprint-1", "title": "Sprint 1", "start": "2026-02-01", "end": "2026-02-14" }
  ],
  "items": [
    {
      "id": "US1",
      "type": "user_story",
      "title": "Implement login",
      "description": "Users can log into the system",
      "area_id": "auth",
      "relates_to": ["US2"],
      "status": "todo",
      "order": 0,
      "sprintId": "sprint-1",
      "created_at": "2026-02-03T12:00:00.000Z",
      "updated_at": "2026-02-03T12:30:00.000Z",
      "time_entries": [
        {
          "start_at": "2026-02-03T12:00:00.000Z",
          "minutes": 30,
          "comment": "Auth flow",
          "tags": ["dev"],
          "billable": true
        }
      ]
    }
  ]
}
```
## Areas

Areas represent functional or structural parts of the project.

Each area contains:

| Field    | Description                           |
| -------- | ------------------------------------- |
| `id`     | slug identifier (stable reference)    |
| `title`  | display name                          |
| `number` | numeric identifier used in ticket IDs |

Example:

```json
{ "id": "auth", "title": "Authentication", "number": 1 }
```

Items reference areas using:

```json
"area_id": "auth"
```

instead of free-text fields.

## Sprints

Sprints are optional and can be used to group items by timebox.

Example:

```json
{ "id": "sprint-1", "title": "Sprint 1", "start": "2026-02-01", "end": "2026-02-14" }
```

## Item Fields

### Required Fields

| Field   | Description       |
| ------- | ----------------- |
| `id`    | Unique identifier |
| `title` | Card title        |


### Optional Fields

| Field         | Description                                 |
| ------------- | ------------------------------------------- |
| `type`        | Item type, e.g. `task`, `bug`, `user_story` |
| `description` | Detailed description                        |
| `area_id`     | Feature/module area (slug)                  |
| `relates_to`  | Related item IDs                            |
| `status`      | Column where the item appears               |
| `order`       | Position inside a column                    |
| `sprintId`    | Sprint id                                   |
| `created_at`  | Creation timestamp (ISO)                    |
| `updated_at`  | Update timestamp (ISO)                      |
| `time_entries`| Array of time tracking entries              |

### Time Entry Fields

| Field      | Description                    |
| ---------- | ------------------------------ |
| `start_at` | Start time (ISO)               |
| `minutes`  | Duration in minutes            |
| `comment`  | What was done                  |
| `tags`     | Tag list, e.g. `["dev"]`       |
| `billable` | Boolean                        |


## Status Columns

Default statuses:

```js
[
  "backlog",
  "todo",
  "doing",
  "done",
  "archived"
]
```

Their order defines the column order in the board.

Additional statuses can be added easily in the configuration.

## Status Behavior

### status

Determines in which column the item appears.

Example values:

```
backlog
todo
doing
done
```

If missing, the default status is:

```
backlog
```

### order

Defines the card position within a column.

The board automatically recalculates order when cards are moved:

```
0 = first card
1 = second card
...
```

Normally, this value does not need to be edited manually.

## Typical Workflow

1. Open a project file.
2. New ideas land in Backlog.
3. Move tasks to ToDo when ready.
4. Active work stays in Doing.
5. Finished work goes to Done.
6. Collapse Backlog to improve focus.

## Automatic Area Migration

When opening an older or new generated project file that still uses:

```json
"area": "Authentication"
```

the application automatically:

1. Extracts area numbers from existing ticket IDs.
2. Creates entries in `areas`.
3. Generates slugs.
4. Replaces `area` with `area_id`.
5. Saves the migrated project back to disk.

This happens transparently when opening a project.

## Validation on Load

When opening a project file, the app validates required fields:

- Missing `item.id` or `item.title` is an error and blocks opening.
- Missing `item.type` is an error if `typeCodes` are defined.
- Missing sprint or area metadata is a warning (the file still opens).

Warnings are shown in the UI info banner.

## Ticket ID Structure

New ticket IDs use a simple format:
```
<TYPECODE><NUMBER>
```

Examples:

- `US1`, `US2`, `US3`
- `TECH1`, `TECH2`

The counter increments per type (`US` and `TECH` have separate sequences).

### Backward compatibility

Older projects may contain legacy IDs such as `US1.3`. These are kept as-is.
Only newly created items will receive the new ID format.

## Possible Future Improvements

Potential enhancements:

* Undo deletion
* Drag handle support
* Filtering and search
* Multiple project handling
* Labels or tags
* Sprint mode
* Desktop app packaging

## Philosophy

The board is designed to be:

* simple
* local-first
* backend-free
* version-control friendly
* quick to start using

## Development Note

This project is intentionally **vibe-coded**.

That means development focuses on fast iteration, experimentation, and incremental improvement rather than strict upfront architecture or enterprise-level planning. Features evolve based on usage and practical needs.

Refactoring and structural improvements are expected as the project grows.

## License

Free to use and modify.
