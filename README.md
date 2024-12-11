# WordPress Header Comment

A simple utility to parse and stringify WordPress header comments.

```bash
npm i wordpress-header-comment
```

## Usage

```js
import { parse, stringify } from "wordpress-header-comment"

parse()
stringify()
```

## Examples

### Parse

From:

```
/**
 * Plugin Name: ...
 * Version: ...
 * Description: ...
 */
```

To:

```js
{
    "Plugin Name": "...",
    Version: "...",
    Description: "..."
}
```

### Stringify

From:

```js
{
    "Plugin Name": "...",
    Version: "...",
    Description: "..."
}
```

To:

```
/**
 * Plugin Name: ...
 * Version: ...
 * Description: ...
 */
```
