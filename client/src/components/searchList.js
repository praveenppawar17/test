import { Box, List, ListItem, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Component = styled(Box)`
  border: 1px solid;
  border-radius: 12px;
  background: #fff;
`;

const LinktoProduct = styled(ListItem)`
  text-decoration: none;
  color: inherit;
  background: transparent:
  margin-left: 20px;
  &>a{
    text-decoration: none;
    color: inherit;
  }
`;

function SearchList(props) {
  const filtered = props.filteredProducts.map((product) => (
    <List key={product._id}>
      <LinktoProduct component={Link} to={`/product/${product._id}`}>
        {product.title}
      </LinktoProduct>
    </List>
  ));
  return <Component>{filtered}</Component>;
}

export default SearchList;
