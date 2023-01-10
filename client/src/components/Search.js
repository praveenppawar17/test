import { Box, InputBase, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { updateToggle } from "../redux/action";
import SearchList from "./searchList";
import { searchProducts } from "../service/api";

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#000",
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

const Search = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    let timeOut = setTimeout(async () => {
      const searchRes = await searchProducts(searchField);
      const filteredProducts = searchRes.response.data.productResponse.filter(
        (product) => {
          return product.title
            .toLowerCase()
            .includes(searchField.toLowerCase());
        }
      );
      setProductList(filteredProducts);
      if (searchField === "") {
        setSearchShow(false);
      } else {
        dispatch(updateToggle(filteredProducts));
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchField]);

  function searchList() {
    if (searchShow) {
      return (
        <SearchList filteredProducts={productList} searchShow={searchShow} />
      );
    }
  }

  return (
    <>
      <Box>
        <SearchBar>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </SearchBar>
      </Box>
      {searchList()}
    </>
  );
};

export default Search;
