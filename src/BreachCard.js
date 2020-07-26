import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Collapse,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    paddingTop: "56.25%", // 16:9
  },
});

const BreachCard = React.forwardRef(
  (
    { breachTitle, breachDate, breachImg, breachDescription, onCardClick },
    ref
  ) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (i) => {
      setExpanded(!expanded);
      onCardClick(i);
    };
    return (
      <Card className={classes.root} raised>
        <CardActionArea disabled>
          <CardMedia
            className={classes.media}
            image={breachImg}
            title={breachTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              {breachTitle}
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              {`From: ${breachDate}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            ref={ref}
            size="large"
            color="secondary"
            onClick={(i) => {
              handleExpandClick(i);
            }}
          >
            <Link href={`#${breachTitle}`}>See More</Link>
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              paragraph
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {breachDescription}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
);
export default BreachCard;
