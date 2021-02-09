import {
    AppstoreOutlined,
    UserOutlined,
    SafetyOutlined,
    PieChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    AreaChartOutlined,
    ToolOutlined,
    BarsOutlined,
    HomeOutlined
} from '@ant-design/icons';



/**
 * title,key,icon for the left navigation menus
 */
const menuList =
    [
        {
            title: 'Home', // menu title
            key: '/home', // the path
            icon:  <HomeOutlined />, // icon name
        },
        {
            title: 'Product',
            key: '/products',
            icon: <AppstoreOutlined />,
            children: [ // children menus
            {
                title: 'Category Management',
                key: '/category',
                icon: <BarsOutlined />
            },
            {
            title: 'Product Management',
            key: '/product',
            icon: <ToolOutlined />
            },
            ]
        },
        {
        title: 'User Management',
        key: '/user',
        icon: <UserOutlined />
        },
        {
        title: 'Role Management',
        key: '/role',
        icon: <SafetyOutlined />,
        },
        {
        title: 'Char',
        key: '/charts',
        icon: <AreaChartOutlined />,
            children:
                [
                    {
                    title: 'Bar Chart',
                    key: '/charts/bar',
                    icon: <BarChartOutlined />
                    },
                    {
                    title: 'Line Chart',
                    key: '/charts/line',
                    icon: <LineChartOutlined />
                    },
                    {
                    title: 'Pie Chart',
                    key: '/charts/pie',
                    icon: <PieChartOutlined />
                    },
    ]
    }
]
export default menuList