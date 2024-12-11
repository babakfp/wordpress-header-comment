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

test("stringify - whitespaceGap 0", () => {
    expect(
        stringify(headerCommentObject, {
            whitespaceGap: 0,
        }),
    ).toBe(`/**
 * Plugin Name: ...
 * Version:     ...
 * Description: ...
 */`)
})

test("stringify - whitespaceGap 10 - 1", () => {
    expect(
        stringify(headerCommentObject, {
            whitespaceGap: 10 - 1,
        }),
    ).toBe(`/**
 * Plugin Name:          ...
 * Version:              ...
 * Description:          ...
 */`)
})
