/**
 * @jest-environment jsdom
 */
import CoinList from "@/components/CoinList";
import { fireEvent, render, screen } from "@testing-library/react";

const setFetchReturnData = (data: any) => {
  global.fetch = jest.fn(
    (): Promise<any> =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
  );
};

describe("CoinList", () => {
  beforeAll(() => {
    setFetchReturnData([{ id: "bitcoin" }, { id: "ethereum" }]);
  });

  test("It should render CoinList component", () => {
    render(<CoinList />);
  });

  test("It should render CoinList API data", async () => {
    render(<CoinList />);

    await screen.findByText("bitcoin");
  });

  test("It should filter correctly", async () => {
    render(<CoinList />);

    await screen.findByText("bitcoin");
    await screen.findByText("ethereum");

    const filter = screen.getByLabelText(/filter/i);
    fireEvent.change(filter, { target: { value: "bitcoin" } });

    screen.getByText("bitcoin");

    expect(screen.queryByText("ethereum")).not.toBeInTheDocument();
  });
});
