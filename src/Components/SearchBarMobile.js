import "../Components/Styles/Search.scss";
import {
  SwapOutlined,
  EnvironmentOutlined,
  CarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { DatePicker, Drawer } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import CitiesDiv from "./CitiesDiv";

dayjs.extend(customParseFormat);

const cityData = ["Hyderabad", "Bangalore", "Chennai", "Delhi", "Jaipur"];

const SearchBarMobile = () => {
  const [today, setToday] = useState(dayjs());
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dateDrawerVisible, setDateDrawerVisible] = useState(false); // State for date drawer
  const [selectedCity, setSelectedCity] = useState({
    source: "",
    destination: "",
  });
  const [cityType, setCityType] = useState(""); // Track whether it's source or destination

  const todayDate = dayjs();
  const maxDate = todayDate.add(3, "month");

  const openCityDrawer = (type) => {
    setCityType(type);
    setDrawerVisible(true);
  };

  const openDateDrawer = () => {
    setDateDrawerVisible(true);
  };

  const onCityClick = (city) => {
    setSelectedCity((prev) => ({
      ...prev,
      [cityType]: city,
    }));
    setDrawerVisible(false);
  };

  const onDateChange = (date) => {
    setToday(date);
    setDateDrawerVisible(false); // Close date drawer after selection
  };

  return (
    <div className="search-mobile-container">
      <div className="oranger-div"></div>
      <form action="">
        <div className="search-form-mobile">
          <div className="select-city" onClick={() => openCityDrawer("source")}>
            <CarOutlined
              style={{
                fontSize: "24px",
                marginRight: "8px",
                color: "#616161",
              }}
            />
            <p>{selectedCity.source || "Leaving From"}</p>
          </div>
          <hr />
          <SwapOutlined className="swap-icon" />
          <div
            className="select-city"
            onClick={() => openCityDrawer("destination")}
          >
            <EnvironmentOutlined
              style={{
                fontSize: "24px",
                color: "#616161",
                marginRight: "8px",
              }}
            />
            <p>{selectedCity.destination || "Going To"}</p>
          </div>
          <div className="select-date" onClick={openDateDrawer}>
              <p>Departure</p>
            <div className="calendar">
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
                </div>
              <p className="date-p">{today.format("DD/MM/YYYY")}</p>
          </div>
          <button className="search-button">Submit</button>
        </div>
      </form>

      <Drawer
        title={`Select ${
          cityType === "source" ? "Source" : "Destination"
        } City`}
        placement="left"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width="100%"
      >
        <CitiesDiv cityState={cityData} onCityClick={onCityClick} />
      </Drawer>

      {/* Drawer for Date Picker */}
      <Drawer
        title="Select Departure Date"
        placement="left"
        closable={true}
        onClose={() => setDateDrawerVisible(false)}
        open={dateDrawerVisible}
        width="100%"
      >
        <DatePicker
          className="custom-date-picker"
          size="large"
          value={today}
          disabledDate={(current) => {
            return current && current < todayDate.startOf("day");
          }}
          minDate={todayDate}
          maxDate={maxDate}
          onChange={onDateChange}
          getPopupContainer={(trigger) => trigger.parentNode}
        />
      </Drawer>
    </div>
  );
};

export default SearchBarMobile;
