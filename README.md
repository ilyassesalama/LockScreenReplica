# LockScreenReplica
This project was made to reproduce how students can cheat in logtime in 42 schools to help the staff prevent students from using this way to accumulate logtime without them being present and using their sessions. The project uses `React.js` and `Electron` frameworks to replicate the lock screen of MacOS Catalina.

> [!Caution]
> **This script was made just for demonstration. Using this script in the school machines will result in suspending your scholarship for 3 months or permanently.**

## How it works?
Since the school already had defenses from other ways to prevent students from cheating in logtime such as using `caffeinate`, black screen, and so on. I needed to find a way that can't be detected. The solution is to use something that can control the OS itself, but act like a website(?) running in a browser. The solution is to combine both React.js and Electron. 

- `React.js`: I used this framework since it's easy and straightforward to make UIs and handle states correctly instead of using vanilla JS, HTML, and CSS.
- `Electron`: Since we need to control the OS, we can use this framework since it allows us to override actions such as `Ctrl + C`, `⌘ + tab`, `Ctrl + arrows`, and so on. Using Electron in `kiosk` mode will help making the app unable to exit, or even lock the iMac lock screen.

## How does it look?
https://github.com/ilyassesalama/LockScreenReplica/assets/46769766/81173e24-66e6-4b4a-bd36-0c0190c3c07d

After the script runs, it can never be exited. I used a shortcut (I assigned in the code) to kill the app at the end of the video to exit.

## Disclaimer
Once again, This script was made just for demonstration *ONLY*. I'm not responsible if you get suspended or something.
