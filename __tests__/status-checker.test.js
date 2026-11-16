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

  test("Returns false for a game in progress", () => {
    const board = [
      ["X", "O", "_"],
      ["_", "X", "_"],
      ["O", "_", "_"],
    ];
    expect(isGameOver(board)).toBe(false);
  });
});

describe("rows", () => {
  test.each([0, 1, 2])("X wins with row %i", (r) => {
    const board = empty();
    board[r] = ["X", "X", "X"];
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("X has won the game!\n");
  });

  test("O wins with a row", () => {
    const board = empty();
    board[i] = ["O", "O", "O"];
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("O has won the game!\n");
  });

  test("Two in a row is not a win", () => {
    const board = empty();
    board[0] = ["X", "X", "_"];
    expect(isGameOver(board)).toBe(false);
  });
});
