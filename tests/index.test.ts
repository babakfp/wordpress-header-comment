import { expect, test } from "vitest"
import { match, parse, stringify } from "../src/index.ts"

const comment = `/**
 * Plugin Name: ...
 * Version: ...
 * Description: ...
 */`

const headers = {
    "Plugin Name": "...",
    Version: "...",
    Description: "...",
}

test("parse", () => {
    expect(parse(comment)).toStrictEqual(headers)
})

test("stringify", () => {
    expect(stringify(headers)).toBe(comment)
})

test("stringify - gap 0", () => {
    expect(stringify(headers, { gap: 0 })).toBe(`/**
 * Plugin Name: ...
 * Version:     ...
 * Description: ...
 */`)
})

test("stringify - gap 10 - 1", () => {
    expect(stringify(headers, { gap: 10 - 1 })).toBe(`/**
 * Plugin Name:          ...
 * Version:              ...
 * Description:          ...
 */`)
})

test("match and replace", () => {
    const phpContent = `<?php
${comment}
?>`
    const phpContentHeaders = parse(phpContent)

    phpContentHeaders["Plugin Name"] = "???"
    phpContentHeaders["Version"] = "???"
    phpContentHeaders["Description"] = "???"

    const phpContentComment = stringify(phpContentHeaders)

    const { before, after } = match(phpContent)

    const modifiedPhpContent = before + phpContentComment + after

    expect(modifiedPhpContent).toBe(`<?php
/**
 * Plugin Name: ???
 * Version: ???
 * Description: ???
 */
?>`)
})
