import { Card, Box, Typography, styled } from "@mui/material";

const Component = styled(Card)`
  border-top: 1px solid #f0f0f0;
  border-radius: 10px;
  display: flex;
`;

const LeftComponent = styled(Box)`
  margin: 30px;
`;

const Cost = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const CartItem = ({ item }) => {
  console.log("hoe does .it look here.... ", item)
  return (
    <Component key={item.productId.id}>
      <LeftComponent>
        <img
          src={item.productId.image}
          style={{ height: 110, width: 120 }}
          alt="product"
        />
      </LeftComponent>
      <Box style={{ margin: 20 }}>
        <Typography>{item.productId.title}</Typography>
        <Typography style={{ margin: "20px 0" }}>
          <Cost component="span">price: ₹{item.productId.price}</Cost>
        </Typography>
        <Typography style={{ margin: "20px 0" }}>
          <Cost component="span">quantity: {item.quantity}</Cost>
        </Typography>
      </Box>
    </Component>
  );
};

export default CartItem;
