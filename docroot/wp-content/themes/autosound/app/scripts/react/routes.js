import Shop from './components/shop';
import Catalog from './components/catalog';
import Product from './components/product';

export default [
	{
		component: Shop,
		routes: [
			{
				path: '/',
				component: Catalog,
				exact: true
			},
			{
				path: '/category/:categoryId',
				component: Catalog,
				exact: true
			},
			{
				path: '/product/:productId',
				component: Product,
				exact: true
			}
		]
	}
];
