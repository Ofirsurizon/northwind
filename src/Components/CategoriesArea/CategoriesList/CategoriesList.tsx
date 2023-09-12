import { useEffect, useState } from "react";
import "./CategoriesList.css";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesService";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/AppConfig";

function CategoriesList(): JSX.Element {

    // useState -> for feCategories
    const [feCategories, setFeCategories] = useState<CategoryModel[]>([]);

    // useEffect -> to get categories form BE

    useEffect(() => {
        categoriesService.getAllCategories()
            .then(beCategories => setFeCategories(beCategories))
            .catch(err => notificationService.error(err));
    }, []);

    return (
        <div className="CategoriesList">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {feCategories?.map(c => <tr key={c.name}>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td><img src={appConfig.categoriesUrl + "images/" + c.imageName} /></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesList;
