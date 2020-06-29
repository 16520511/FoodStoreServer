import React from 'react'
import { DropZone, Label, Box, Button, Icon } from 'admin-bro'
import axios from 'axios'

class UploadPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            products: [],
            currentProductId: null
        }

        this.onFileChange = this.onFileChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
    }

    componentDidMount() {
        axios.get('/api/products')
        .then(res => this.setState({ products: res.data}))
        .catch(err => console.log(err));
    }

    onFileChange(files) {
        this.setState({ file: files[0] })

        event.preventDefault();
    }

    onProductSelect(event) {
        let productId = event.target.value;

        this.setState({ currentProductId: productId });
    }

    onUpload() {
        let url = '/api/upload/product';
        let formData = new FormData();

        formData.append('file', this.state.file);
        formData.append('productId', this.state.currentProductId);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(url, formData, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        let products = this.state.products.map(product => 
            <option value={product.id}>{product.name}</option>    
        );

        return (
            <Box px="300px" pt="lg" pb="200px">
                <Label>Upload Photos</Label>
                <DropZone onChange={this.onFileChange} my="20px" />
                <Box my="20px">
                <select onChange={this.onProductSelect} style={{ padding: '10px', fontSize: '1.1rem' }}>
                    <option value={null} disabled selected>Select product</option>
                    {products}
                </select>
                </Box>
                <Button onClick={this.onUpload} mr="default" my="20px">
                    <Icon icon="Upload" />Upload
                </Button>
            </Box>
        )
    }
}

export default UploadPhoto;
