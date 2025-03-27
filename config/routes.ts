export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	
	{
        path: '/orders',
        name: 'Order Management',
        icon: 'ShoppingCartOutlined',
        routes: [
            {
                name: 'Order List',
                path: '/orders/list',
                component: './OrderManagement/OrderList',
            },
            {
                name: 'Add/Edit Order',
                path: '/orders/edit/:id?',
                component: './OrderManagement/OrderEdit',
                hideInMenu: true,
            },
            {
                name: 'Order Details',
                path: '/orders/details/:id',
                component: './OrderManagement/OrderDetails',
                hideInMenu: true,
            },
        ],
    },

	{
        path: '/courses',
        name: 'Courses',
        icon: 'BookOutlined',
        routes: [
            {
                name: 'Course List',
                path: '/courses/list',
                component: './Courses/CourseList', // Ensure this file exists
            },
            {
                name: 'Add Course',
                path: '/courses/add',
                component: './Courses/AddCourse', // Ensure this file exists
            },
            {
                name: 'Edit Course',
                path: '/courses/edit/:id',
                component: './Courses/EditCourse', // Ensure this file exists
                hideInMenu: true,
            },
        ],
    },

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
