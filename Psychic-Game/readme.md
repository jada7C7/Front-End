# Project Notes :crystal_ball:
## The app randomly picks a letter, and the user has to guess which letter the app chose.

1. Wins - Number of times the user has guessed the letter correctly
2. Losses - Number of times the user has failed to guess the letter correctly after exhausting all guesses
3. Guesses Left - Number of guesses left. The user has 9 tries to guess the computer's letter. This value will dynamically update on the page.
4. Your Guesses So Far - The specific letters that the user typed. These are dynamically displayed on each keyUp event until the user either wins or loses.
5. When the player wins, the Wins counter is increased and the game will start over without refreshing the page.
6. When the player loses, the Losses counter is increased and the game will start over without refreshing the page.



