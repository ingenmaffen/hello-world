import { decreaseForceValue } from "./common.mjs";

test("decreaseForceValue()", () => {
    expect(decreaseForceValue(5, 0.2)).toBe(4.8);
});

// TODO: create test for everything else