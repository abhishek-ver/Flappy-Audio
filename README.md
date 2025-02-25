Flappy Bird Voice Control

This project is a Flappy Bird clone controlled using voice input. The game utilizes microphone input to make the bird jump, allowing for a hands-free experience.

Features

Voice Control: The bird jumps based on microphone input volume.

Dynamic Pipe Generation: Pipes appear at random heights with a fixed gap.

Collision Detection: The game ends if the bird collides with a pipe or falls off the screen.

Score Tracking: The player earns points for passing through pipes.

Restart Functionality: Restart the game after a game-over event.

How It Works

The game initializes the board, bird, and pipes.

The microphone input is processed using the Web Audio API.

When a loud enough sound is detected, the bird jumps.

Gravity pulls the bird down over time.

Pipes move from right to left, and the game tracks collisions.

The score increases when the bird successfully passes a pipe.

The game ends when the bird collides with a pipe or falls out of bounds.

A restart button appears upon game over.

Installation

Clone this repository:

git clone https://github.com/your-username/flappy-bird-voice.git

Open the index.html file in a browser.

Dependencies

HTML5 Canvas API

JavaScript (ES6+)

Web Audio API (for microphone input)

Controls

Speak or make a noise into the microphone to make the bird jump.

The game starts automatically after allowing microphone access.

File Structure

flappy-bird-voice/
│── index.html          # Main game file
│── script.js           # Game logic and event handling
│── styles.css          # Styling (if any)
│── flappybird.png      # Bird sprite
│── toppipe.png         # Top pipe sprite
│── bottompipe.png      # Bottom pipe sprite
│── qw.png              # Game over image
│── README.md           # Project documentation

Troubleshooting

If the game does not respond to voice input, check microphone permissions.

Ensure the browser supports the Web Audio API.

Adjust the volume threshold in startVoiceRecognition() if jumps are too sensitive or unresponsive.

License

This project is open-source under the MIT License. Feel free to modify and improve!

Contributors

Your Name

Syed Aashiq Ahmed
