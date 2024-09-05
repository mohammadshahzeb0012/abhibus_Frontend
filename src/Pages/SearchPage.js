import Header from "../Components/Header";
import SearchComponent from "../Components/SearchBar";
import SearchBarMobile from "../Components/SearchBarMobile";

const SearchPage = () => {
  return (
    <div className="search-page">
      <Header/>
      <div className="desktop-search-component search-container">
        <SearchComponent/>
      </div>
      <div className="mobile-search-component">
        <SearchBarMobile/>
      </div>
    </div>
  );
};

export default SearchPage;
