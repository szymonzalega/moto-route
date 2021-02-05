import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import manual_1 from "../../../../assets/images/manual-1.JPG";
import manual_2 from "../../../../assets/images/manual-2.JPG";
import manual_3 from "../../../../assets/images/manual-3.JPG";
import manual_4 from "../../../../assets/images/manual-4.JPG";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& section": {
      marginBottom: "1em",
      textAlign: "center",
      maxWidth: "100%",
    },
    "& section img": {
      maxWidth: "100%",
    },
    "& section p": {
      textAlign: "left",
    },
  },
}))(MuiDialogContent);

export default function URLManualModal() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Click here
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          How to embed route map?
        </DialogTitle>
        <DialogContent dividers>
          <section>
            <p>
              1. Set the route on{" "}
              <a
                href="https://google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
              &nbsp;site and choose of the result
            </p>
            <img src={manual_1} alt="manual_1" />
          </section>
          <section>
            <p>2. Click "share" button </p>
            <img src={manual_2} alt="manual_2" />
          </section>
          <section>
            <p>3. Go to "Embed a map" tab and use "Copy HTML" button</p>
            <img src={manual_3} alt="manual_3" />
          </section>
          <section>
            <p>4. Paste copied value manualy or use "Paste" button</p>
            <img src={manual_4} alt="manual_4" />
          </section>
        </DialogContent>
      </Dialog>
    </span>
  );
}
