# angular-moment-input

Parses date/time from input using moment

## Usage

Obtain module
```sh
$ bower install --save angular-moment-input
```

Add module dependency to angular app
```js
angular.module('...', ['angular-moment-input'])
```

Use directive `ng-moment-input` (together with an `ng-model`)
```html
<input ng-model="..." ng-moment-input="config">
```

## Configuration
The `config` object is optional. The following keys are supported:

- `formats`
    An array of [moment.js formats](http://momentjs.com/docs/#/parsing/string-format/). The first one is used for rendering the model value. All formats are used for parsing. Defaults to `YYYY-MM-DD`.

- `strict`
    Enable/disable strict parsing. Defaults to `true`.

- `moment`
    The moment parse function to use. Specify [`moment.utc`](http://momentjs.com/docs/#/parsing/utc/) for parsing in UTC mode. Defaults to `moment`.
