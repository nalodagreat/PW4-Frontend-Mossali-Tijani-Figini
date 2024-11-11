"use client";

import React from "react";
import Account from "@/components/user/accountInfo/account";
import Products from "@/components/user/products/products";
import Order from "@/components/user/orderLog/order";

const ProfiliUtente = () => {
    return (
        <>
            <Account></Account>
            <Products></Products>
            <Order></Order>
        </>
    );
};

export default ProfiliUtente;
