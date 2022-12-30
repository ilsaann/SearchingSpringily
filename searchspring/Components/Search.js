import { useState, useRef, useEffect } from "react";
import style from "../styles/Search.module.css";

export default function Search() {
  //creating reference for client input
  const searchRef = useRef("");

  //creating state to hold results
  const [searchResults, setSearchResults] = useState([]);

  //creating the page number counter
  const [currPage, setCurrPage] = useState(1); //`https://scmq7n.a.searchspring.io/api/search/search.json?q=${searchRef.current.value}&resultsFormat=native&siteId=scmq7n&page=${currPage}`
  const [pageLimit, setPageLimit] = useState(1);

  const [slide, setSlide] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    //reset the search
    setSearchResults([]);
    //reset the page number
    setCurrPage(1);

    fetch(
      `https://scmq7n.a.searchspring.io/api/search/search.json?q=${searchRef.current.value}&resultsFormat=native&siteId=scmq7n`
    )
      .then((data) => {
        return data.json();
      })
      //after inspecting the return data, destructure to access the results: [array]
      .then((data) => {
        console.log(data);
        if (data.results.length !== 0) {
          setSearchResults(data.results);
          const maxPg = data.pagination.totalPages;
          let pL = [];
          for (let i = 0; i < maxPg; i++) {
            pL.push(i + 1);
          }
          setPageLimit(pL);
        } else {
          setSearchResults(["Sorry, we couldn't find that"]);
        }
      });
  };

  //this is where I handle changing pages
  const ChangePage = () => {
    fetch(
      `https://scmq7n.a.searchspring.io/api/search/search.json?q=${searchRef.current.value}&resultsFormat=native&siteId=scmq7n&page=${currPage}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        if (data.results.length !== 0) {
          setSearchResults(data.results);
          const maxPg = data.pagination.totalPages;
          let pL = [];
          for (let i = 0; i < maxPg; i++) {
            pL.push(i + 1);
          }
          setPageLimit(pL);
        } else {
          setSearchResults(["Sorry, we couldn't find that"]);
        }
      });
  };

  //need to keep the states synced on changed pages
  //useEffect(() => {}, [setSearchResults]);

  const pageList = (arr) => {
    const maxSlides = Math.ceil(pageLimit.length / 5);
    console.log(pageLimit, maxSlides);
    if (slide < maxSlides) {
      let num = slide * 5;
      return (
        <>
          <button
            onClick={(e) => {
              e.preventDefault;
              setCurrPage(arr[num - 5]);
              return ChangePage;
            }}
          >
            {arr[num - 5]}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault;
              setCurrPage(arr[num - 4]);
              return ChangePage;
            }}
          >
            {arr[num - 4]}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault;
              setCurrPage(arr[num - 3]);
              return ChangePage;
            }}
          >
            {arr[num - 3]}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault;
              setCurrPage(arr[num - 2]);
              return ChangePage;
            }}
          >
            {arr[num - 2]}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault;
              setCurrPage(arr[num - 1]);
              return ChangePage;
            }}
          >
            {arr[num - 1]}
          </button>
        </>
      );
    } else {
      let lastSlide = (maxSlides - 1) * 5;
      let store = [];
      for (let i = lastSlide; i < pageLimit.length; i++) {
        store.push(arr[i]);
      }
      return store.map((btn) => (
        <button
          onClick={(e) => {
            e.preventDefault;
            setCurrPage(btn);
            return ChangePage;
          }}
        >
          {btn}
        </button>
      ));
    }
  };

  const handlePrevious = () => {
    if (slide > 1) {
      let newS = slide - 1;
      return setSlide(newS);
    } else {
      return setSlide(1);
    }
  };

  const handleNext = () => {
    const maxSlides = Math.ceil(pageLimit.length / 5);
    if (slide < maxSlides) {
      let newS = slide + 1;
      return setSlide(newS);
    } else {
      return slide;
    }
  };

  return (
    <div className={style.container}>
      <form type="submit">
        <input
          type="search"
          ref={searchRef}
          className={style.searchbar}
        ></input>
        <button
          type="submit"
          onClick={handleSearch}
          className={style.searchbtn}
        />
      </form>
      <div className="page indicator">
        <button className="previous" onClick={handlePrevious}>
          Previous
        </button>
        {pageLimit.length > 1 ? pageList(pageLimit) : <p>pages...</p>}
        <button className="next" onClick={handleNext}>
          Next
        </button>
      </div>

      <div className={style.results}>
        {searchResults.length !== 0 ? (
          searchResults.map((result) => {
            const price =
              result.msrp > result.price ? (
                <p>
                  <strike>{result.msrp}$</strike> now{" "}
                  <strong> {result.price}$</strong>
                </p>
              ) : (
                <p>
                  <strong>{result.price}$</strong>
                </p>
              );

            return (
              <div className={style.resultCard}>
                {" "}
                <h3>{result.name}</h3>
                {price}
                <img src={result.thumbnailImageUrl} alt="product image" />{" "}
              </div>
            );
          })
        ) : (
          <div className="empty" />
        )}
      </div>
    </div>
  );
}
