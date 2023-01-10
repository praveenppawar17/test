import { Box, Button, styled, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { addProduct, editOrUpdateProduct, getProductById } from "../service/api";
import { useParams } from "react-router-dom";

const Component = styled(Box)`
  width: 600px;
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

const UpdateProduct = () => {
  const [product, setProduct] = useState(productDetails);
  const [file, setFile] = useState("");
  const {id} = useParams()

    useEffect(()=> {
        const fetchData = async () => {
            let response = await getProductById(id);
            console.log("prdoct deti,,,, ", response)
            if (response.isSuccess) {
                console.log('how it goes...... ', response.response)
                setProduct({...product,...response.response.data.productResponse});
                console.log("------- ", product)
            }
            
        }
        fetchData();
        
    },[])

  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };



  const editProduct = async (e) => {
    // const data = new FormData();
    // data.append("name", file.name);
    // data.append("file", file);
    // const CLOUDINARY_URL =
    //   "https://api.cloudinary.com/v1_1/dfe4pvkkc/image/upload";
    // const instance = axios.create();
    // data.append("file", file);
    // data.append("upload_preset", "o7truwhc");
    // data.append("cloud_name", "dfe4pvkkc");
    // let response = await instance.post(CLOUDINARY_URL, data);

    const productDeatils = {
        product: {
            ...product
        },
      id,
    //   image: response.data.secure_url,
    };
    const productResponse = await editOrUpdateProduct(productDeatils);
    console.log("res............ ", productResponse)
    if (productResponse.data.statusCode === 200) {
      alert(
        `${productResponse.data.msg}`
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
          value={product.title}
        />
        <TextField
          variant="standard"
          onChange={(e) => onValueChange(e)}
          name="description"
          label="Enter description"
          value={product.description}
        />
        <TextField
          variant="standard"
          onChange={(e) => onValueChange(e)}
          name="category"
          label="Enter category"
          value={product.category}
        />
        <TextField
          variant="standard"
          onChange={(e) => onValueChange(e)}
          name="price"
          label="Enter price"
          value={product.price}
        />
        <input
          type="file"
          id="fileInput"
        //   value={product.image}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <UploadButton onClick={editProduct}>Update Product</UploadButton>
      </Wrapper>
    </Component>
  );
};

export default UpdateProduct;
