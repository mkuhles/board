# Board

Board is a lightweight, local-first Kanban board for managing projects using JSON files.  
Items are displayed as cards and can be moved between columns or reordered via drag & drop.  
All changes are written back into the opened JSON file.

The goal of the project is to keep project planning simple, transparent, and fully local without requiring a backend or cloud service.

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
````

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

## Project File Format (.json)

A project is stored as a JSON file containing a list of items.

Example:

```json
{
  "name": "NochDa",
  "typeCodes": {
    "user_story": "US",
    "tech_task": "TECH"
  },
  "areas": [
    { "id": "auth", "title": "Authentication", "number": 1 }
  ],
  "items": [
    {
      "id": "US1",
      "type": "user_story",
      "title": "Implement login",
      "description": "Users can log into the system",
      "area": "auth",
      "relates_to": ["US2"],
      "status": "todo",
      "order": 0
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
| `area`        | Feature/module area                         |
| `relates_to`  | Related item IDs                            |
| `status`      | Column where the item appears               |
| `order`       | Position inside a column                    |


## Status Columns

Default statuses:

```js
[
  "backlog",
  "todo",
  "doing",
  "done"
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
