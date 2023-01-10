import { styled, Box, Typography } from "@mui/material";
import { addElipsis } from "../utils/utils";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 450px;
  & > img,
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  borderRadius: "10px 10px 0 0",
  height: 350,
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Product = ({ product }) => {
  return (
    <Container>
      <Image src={product.image} alt="product" />
      <Text>{product.category}</Text>
      <Heading>{addElipsis(product.title, 15)}</Heading>
    </Container>
  );
};

export default Product;
