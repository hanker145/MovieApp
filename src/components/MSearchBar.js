import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import DialogSearchMovie from "./DialogSearchMovie";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function MSearchBar() {
  const [open, setOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [valSearch, setValueSearch] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    setValueSearch("");
  };

  async function searchMovies(e) {
    const valueSearch = e.target.value;
    if (e.key === "Enter" && valueSearch) {
      try {
        const res = await apiService.get(
          `search/movie?query=${valueSearch}&api_key=${API_KEY}`
        );
        const _movieResults = res.status === 200 ? res.data.results : [];
        setOpen(true);
        setMovies(_movieResults);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onKeyUp={(e) => {
            searchMovies(e);
          }}
          value={valSearch}
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
        />
      </Search>
      {open && (
        <DialogSearchMovie
          open={open}
          handleClose={handleClose}
          movies={movies}
        />
      )}
    </>
  );
}

export default MSearchBar;
