import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "../App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockData, mockTitles } from "./mock_data";

beforeEach(() => {
  global.fetch = vi.fn(() => {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    });
  });
});

describe("App", () => {
  it("Display App and fetch data", async () => {
    render(<App />);
    
    screen.debug();
    
  });
})