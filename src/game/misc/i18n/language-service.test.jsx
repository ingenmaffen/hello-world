import { getLanguageKeys } from "./language-service.mjs";


test("getLanguageKeys()", () => {
    const en = getLanguageKeys();
    expect(en.BACK).toBe("Back");
});