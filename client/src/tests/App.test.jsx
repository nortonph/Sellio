import { describe, it, expect, beforeEach, vi } from "vitest";
import Home from '../pages/Home'
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockData from './mock_data.json';

const mockItemsData = mockData;
const mockBannerData = mockData.items.filter((item) => item.isBanner === true);
const mockNewestData = mockData.items.slice(7);
console.log(mockNewestData);

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url === 'http://localhost:3001/') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          items: mockItemsData.items,
          totalPages: 5,
          itemsPerPage: 10
        }),
      });
    }

    if (url === 'http://localhost:3001/banners') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBannerData),
      });
    }

    if (url === 'http://localhost:3001/newest') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockNewestData),
      });
    }

    return Promise.resolve({
      ok: false,
      status: 404,
    });
  });
});

describe('App', () => {
  it('Display Home and fetch data', async () => {
    render(<MemoryRouter>
      <Home />
    </MemoryRouter>);
  });
})

describe('Home Component', () => {
  it('render all items with an image and a "See Detail" button', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    screen.debug();
    await waitFor(() => {
      expect(screen.getByText("Tanglewood TW300 Akustikgitarre"));
    })
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockItemsData.items.length);
  })
})
describe("App", () => {
  it("fetches and displays all titles", async () => {
    render(<App />);
    screen.debug();
    
  });
})