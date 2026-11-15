import { validateMove, makeMove } from "../move-maker.js";

describe("validateMove", () => {
  const board = [
    ["X", "_", "_"],
    ["_", "X", "_"],
    ["O", "O", "X"],
  ];

  test("Returns true for an empty position", () => {
    expect(validateMove("1,3", board)).toBe(true);
  });

  test("Returns false for an occupied position", () => {
    expect(validateMove("1,1", board)).toBe(false);
  });

  test("Returns false for an invalid row", () => {
    expect(validateMove("0,1", board)).toBe(false);
  });

  test("Returns false for an invalid column", () => {
    expect(validateMove("1,4", board)).toBe(false);
  });

  test("Returns false for an incorrect format", () => {
    expect(validateMove("2-1", board)).toBe(false);
  });

  test("Returns false if the move has extra numbers", () => {
    expect(validateMove("1,2,3", board)).toBe(false);
  });
});

describe("makeMove", () => {
  test("Places X in the correct position", () => {
    const board = [
      ["X", "_", "_"],
      ["_", "X", "_"],
      ["O", "O", "X"],
    ];

    expect(makeMove(board, "1,3", "X")).toBe(true);
    expect(board[0][2]).toBe("X");
  });

  test("Places O in the correct position", () => {
    const board = [
      ["X", "_", "_"],
      ["_", "X", "_"],
      ["O", "O", "X"],
    ];

    expect(makeMove(board, "2,3", "O")).toBe(true);
    expect(board[1][2]).toBe("O");
  });
});
test("Does not change the board for an invalid row", () => {
  const board = [
    ["X", "_", "_"],
    ["_", "X", "_"],
    ["O", "O", "X"],
  ];

  const originalBoard = [
    ["X", "_", "_"],
    ["_", "X", "_"],
    ["O", "O", "X"],
  ];

  expect(makeMove(board, "0,1", "O")).toBe(false);
  expect(board).toEqual(originalBoard);
});
