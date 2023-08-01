# Minitaur Maze - Game Demo.


Hia!
This is a board game I built in... react. 

> ...why?

*Its for my portfolio, ok.* :cry:

[PLAY IT!](https://minitaurmaze.netlify.app/)


## The game

I think the game is an improvement on the amazing labyrinth.
It adds more complexity asymmetrical gameplay, namely the minotaur player trying to 'capture' you.

Its a neat toy for a minute.
However, its not something I can see myself playing again and again.
So I think I'll leave it here.

It was fun to build.

## Fun code things

### Array Board

I enjoyed making the board, and writting code to traverse it.

Behind the scenes the board data is an 'Array' that represents the grid.

A 9x9 could look like:
```js
[ 0,1,2,
  3,4,5,
  6,7,8,
        9 ]
// each number is the .id of the tile.
// in practice there is more data in each cell.
```

It can be accessed with a `x, y` position simply by multiplying `y` by the width.
```js
board[x + y * w]
```
Lately I've been finding tricks like this neat, ever since taking the Data Structures course by ThePrimeagen.
I keep wondering what else can be represented as an array with a little math.
At some point I want to try implementing a hexagon board.


