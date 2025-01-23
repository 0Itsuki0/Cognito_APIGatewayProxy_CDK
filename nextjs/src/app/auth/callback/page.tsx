// auth/callback
'use client'
import { useRouter } from "next/navigation";
import React from "react";

export default function Callback() {
    const router = useRouter()

    React.useEffect(() => {
        router.replace("/")
    }, [])

    return null
}
