#Pushups-pullups reminder

###About

This is a simple workout app to track workout activities and display a reminder notification for activities if the user has not entered activity data by a certain time. I created this app to remind me to do pushups and pullups every day, but it can be extended to any workout activity with sets/reps.

###Disclaimer

> Consult a physician before using this app or starting any exercise program. Any exercise program may result in injury. By using this app, you assume the risk of any resulting injury and agree to not hold the authors of this app liable for any damages. This app is for informational and entertainment purposes only.  It is your responsibility to evaluate your own medical and physical condition.

**tl;dr:** if you hurt yourself using this app, it is your own fault and you agree not to hold the authors liable for any damages.

###Building the app from source

1. Download and install [nodejs LTS](https://nodejs.org/en/download/) if not already installed.
2. Install ionic globally via npm at the command line with `npm install -g ionic`
3. `git clone` this repository and `cd` into the cloned directory.
4. `npm install` then
5. `ionic cordova build android`  or `ionic cordova build ios`
6. The android build will `err`, due to incompatabilities with ionic 3 and the notification plugin. We must force the build to Android API 26. Open /platforms/android/project.properties and change `target=android-25` to `target=android-26`
7. Re-run `ionic cordova build android`

### License
MIT License
