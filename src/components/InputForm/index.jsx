import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import getHighestPair from "../../services";
import EmployeeTable from "../Table";
const styles = {
  button: {
    marginBottom: "16px",
  },
  importLabel: {
    color: "white",
  },
};

const InputForm = () => {
  const [file, setFiles] = useState();
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    // const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const mapArray = csvRows.map((e) => {
      const values = e.split(",");
      // const obj = csvHeader.reduce((object, header, index) => {
      //   object[header] = values[index];
      //   return object;
      // }, []);
      return values; // return obj
    });
    setArray(mapArray);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function(event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  };

  // const headerKeys = Object.keys(Object.assign({}, ...array));

  const calculatePairs = (e) => {
    e.preventDefault();

    if (array.length) {
      const result = getHighestPair(array);
      return setArray(result);
    }
  };

  // const newArray = array.reduce((acc, cv) => {
  //   return { ...acc, ["id"]: cv };
  // });

  // component which will have button and on click will calculate with formula from services folder and put it into a table again.

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sirma Employee Reader</h1>
      <form>
        <input
          accept={".csv"}
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleOnChange}
        />
        <Stack justifyContent="center" spacing={2} direction="row">
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" style={styles.button}>
              Upload File
            </Button>
          </label>
          {file && (
            <Button
              variant="contained"
              style={styles.button}
              onClick={(e) => handleOnSubmit(e)}
            >
              Import file
            </Button>
          )}
        </Stack>
      </form>
      <EmployeeTable data={array} />
      {array && (
        <Button
          style={{ marginTop: "16px" }}
          variant="contained"
          onClick={(e) => calculatePairs(e)}
        >
          Calculate file
        </Button>
      )}
    </div>
  );
};

export default InputForm;
