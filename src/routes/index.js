import Staff from "../layouts/Staff/Staff";
import Admin from "../layouts/Admin/Admin";

import Signin from "../pages/Signin/Signin";
import Dashboard from "../pages/Dashboard/Dashboard";
import Orders from "../pages/Orders/Orders";
import Category from "../pages/Category/Category";
import ProductType from "../pages/ProductType/ProductType";
import Brand from "../pages/Brand/Brand";
import Product from "../pages/Product/Product";
import Promotion from "../pages/Promotion/Promotion";
import Blog from "../pages/Blog/Blog";
import StaffManage from "../pages/StaffManage/StaffManage";

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
  { path: "/admin/dashboard", component: Dashboard, layout: Admin },
  { path: "/admin/orders", component: Orders, layout: Admin },
  { path: "/admin/category", component: Category, layout: Admin },
  { path: "/admin/product-type", component: ProductType, layout: Admin },
  { path: "/admin/brand", component: Brand, layout: Admin },
  { path: "/admin/product", component: Product, layout: Admin },
  { path: "/admin/promotion", component: Promotion, layout: Admin },
  { path: "/admin/blog", component: Blog, layout: Admin },
  { path: "/admin/staff-manage", component: StaffManage, layout: Admin },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
