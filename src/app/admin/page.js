"use client";

import React from "react";
import Clients from "@/components/admin/clients/clients";
import Orders from "@/components/admin/orders/orders";
import Products from "@/components/admin/products/products";
import OrderDownloader from "@/components/admin/orderDownloader/orderDownloader";
import ProductDownloader from "@/components/admin/productDownloader/productDownloader";

export default function Admin() {
    return (
        <>
            <Clients></Clients>
            <Orders></Orders>
            <OrderDownloader></OrderDownloader>
            <Products></Products>
            <ProductDownloader></ProductDownloader>
        </>
    )
}