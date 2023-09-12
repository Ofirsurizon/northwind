import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Service/ProductsService";
import useTitle from "../../../Utils/UseTitle";
import "./ProductDetails.css";
import Spinner from "../../Spinner/Spinner";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/AppConfig";

function ProductDetails(): JSX.Element {

    useTitle("Northwind | Product Details");

    const navigate = useNavigate();

    const params = useParams();
    const id = +params.prodId;

    const [feProduct, setFeProducts] = useState<ProductModel>();

    // console.log(params);
    // console.log(id);

    useEffect(() => {
        productsService.getOneProduct(id)
            .then(beProduct => setFeProducts(beProduct))
            .catch(err => notificationService.error(err))
    }, [])

    async function deleteMe() {

        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;

            await productsService.deleteProduct(id);
            notificationService.success(`Product ${id} has been deleted`);

            navigate(appConfig.productsRoute);
        } catch (err: any) {
            console.log(err);
            notificationService.error(err);
        }
    }

    if (!feProduct) return <Spinner />

    return (
        <div className="ProductDetails">
            <h2>Product Details</h2>
            <h3>Name: {feProduct?.name}</h3>
            <h3>Price: {feProduct?.price}</h3>
            <h3>Stock: {feProduct?.stock}</h3>
            <br />
            <img src={appConfig.productsUrl + "images/" + feProduct?.imageName} />
            <br />
            <NavLink to={appConfig.productsRoute}>Back</NavLink>
            <span> | </span>
            <NavLink to={appConfig.editProductRoute + id}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>
        </div>
    );
}

export default ProductDetails;
