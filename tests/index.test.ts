import { expect, test } from "vitest"
import { parse, stringify } from "../src/index.ts"

const headerCommentText = `/**
 * Plugin Name: ...
 * Version: ...
 * Description: ...
 */`

const headerCommentObject = {
    "Plugin Name": "...",
    Version: "...",
    Description: "...",
}

test("parse", () => {
    expect(parse(headerCommentText)).toStrictEqual(headerCommentObject)
})

test("stringify", () => {
    expect(stringify(headerCommentObject)).toBe(headerCommentText)
})
