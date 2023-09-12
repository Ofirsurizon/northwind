import { NavLink } from "react-router-dom";
import "./ProductCard.css";
import ProductModel from "../../../Models/ProductModel";
import useTitle from "../../../Utils/UseTitle";
import appConfig from "../../../Utils/AppConfig";

type ProductProps = {
    key: number
    product: ProductModel,
    yos: string
}

function ProductCard(props: ProductProps): JSX.Element {

    return (
        <NavLink to={"/products/details/" + props.product.id}>
            <div className="ProductCard">
                <div>
                    Name: {props.product.name}
                    <br />
                    Price: {props.product.price}
                    <br />
                    Stock: {props.product.stock}
                    <br />
                </div>
                <div>
                    <img src={appConfig.productsUrl + "images/" + props.product.imageName} />
                </div>
            </div>
        </NavLink>
    );
}

export default ProductCard;
