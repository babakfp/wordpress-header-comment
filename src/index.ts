/**
 * Parse a WordPress header comment into a JavaScript object.
 *
 * From:
 *
 * ```
 * /**
 *  * Plugin Name: ...
 *  * Version: ...
 *  * Description: ...
 *  *‌/
 * ```
 *
 * To:
 *
 * ```js
 * {
 *     "Plugin Name": "...",
 *     Version: "...",
 *     Description: "..."
 * }
 * ```
 */
export const parse = (text: string) => {
    const regex = /\/\*\s*([\s\S]*?)\s*\*\//
    const match = text.match(regex)

    if (!match) return {}

    const headerContent = match[1]

    const headerLines = headerContent.split("\n")
    const headers: Record<string, string> = {}

    headerLines.forEach((line) => {
        const [key, ...valueParts] = line.split(":")

        if (key && valueParts.length > 0) {
            const value = valueParts.join(":").trim()
            headers[key.replace("*", "").trim()] = value.trim()
        }
    })

    return headers
}

/**
 * Stringify a JavaScript object into a WordPress header comment.
 *
 * From:
 *
 * ```js
 * {
 *     "Plugin Name": "...",
 *     Version: "...",
 *     Description: "..."
 * }
 * ```
 *
 * To:
 *
 * ```
 * /**
 *  * Plugin Name: ...
 *  * Version: ...
 *  * Description: ...
 *  *‌/
 * ```
 */
export const stringify = (
    headers: Record<string, string>,
    options?: {
        /**
         * Align key-value pairs like a table, with a gap of `n` spaces. Using
         * `0` will align all key-value pairs on the same line with a single
         * space between them.
         */
        gap?: number
    },
) => {
    const headerLines: string[] = []

    const highestKeyCharLength = Math.max(
        ...Object.entries(headers).map(([key]) => key.length),
    )

    for (const [key, value] of Object.entries(headers)) {
        if (options?.gap !== undefined) {
            const gapWhitespace = " ".repeat(
                highestKeyCharLength + 1 - key.length + options.gap,
            )
            headerLines.push(` * ${key}:${gapWhitespace}${value}`)
        } else {
            headerLines.push(` * ${key}: ${value}`)
        }
    }

    return ["/**", headerLines.join("\n"), " */"].join("\n")
}
