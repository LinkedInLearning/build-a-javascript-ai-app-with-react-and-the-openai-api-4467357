import PropTypes from "prop-types";
import "./Description.css";

const Description = ({ weatherDescription }) => {
  return (
    <div className="description">
      <h2 className="description__title">Description</h2>
      <div className="description__divider">
        <p className="description__text">{weatherDescription}</p>
      </div>
    </div>
  );
};
Description.defaultProps = {
  weatherDescription: "Waiting for location data.",
};

Description.propTypes = {
  weatherDescription: PropTypes.string,
};

export default Description;
