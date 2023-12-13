import { useEffect, useState } from "react";
import "./App.css";
import Characters from "./Components/Characters";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [characters, setCharacters] = useState(0);
  const [characterStatus, setCharacterStatus] = useState("All");
  const [openSort, setOpenSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  const page = 8;

  useEffect(() => {
    if (!characters?.length) return;
    // Calculate total pages based on the pageSize
    setTotalPages(Math.ceil(characters.length / page));

    // Update visibleData based on the current page
    const startIndex = (currentPage - 1) * page;
    const endIndex = startIndex + page;
    setVisibleData(characters?.slice(startIndex, endIndex));
  }, [characters, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const rickmartydata = async () => {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character?page=1"
      );
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    rickmartydata();
  }, []);

  useEffect(() => {
    setOpenSort(false);
    if (characterStatus === "All") {
      rickmartydata();
    } else {
      setCurrentPage(1);
      let temp = characters.filter((data) => data?.status == characterStatus);
      console.log(temp, "temp");
      setCharacters(temp);
    }
  }, [characterStatus]);

  console.log(characters, "characters");
  return (
    <>
      <Header />
      <div className="container">
        <div className="container__sorting">
          <button onClick={() => setOpenSort(!openSort)}>
            {characterStatus}
          </button>
          {openSort ? (
            <ul className="container_sortList">
              <li onClick={() => setCharacterStatus("All")}>All</li>
              <li onClick={() => setCharacterStatus("unknown")}>Unknown</li>
              <li onClick={() => setCharacterStatus("Alive")}>Alive</li>
              <li onClick={() => setCharacterStatus("Dead")}>Dead</li>
            </ul>
          ) : null}
        </div>
        <ul>
          {visibleData?.length &&
            visibleData?.map((el, i) => <Characters key={i} el={el} />)}
        </ul>
        <div className="container__pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>

          <span>{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
