import { describe, it, expect, page, beforeEach, vi } from "vitest";
import Home from '../pages/Home'
import SinglePage from '../pages/SinglePage'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor, getByText } from "@testing-library/react";
import mockData from './mock_data.json';

const mockItemsData = mockData;
const mockBannerData = mockData.items.filter((item) => item.isBanner === true);
const mockNewestData = mockData.items.slice(7);
const mockUserData = [{
   _id : "6786a39b11782b4c8f864f2d",
   email : "admin@gmail.com",
   profilePicUrl : "http://localhost:3001/uploads/images/1736876392090-1.png",
   contactInfo : "014565430992",
   password : "1234567",
   isAdmin: "true",
   items : ["6786a3f511782b4c8f864f32"]
}]

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

    // mock the request for http://localhost:3001/item/xxxx with param for SinglePage
    const itemIdMatch = url.match(/http:\/\/localhost:3001\/item\/(.+)/);
    if(itemIdMatch) {
      const itemId = itemIdMatch[1];
      const item = mockItemsData.items.find((item) => item._id === itemId);
      if (item) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(item),
        });
      }
    }

    // match item.userId belonging with userid to show user data on SinglePage
    const userIdMatch = url.match(/http:\/\/localhost:3001\/user\/(.+)/);
    if (userIdMatch) {
      const userId = userIdMatch[1];
      const user = mockUserData.find((user) => user._id === userId);
      if (user) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(user),
        });
      }
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
    
    await waitFor(() => {
      expect(screen.getByText("Tanglewood TW300 Akustikgitarre"));
    })
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockItemsData.items.length + 6); // 6 for Get NewestItem limit
  
    const buttons = screen.getAllByText("See Detail");
    expect(buttons).toHaveLength(mockItemsData.items.length);

    
  })
})

describe('Home Component', () => {
  it('All Item prices are available', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(mockItemsData.items[0].title)).toBeTruthy();
    })

    mockItemsData.items.forEach((item) => {
      const priceElement = screen.getAllByText(`$${item.price}`);
      expect(priceElement).not.toBeNull();
    });
  })
})

describe('Navigate to SinglePage', () => {
  it("navigates to singlePage and displays correct details", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<SinglePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("See Detail")[0]).toBeTruthy();
    });

    const detailButton = screen.getAllByText("See Detail")[0];
    fireEvent.click(detailButton);

    await waitFor(() => {
      expect(screen.getByText("Go to Chat")).toBeTruthy();
    })

    const clickedItem = mockItemsData.items[0];
    await waitFor(() => {
      expect(screen.getByText(clickedItem.title)).toBeTruthy();
      expect(screen.getByText(`$${clickedItem.price}`)).toBeTruthy();
      expect(screen.getByText(clickedItem.city)).toBeTruthy();
      expect(screen.getByText(clickedItem.country)).toBeTruthy();
    })

    const user = mockUserData.find((user) => user._id === clickedItem.userId);
    await waitFor(() => {
      expect(
        screen.queryByText((content, element) => content.includes(user.contactInfo))
      ).toBeTruthy();
      expect(screen.getByText(user.email)).toBeTruthy();
      //expect(screen.getByAltText("profile pic")).toHaveAttribute("src", user.profilePicUrl);
    });
  })

  
})