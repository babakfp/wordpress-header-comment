# WordPress Header Comment

A simple utility to parse and stringify WordPress header comments.

```bash
npm i wordpress-header-comment
```

## Usage

### Parse

```js
import { parse } from "wordpress-header-comment"

const comment = `/**
 * Plugin Name: ...
 * Version: ...
 * Description: ...
 */`

parse(comment)
```

Result:

```js
{
    "Plugin Name": "...",
    Version: "...",
    Description: "..."
}
```

### Stringify

```js
import { stringify } from "wordpress-header-comment"

const headers = {
    "Plugin Name": "...",
    Version: "...",
    Description: "...",
}

stringify(headers)
```

Result:

```
/**
 * Plugin Name: ...
 * Version: ...
 * Description: ...
 */
```
