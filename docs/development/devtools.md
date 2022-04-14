## Enabling/using devtools in spicetify >= 2.9.3

### Windows

1. Start by finding your preferred Spotify shortcut. Right click this shortcut and enter properties, inside of the "target" text box, at the very end of the path, add a space and type in "--remote-debugging-port=9222". Apply and close.
2. Navigate to Google Chrome and in the address tab type "chrome://inspect", click on the box that says 
"port forwarding". In the new menu there will be a table of values, on a new line, in the first box input the port "9222" and the second box "localhost:9222", leave port forwarding DISABLED and press done.
3. After that providing you have Spotify open; you should see it in the list of connected targets. Press the inspect button and voila!

### Linux
1. Locate your Spicetify config using the command `spicetify config-dir` and enter `spotify_launch_flags = --remote-debugging-port=9222`
2. Open google chrome and go to "chrome://inspect" and Spotify should pop up, from there press inspect.
3. If Spotify does not pop up click on the box that says, "port forwarding". In the new menu there will be a table of values, on a new line, in the first box input the port "9222" and the second box "localhost:9222", leave port forwarding DISABLED and press done.

## How to use devtools
TBA

## Tips, tricks, and general knowledge
TBA
