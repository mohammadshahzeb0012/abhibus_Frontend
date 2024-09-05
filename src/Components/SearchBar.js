import { useEffect, useState } from "react";
import "../Components/Styles/Search.scss";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SwapOutlined, EnvironmentOutlined, CalendarOutlined, CarOutlined } from "@ant-design/icons";
import CitiesDiv from "./CitiesDiv";
import { useDispatch, useSelector } from "react-redux";
import { addSourceCity, addDestinationCity, addDate } from "../redux/searchSlice";
dayjs.extend(customParseFormat);

const SearchComponent = () => {
  const suggestions = useSelector(state => state)
  const [sourceVisibility, setSourceVisibility] = useState(false);
  const [destinationVisibility, setDestinationVisibility] = useState(false);
  const [today, setToday] = useState(dayjs());
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [SourceCityList, setSourceCityList] = useState([...suggestions.search.cities]);
  const [DestiCityList, setDestiCityList] = useState([...suggestions.search.cities]);
  const dispatch = useDispatch()

  const getSuggestion = (identifier, cityVal) => {
    cityVal = cityVal.toLowerCase()
    if (identifier === 'source') {
      const filterEdCities = suggestions.search.cities.filter((city) => {
        return city.toLowerCase() !== cityVal
      })
      setDestiCityList([...filterEdCities])
    } else if (identifier === 'destination') {
      const filterEdCities = suggestions.search.cities.filter((city) => {
        return city.toLowerCase() !== cityVal
      })
      setSourceCityList([...filterEdCities])
    }
    return
  }

  const todayDate = dayjs();
  const maxDate = todayDate.add(3, "month");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".source-city-input") &&
        !event.target.closest(".destination-city-input")
      ) {
        setSourceVisibility(false);
        setDestinationVisibility(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCityClick = (city) => {
    if (sourceVisibility) {
      dispatch(addSourceCity(city))
      setSourceCity(city);
      getSuggestion("source", city)
      setSourceVisibility(false);
    } else if (destinationVisibility) {
      dispatch(addDestinationCity(city))
      setDestinationCity(city);
      getSuggestion("destination", city)
      setDestinationVisibility(false);
    }
  };

  const handleTodayClick = () => {
    setToday(dayjs());
    dispatch(addDate(today.unix()))
  };

  const handleTomorrowClick = () => {
    setToday(dayjs().add(1, "day"));
    dispatch(addDate(today.unix()))
  };



  const handelSearch = (type, e) => {
    const searchVal = e.target.value.toLowerCase()
    if (type === 'source') {
      const filterdCities = suggestions.search.cities.filter((city) =>
        city.toLowerCase().includes(searchVal)
      );
      setSourceCityList([...filterdCities]);
      return
    } else if (type === 'destination') {
      const filterdCities = suggestions.search.cities.filter((city) =>
        city.toLowerCase().includes(searchVal)
      );
      setDestiCityList([...filterdCities]);
      return
    }
  }

  return (
    <div>
      <form action="">
        <div className="search-bg-img"></div>
        <div className="search-form-container">
          <h1>Book Bus Tickets</h1>
          <div className="search-form">
            <div
              tabIndex="0"
              className="search-input source-city-input"
              onClick={() => {
                setSourceVisibility(true);
              }}
              onKeyUp={(e) => handelSearch('source', e)}
            >
              <CarOutlined
                style={{ fontSize: "24px", marginRight: "8px", color: "#616161" }}
              />
              <input
                type="text"
                name="source-city-input"
                id="source-city-input"
                placeholder="From Station"
                value={sourceCity}
                onChange={(e) => setSourceCity(e.target.value)}
              />
            </div>

            <div className="search-swap-icon">
              <SwapOutlined
                style={{
                  color: "#9B9B9B",
                  backgroundColor: "#EEEEEE",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  fontSize: "24px",
                }}
              />
            </div>

            <div
              tabIndex="0"
              className="search-input destination-city-input"
              onClick={() => {
                setDestinationVisibility(true);
              }}
              onKeyUp={(e) => handelSearch('destination', e)}
            >
              <EnvironmentOutlined
                style={{ fontSize: "24px", marginRight: "8px", color: "#616161" }}
              />
              <input
                type="text"
                name="destination-city-input"
                id="destination-city-input"
                placeholder="To Station"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
              />
            </div>

            <div className="search-date search-input">
              <div className="datePicker">
                <CalendarOutlined
                  style={{
                    color: "#BFBFBF",
                    fontSize: "larger",
                    fontWeight: "500",
                    position: "relative",
                    top: "0.3rem",
                    marginRight: "5px",
                  }}
                />
                <DatePicker
                  defaultValue={today}
                  value={today}
                  disableDate={(current) => {
                    return current && current < todayDate.startOf("day");
                  }}
                  minDate={todayDate}
                  maxDate={maxDate}
                  onChange={(e) => {
                    setToday(e);
                    dispatch(addDate(e.unix()))
                  }}
                />
              </div>
              <div className="today-tomorrow-btn">
                <button type="button" onClick={handleTodayClick}>
                  Today
                </button>
                <button type="button" onClick={handleTomorrowClick}>
                  Tomorrow
                </button>
              </div>
            </div>
            <button className="search-button">Search</button>
          </div>
        </div>
      </form>

      <div className="source-city-div city-div">
        {sourceVisibility && (
          <CitiesDiv cityState={SourceCityList} identifier={"source"} onCityClick={handleCityClick} />
        )}
      </div>

      <div className="destination-city-div city-div">
        {destinationVisibility && (
          <CitiesDiv cityState={DestiCityList} identifier={"destination"} onCityClick={handleCityClick} />
        )}
      </div>
    </div>
  );
};

export default SearchComponent;