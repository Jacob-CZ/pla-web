import { MenuItem } from "@/components/cms/MulitilevelMenu"

export const menuItems: MenuItem[] = [
	{
		id: "dashboard",
		label: "Dashboard",
		href: "/dashboard",
	},
	{
		id: "products",
		label: "Products",
		children: [
			{
				id: "all-products",
				label: "All Products",
				href: "/products",
			},
			{
				id: "add-product",
				label: "Add Product",
				href: "/products/new",
			},
			{
				id: "categories",
				label: "Categories",
				children: [
					{
						id: "electronics",
						label: "Electronics",
						href: "/products/categories/electronics",
					},
					{
						id: "clothing",
						label: "Clothing",
						href: "/products/categories/clothing",
					},
				],
			},
		],
	},
	{
		id: "users",
		label: "Users",
		children: [
			{
				id: "all-users",
				label: "All Users",
				href: "/users",
			},
			{
				id: "add-user",
				label: "Add User",
				href: "/users/new",
			},
		],
	},
	{
		id: "settings",
		label: "Settings",
		href: "/settings",
	},
]
