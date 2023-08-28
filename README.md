# Streaker
Keep streaks for various things! https://Rayquaza01.github.io/Streaker

![Screenshot from 2023-04-23 16-21-14](https://user-images.githubusercontent.com/22138871/233864942-fc0de2ab-fb1e-4148-ac81-18a4f55fcfd9.png)

## Usage

When you open the site, there is a text box labeled "New Streak". Enter a name for your streak and press the plus icon to create it.

On a streak entry, click the checkmark at the bottom left to check in for the day. Each entry will keep track of how many consecutive days you have checked in (your streak), and the longest streak you've had.

Check in every day to keep your streak going! But if you miss a day, your streak will reset to 0!

### Editing and Deleting

On the bottom right of an entry, there is an edit button (pencil) and a delete button (trash). Pressing edit will open a dialog to change the name of the streak. Pressing delete will delete the streak entry.

### Sorting

In the left drawer (accessible from the hamburger menu), there are options for sorting. You can choose to sort by order created, or name. You can also choose whether it should be ascending or descending.

### Import and Export

In the drawer, there are options to import and export the database. Export will download a json file with the current database stored in it, and import will allow you to import a previously exported database.

### Permissions

Streaker uses IndexedDB to store data locally. However, the browser may occasionally clear IndexedDB. The persistant storage permission is used to avoid the browser from clearing IndexedDB. The permission is not required to use the application.

## Building

Dependencies can be installed with `npm install`. The development version can be built with `npm run build:watch`, and the production build can be built with `npm run build:prod`

## Libraries

Using React, Dexie.js, and [Pictogrammers Material Design Icons](https://pictogrammers.com/library/mdi/)
