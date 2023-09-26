import PropTypes from "prop-types";

const PromptToLocation = (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    functions: [
      {
        name: "displayData",
        description: "Get the current weather in a given location.",
        parameters: {
          type: "object",
          properties: {
            latitude: {
              type: "string",
              description: "The latitude of this location",
            },
            longitude: {
              type: "string",
              description: "The longitude of this location",
            },
            country: {
              type: "string",
              description: "Country name",
            },
            countryCode: {
              type: "string",
              description: "Country code. Use IOS-3166",
            },
            USstate: {
              type: "string",
              description: "Full state name",
            },
            state: {
              type: "string",
              description: "Two-letter state code",
            },
            city: {
              type: "string",
              description: "The city name",
            },
            unit: {
              type: "string",
              description: "location unit: metric or imperial",
            },
          },
          required: [
            "country",
            "countryCode",
            "USstate",
            "state",
            "city",
            "unit",
            "latitude",
            "longitude",
          ],
        },
      },
    ],
    function_call: "auto",
  };

  const params = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    method: "POST"
  };

  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      const promptRes = JSON.parse(
        data.choices[0].message.function_call.arguments
      );

      console.log(data);
      console.log(promptRes);

      const locationString = () => {
        if(promptRes.countryCode === "US") {
          return `${promptRes.city}, ${promptRes.state}, ${promptRes.country}`;
        } else {
          return `${promptRes.city}, ${promptRes.country}`;
        }
      }

      const promptData = {
        locationString: locationString(),
        units: promptRes.unit,
        country: promptRes.country,
        USstate: promptRes.USstate
      }

      return promptData;

    })
    .catch((error) => {
      console.log("Error:", error);
      return Promise.reject(
        "Unable to identify a location from your question. Please try again."
      );
    });
};

PromptToLocation.propTypes = {
  prompt: PropTypes.string.isRequired,
};

export default PromptToLocation;
