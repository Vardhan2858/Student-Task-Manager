# Student Task Manager

A React application that demonstrates dynamic DOM updates and event handling concepts through a practical task management interface.

## Overview

Student Task Manager allows users to add and manage academic tasks with the following fields:

- Task name
- Subject
- Priority (High, Medium, Low)
- Due date
- Description

Tasks are rendered dynamically and can be completed, edited, deleted, and filtered in real time.

## Key Features

- Add new tasks through a controlled form
- Edit existing tasks and update values in the same form
- Mark tasks as completed or pending
- Delete tasks instantly
- Live search by task name while typing
- Color-coded priority badges and left border indicators:
	- High: red
	- Medium: orange
	- Low: green
- Completed task visual state turns green
- Mouse hover effect on task items using pointer position
- Responsive layout for desktop and mobile screens

## React DOM Concepts Demonstrated

This project intentionally applies common DOM event handling patterns in React:

- onSubmit: form submission for creating and updating tasks
- onChange: synchronized form and search input state updates
- onClick: complete, edit, delete, cancel, and submit actions
- onKeyDown: Enter key support for adding tasks from inputs
- Mouse events:
	- onMouseEnter
	- onMouseLeave
	- onMouseMove

## Tech Stack

- React 19
- Vite 8
- ESLint 9

## Getting Started

### Prerequisites

- Node.js (recommended current LTS)
- npm

### Installation

1. Install dependencies:

	 npm install

2. Start the development server:

	 npm run dev

3. Open the local URL shown in the terminal.

## Available Scripts

- npm run dev: run in development mode
- npm run build: create production build
- npm run preview: preview production build locally
- npm run lint: run ESLint checks

## Project Structure

- src/App.jsx: component logic, state, and event handlers
- src/App.css: component styling and interaction visuals
- src/index.css: global base styles and page background

## Notes

- Data is stored in React state only and resets on page refresh.
- Task filtering is currently based on task name.
