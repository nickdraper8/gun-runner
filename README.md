# [Gun Runner](https://nickdraper8.github.io/gun-runner/): A browser game by Nick Draper

<img align="left" src="./7vxxne.gif" alt="player-running-gif">

## Background
Gun Runner is a sidescroller shooter where the player is able to jump over objects and shoot at enemies to clear their path. The player's character is static while the world moves towards them, having the player dodge incoming obsticles by jumping over indestructable trees and shooting detroyable enemies flying above.

<br><br/>
<p align="center"><img src="./gunrunnerevensmaller.gif" alt="gameplay-gif"></p>
<br><br/>

## Architecture and Technologies
This project was constructed with the following technologies:
* `JavaScript` for the game logic
* `HTML Canvas` for rendering objects on the game view
* `CSS` to give some style to the UI and website holding the canvas
* `Webpack` to bundle js files

In addition to the entry file, there are multiple scripts involved in this project:
* `game_view.js`: this handles the logic for and creating and updating the necessary elements and rendering them to the DOM. Holds instances of `Game`, creates a `canvas` context and installs key listeners to move your player and fire bullets.
* `moving_object.js`: this handles logic and drawing for basic movement of objects that will be moving anywhere inside the game view.
* `animated_object.js`: this handles logic and drawing for objects that will be animated using sprite sheets. A subclass of `MovingObject`.
* `static_sprite_object.js`: This handles logic and drawing for objects that are not animated but are drawn using an image file. A subclass of `MovingObject`.
* `player.js`: this handles user input and is updated based on that user input and interations with other elements. A subclass of `AnimatedObject`.
* `bullet.js`: kills enemies. A `MovingObject` subclass.
* `obsticle.js`: this lightweight script houses the constructor and update functions for `Obsticle` objects. A `StaticSpriteObject` subclass.
* `enemy.js`: this script houses the constructor and update functions for `Enemy` objects. An `AnimatedObject` subclass.
* `game.js`: holds general structure, logic and rendering functions for the game

## Assets Used
Here is a list of recourses I used and the sources of where they came from:

### Sprites and Art:
- Enemy sprites
    - https://imonk.itch.io/plasma-drone
- Player sprites
    - https://secrethideout.itch.io/team-wars-platformer-battle
- Background
    - https://www.pinterest.com/pin/466896686362782654/
- Obstacle sprites
    - https://www.pixilart.com/art/slay-the-king-tree-sprite-not-mine-came-from-a-stamp-a8230269374df1
- Gun UI icon
    - https://kaylousberg.itch.io/
- Lightning Bolt UI Icon
    - http://pixelartmaker.com/art/a9f00c9246bf3dd

### Icons
- https://fontawesome.com/

### Sounds
- Victory horns
    - https://freesound.org/people/FunWithSound/sounds/456966/
- Enemy Explosion
    - https://www.freesoundeffects.com/free-sounds/explosion-10070
- All others
    - Royalty free music from https://www.fesliyanstudios.com
