import { expect, jest, test } from "@jest/globals";
import { isGameOver } from "../status-checker";

const empty = () => [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];

// moved from isGameOver function
let logSpy;
beforeEach(() => {
  logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => {
  logSpy.mockRestore();
});

describe("isGameOver", () => {
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
    board[1] = ["O", "O", "O"];
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("O has won the game!\n");
  });

  test("Two in a row is not a win", () => {
    const board = empty();
    board[0] = ["X", "X", "_"];
    expect(isGameOver(board)).toBe(false);
  });
});

describe("columns", () => {
  test.each([0, 1, 2])("O wins with column %i", (c) => {
    const board = empty();
    for (let r = 0; r < 3; r++) board[r][c] = "O";
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("O has won the game!\n");
  });

  test("X wins with a column", () => {
    const board = empty();
    for (let r = 0; r < 3; r++) board[r][2] = "X";
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("X has won the game!\n");
  });

  test("A mixed column is not a win", () => {
    const board = empty();
    board[0][0] = "X";
    board[1][0] = "O";
    board[2][0] = "X";
    expect(isGameOver(board)).toBe(false);
  });
});

describe("diagonals", () => {
  test("X wins top-left to bottom-right", () => {
    const board = empty();
    board[0][0] = board[1][1] = board[2][2] = "X";
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("X has won the game!\n");
  });

  test("O wins top-right to bottom-left", () => {
    const board = empty();
    board[0][2] = board[1][1] = board[2][0] = "O";
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("O has won the game!\n");
  });

  test("A broken diagonal is not a win", () => {
    const board = empty();
    board[0][0] = "X";
    board[1][1] = "O";
    board[2][2] = "X";
    expect(isGameOver(board)).toBe(false);
  });

  test("A full board with no winner is a tie", () => {
    const board = [
      ["X", "O", "X"],
      ["X", "O", "O"],
      ["O", "X", "X"],
    ];
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(/Game Over/);
  });

  test("A win on the last square is reported as a win, not a tie", () => {
    const board = [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["O", "X", "X"],
    ];
    expect(isGameOver(board)).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("X has won the game!\n");
  });
});
