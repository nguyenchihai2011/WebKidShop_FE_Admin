import Staff from "../layouts/Staff/Staff";

import Signin from "../pages/Signin/Signin";
import Dashboard from "../pages/Dashboard/Dashboard";
import Orders from "../pages/Orders/Orders";
import Category from "../pages/Category/Category";
import ProductType from "../pages/ProductType/ProductType";
import Brand from "../pages/Brand/Brand";
import Product from "../pages/Product/Product";
import Promotion from "../pages/Promotion/Promotion";
import Blog from "../pages/Blog/Blog";

const publicRoutes = [
  { path: "/", component: Signin, layout: null },
  { path: "/staff/dashboard", component: Dashboard, layout: Staff },
  { path: "/staff/orders", component: Orders, layout: Staff },
  { path: "/staff/category", component: Category, layout: Staff },
  { path: "/staff/product-type", component: ProductType, layout: Staff },
  { path: "/staff/brand", component: Brand, layout: Staff },
  { path: "/staff/product", component: Product, layout: Staff },
  { path: "/staff/promotion", component: Promotion, layout: Staff },
  { path: "/staff/blog", component: Blog, layout: Staff },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
