import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Grid, Button, withStyles } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

const styles = {
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  },
  appTitle: {
    fontSize: "16px",
    fontWeight: "normal"
  },
  appBody: {
    flexGrow: 1,
    overflow: "auto"
  }
};

class App extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <Grid className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.appTitle}>
              My App
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid className={classes.appBody}>{children}</Grid>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container justify="flex-end">
              <Button size="small" variant="flat">
                Next
                <ChevronRight />
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
