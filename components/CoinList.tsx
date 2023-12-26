import { useEffect, useState } from "react";

export default function CoinList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
      .then((resp) => resp.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (data) {
      setFilteredData(data.filter((item: any) => item.id.toLowerCase().includes(filterText.toLowerCase())));
    } else {
      setFilteredData([]);
    }
  }, [data, filterText]);

  return (
    <div>
      <span>
        <label htmlFor="filter">Label</label>
        <input id="filter" onChange={(e: any) => setFilterText(e.target.value)} />
      </span>
      {filteredData.map((item: any) => (
        <span>{item.id}</span>
      ))}
    </div>
  );
}
