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
  return (
    <Component>
      <LeftComponent>
        <img
          src={item.image}
          style={{ height: 110, width: 120 }}
          alt="product"
        />
      </LeftComponent>
      <Box style={{ margin: 20 }}>
        <Typography>{item.title}</Typography>
        <Typography style={{ margin: "20px 0" }}>
          <Cost component="span">price: ₹{item.price}</Cost>
        </Typography>
      </Box>
    </Component>
  );
};

export default CartItem;
