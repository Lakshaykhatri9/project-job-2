'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

const AUTH_STORAGE_KEY = "quickcart_user";
const DEMO_PASSWORD = "password123";

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})
    const [authReady, setAuthReady] = useState(false)

    const fetchProductData = async () => {
        setProducts(productsDummyData)
    }

    const persistUser = (user) => {
        setUserData(user)
        if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        }
    }

    const login = (email, password) => {
        if (email === userDummyData.email && password === DEMO_PASSWORD) {
            persistUser(userDummyData)
            return true
        }
        return false
    }

    const logout = () => {
        setUserData(false)
        if (typeof window !== "undefined") {
            localStorage.removeItem(AUTH_STORAGE_KEY)
        }
    }

    const fetchUserData = async () => {
        if (typeof window === "undefined") return

        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
        if (storedUser) {
            setUserData(JSON.parse(storedUser))
        }
        setAuthReady(true)
    }

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, authReady, login, logout, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}