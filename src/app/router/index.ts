import type { RouteRecordRaw } from "vue-router"
import { createRouter } from "vue-router"
import { useTitle } from "@/app/lib/use-title"
import { routerConfig } from "@/app/router/config"
import { CART_PATH, CHECKOUT_PATH, HOME_PATH, NOT_FOUND_PATH, PRODUCT_PATH, SHOP_PATH } from "@/shared/constants"

const Layouts = () => import("@/app/layouts/index.vue")

/** Application routes (storefront shell) */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: HOME_PATH,
    component: Layouts,
    children: [
      {
        path: "",
        component: () => import("@/pages/home/index.vue"),
        name: "Home",
        meta: {
          title: "Home"
        }
      },
      {
        path: SHOP_PATH,
        component: () => import("@/pages/shop/index.vue"),
        name: "Shop",
        meta: {
          title: "Shop"
        }
      },
      {
        path: `${PRODUCT_PATH}/:id`,
        component: () => import("@/pages/product-detail/index.vue"),
        name: "ProductDetail",
        meta: {
          title: "Product"
        }
      },
      {
        path: CART_PATH,
        component: () => import("@/pages/cart/index.vue"),
        name: "Cart",
        meta: {
          title: "Cart"
        }
      },
      {
        path: CHECKOUT_PATH,
        component: () => import("@/pages/checkout/index.vue"),
        name: "Checkout",
        meta: {
          title: "Checkout"
        }
      }
    ]
  },
  {
    path: NOT_FOUND_PATH,
    component: () => import("@/pages/not-found/index.vue"),
    meta: {
      title: "Not Found"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: NOT_FOUND_PATH
  }
]

/** Router instance */
export const router = createRouter({
  history: routerConfig.history,
  routes: constantRoutes
})

// Keep the document title in sync with the active route
const { setTitle } = useTitle()

router.afterEach((to) => {
  setTitle(to.meta.title)
})
