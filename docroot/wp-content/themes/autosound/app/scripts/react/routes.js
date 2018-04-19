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
				path: '/search/:search',
				component: Catalog
			},
			{
				path: '/category/:categoryId',
				component: Catalog
			},
			{
				path: '/product/:productId',
				component: Product
			}
		]
	}
];
