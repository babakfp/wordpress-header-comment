# WordPress Header Comment

A simple utility to parse and stringify WordPress header comments.

- 🪵 [CHANGELOG](/CHANGELOG.md)

## Usage

```bash
npm i wordpress-header-comment
```

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

```
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

#### Alignment

```js
stringify(headers, { gap: 0 })
```

Result:

```
/**
 * Plugin Name: ...
 * Version:     ...
 * Description: ...
 */
```

### Match

```js
import { match, parse, stringify } from "wordpress-header-comment"

const content = `<?php
/**
 * Plugin Name: ...
 * Version: ...
 * Description: ...
 */
?>`

const headers = parse(content)

headers["Plugin Name"] = "???"
headers["Version"] = "???"
headers["Description"] = "???"

const comment = stringify(headers)

const { before, after } = match(content)

const modifiedContent = before + comment + after
```

Result:

```
<?php
/**
 * Plugin Name: ???
 * Version: ???
 * Description: ???
 */
?>
```
