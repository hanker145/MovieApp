import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MCard from "./MCard";
import DialogContentText from "@mui/material/DialogContentText";

export default function AlertDialog(props) {
  const { open, handleClose, movies } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="100%"
      >
        {movies.length && (
          <DialogTitle id="alert-dialog-title">
            {movies.length} {movies.length > 1 ? "movies" : "movie"}
          </DialogTitle>
        )}

        {movies.length ? (
          <DialogContent>
            <Grid container direction="row" spacing={5} mt={2}>
              {movies.map((item) => (
                <Grid key={item.id} item xs={6} sm={4} md={3}>
                  <MCard item={item} handleClose={handleClose} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        ) : (
          <DialogContentText id="alert-dialog-description">
            No record
          </DialogContentText>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
