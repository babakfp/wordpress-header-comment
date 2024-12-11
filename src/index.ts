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
    try {
        const headerRegex = /\/\*\s*([\s\S]*?)\s*\*\//
        const match = text.match(headerRegex)

        if (!match) {
            return {}
        }

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
    } catch (error) {
        throw new Error("Error reading or parsing the file:", {
            cause: error,
        })
    }
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
        // TODO: add documentation for this option.
        whitespaceGap?: number
    },
) => {
    const headerLines: string[] = []

    const highestKeyCharLength = Math.max(
        ...Object.entries(headers).map(([key]) => key.length),
    )

    for (const [key, value] of Object.entries(headers)) {
        if (options?.whitespaceGap !== undefined) {
            const whitespaceGap = " ".repeat(
                highestKeyCharLength + 1 - key.length + options.whitespaceGap,
            )
            headerLines.push(` * ${key}:${whitespaceGap}${value}`)
        } else {
            headerLines.push(` * ${key}: ${value}`)
        }
    }

    return ["/**", headerLines.join("\n"), " */"].join("\n")
}
