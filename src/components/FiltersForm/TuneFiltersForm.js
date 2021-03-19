import React from "react";
import { tuneTypes } from "../../helpers/abcHelper";
import startCase from "lodash/startCase";
import {
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import debounce from "lodash/debounce";
import { updateTuneFilters } from "../../actions/ui";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(2, 0)
  }
}));

function TuneFiltersForm(props) {
  const classes = useStyles();
  const { currentFilters, folder } = props;

  const handleSearchChange = debounce((value) => {
    props.updateTuneFilters({ ...currentFilters, search: value });
  }, 200);

  const handleTuneTypeChange = (e) => {
    const value = e.target.value === "all" ? undefined : e.target.value;
    props.updateTuneFilters({ ...currentFilters, tuneType: value });
  };

  return (
    <div className={classes.root} id="filtersForm">
      <TextField
        id="filter-search"
        label="Search"
        variant="outlined"
        onChange={(e) => handleSearchChange(e.target.value)}
        defaultValue={currentFilters.search}
        placeholder="Search by name"
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        className={classes.formControl}
      />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup
          aria-label="Tune Type"
          id="filter-tuneType"
          name="tuneType"
          defaultValue="all"
          onChange={handleTuneTypeChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio color="primary" />}
            label="All"
          />
          {Object.keys(tuneTypes).map((tuneType) => (
            <FormControlLabel
              key={tuneType}
              value={tuneType}
              control={<Radio color="primary" />}
              label={startCase(tuneType)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentFilters: state.ui.tuneFilters
});

export default connect(mapStateToProps, { updateTuneFilters })(TuneFiltersForm);
