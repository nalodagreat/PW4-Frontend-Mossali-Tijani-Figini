"use client";

import React from "react";
import Clients from "@/components/admin/clients/clients";
import Orders from "@/components/admin/orders/orders";
import Products from "@/components/admin/products/products";

export default function Admin() {
    return (
        <>
            <Clients></Clients>
            <Orders></Orders>
            <Products></Products>
        </>
    )
}