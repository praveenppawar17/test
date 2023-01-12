import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { addProduct, getCategory } from "../service/api";

const Component = styled(Box)`
  width: 500px;
  margin: auto;
  // box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const UploadButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const productDetails = {
  title: "",
  description: "",
  category: "",
  price: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(productDetails);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoryList = async () => {
      const categoryResponse = await getCategory();
      setCategories([...categories, ...categoryResponse.data.categoryResponse]);
    };
    getCategoryList();
  }, []);

  const [file, setFile] = useState("");
  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const uploadProduct = async (e) => {
    const data = new FormData();
    data.append("name", file.name);
    data.append("file", file);
    const CLOUDINARY_URL =
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
    const instance = axios.create();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    let response = await instance.post(CLOUDINARY_URL, data);

    const productDeatils = {
      ...product,
      image: response.data.secure_url,
    };
    const productResponse = await addProduct(productDeatils);
    if (productResponse.data.statusCode === 200) {
      alert(
        `${productResponse.data.productResponse.title} has been added successfully`
      );
    }
  };
  return (
    <Component>
      <Wrapper>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Add new product
        </Typography>
        <TextField
          variant="standard"
          onChange={(e) => onValueChange(e)}
          name="title"
          label="Enter title"
        />
        <TextField
          variant="standard"
          onChange={(e) => onValueChange(e)}
          name="description"
          label="Enter description"
        />
        {/* <TextField
          variant="standard"
          onChange={(e) => onValueChange(e)}
          name="category"
          label="Enter category"
        /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={(e) => onValueChange(e)}
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category.category} key={category._id}>
                  {category.category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          onChange={(e) => onValueChange(e)}
          name="price"
          label="Enter price"
        />
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <UploadButton onClick={uploadProduct}>Upload Product</UploadButton>
      </Wrapper>
    </Component>
  );
};

export default AddProduct;
