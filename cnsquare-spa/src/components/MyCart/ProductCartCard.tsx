import {
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

function ProductCartCard(props) {
  const { info, removeItem, updateCount } = props;
  const { id, name, imageUrl, price, quantity, brand, originalPrice } =
    info as CartItem;
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Box width="200px">
          <img src={imageUrl} loading="lazy" width="200px" />
          <Typography fontWeight={"bold"}>{brand}</Typography>
          <Typography>{name}</Typography>
          {originalPrice !== undefined && (
            <Typography
              sx={{ textDecoration: "line-through", fontSize: "12px" }}
            >
              HK${originalPrice}
            </Typography>
          )}
          {originalPrice !== undefined ? (
            <Typography sx={{ color: "#FF0000" }}>HK${price}</Typography>
          ) : (
            <Typography>HK${price}</Typography>
          )}
        </Box>
        <Box>
          <TextField
            sx={{ width: "100px" }}
            label="Quantity"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            defaultValue={quantity}
            onInput={updateCount}
          />
          <IconButton onClick={removeItem}>
            <CancelIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCartCard;
