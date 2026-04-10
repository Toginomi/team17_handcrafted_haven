"use client";

import { useEffect } from "react";

export default function CartBadgeUpdater() {
    useEffect(() => {
        function updateBadge() {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const badge = document.getElementById("cart-count");
            
            if (badge) {
                const totalQty = cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
                badge.textContent = String(totalQty);
            }
        }

        updateBadge();
        window.addEventListener("storage", updateBadge);

        return () => window.removeEventListener("storage", updateBadge);
    }, []);

    return null;
}
