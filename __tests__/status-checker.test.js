import { jest } from "@jest/globals";
import { isGameOver } from "../status-checker";

const empty = () => [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];

describe("isGameOver", () => {
  let logSpy;
  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  test("Returns false for an empty board", () => {
    expect(isGameOver(empty())).toBe(false);
    expect(logSpy).not.toHaveBeenCalled();
  });
});
