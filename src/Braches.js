import React, { useReducer, useRef, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Modal,
  CircularProgress,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles/";
import { useFetch, useInfiniteScroll } from "./hooks";
import BreachCard from "./BreachCard";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  bottom: {
    position: "relative",
    textAlign: "center",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  bottomText: {
    margin: 0,
    color: "#FF0000",
  },
  divider: {
    border: "1px solid transparent",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

const Breaches = () => {
  const classes = useStyles();

  const brcReducer = (state, action) => {
    switch (action.type) {
      case "STACK_BREACHES":
        return { ...state, breaches: state.breaches.concat(action.breaches) };
      case "FETCHING_BREACHES":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };
  const [brcData, brcDispatch] = useReducer(brcReducer, {
    breaches: [],
    fetching: true,
  });

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 10 };
      default:
        return state;
    }
  };
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
  const bottomBoundaryRef = useRef(null);
  useFetch(pager, brcDispatch);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  const hashRef = {};
  const onCardClick = (i) => {
    localStorage.setItem("IndexLastBrcClicked", i);
  };

  React.useEffect(() => {
    const lastBrcClickedNum =
      parseInt(localStorage.getItem("IndexLastBrcClicked")) || 0;
    if (lastBrcClickedNum > pager.page) {
      pagerDispatch({ type: "ADVANCE_PAGE" });
    }
  }, [pager.page]);
  const [toScroll, setToScroll] = useState(true);
  React.useEffect(() => {
    const lastBrcClickedNum =
      parseInt(localStorage.getItem("IndexLastBrcClicked")) || 0;

    if (hashRef[lastBrcClickedNum] && toScroll) {
      setToScroll(false);
      hashRef[lastBrcClickedNum].current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
      hashRef[lastBrcClickedNum].current.click();
    }
  }, [hashRef]);

  return (
    <>
      <Grid id="breaches" container direction="row" spacing={2}>
        <Grid item style={{ position: "absolute" }}>
          <Modal open={toScroll}>
            <CircularProgress className={classes.circularProgress} />
          </Modal>
        </Grid>
        {brcData.breaches.map((breach, index) => {
          const { Name, BreachDate, Description, LogoPath } = breach;
          const ref = React.createRef();
          hashRef[index] = ref;
          return (
            <Grid key={index} item xs={3}>
              <BreachCard
                breachTitle={Name}
                breachDate={BreachDate}
                breachDescription={Description}
                breachImg={LogoPath}
                ref={ref}
                onCardClick={() => onCardClick(index)}
              />
            </Grid>
          );
        })}
      </Grid>
      {!brcData.fetching && (
        <Paper className={classes.bottom}>
          <Typography component={"p"} className={classes.bottomText}>
            Getting breaches
            <CircularProgress />
          </Typography>
        </Paper>
      )}
      <Grid container className={classes.divider} ref={bottomBoundaryRef} />
    </>
  );
};

export default Breaches;
