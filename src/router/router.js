
import Statistic from "@/components/Statistic/Statistic";
import {createRouter, createWebHistory} from "vue-router";
import Service from "@/components/Service/Service";
import ProductsPage from "@/components/Sklads/ProductsPage";
import PrintersPage from "@/components/Devices/PrintersPage";
import Computers from "@/pages/Computers";
import ComputerService from "@/pages/ComputerService";
import Orders from "@/components/Orders/Orders";
import HistoryPage from "@/components/History/HistoryPage";
// import LoginPage from "@/components/LoginPage";
import TransferPage from "@/components/UI/TransferPage";
// import Elements from "@/pages/Elements";
import Report from "@/pages/Report";
import ReportsPage from "@/components/UI/ReportsPage";
import Elements from "@/pages/Elements";
import Objects from "@/administration/Objects/Objects";


const routes = [
    {
        path: '/',
        component: Service
    },
    {
        path: '/service',
        component: Service
    },
    {
        path: '/history',
        component: HistoryPage
    },
    {
        path: '/products',
        component: ProductsPage
    },
    {
        path: '/printers',
        component: PrintersPage
    },
    {
        path: '/computers',
        component: Computers
    },
    {
        path: '/computerservice',
        component: ComputerService
    },
    {
        path: '/orders',
        component: Orders
    },
    {
        path: '/statistic',
        component: Statistic
    },
    {
        path: '/transfers',
        component: TransferPage
    },

    {
        path: '/reports',
        component: ReportsPage
    },
    {
        path: '/report',
        component: Report
    },
    {
        path: '/elements',
        component: Elements
    },
    {
        path: '/objects',
        component: Objects
    },
    {
        path: '/components',
        component: Elements
    },
    {
        path: '/users',
        component: Elements
    },
    {
        path: '/database',
        component: Elements
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router